#!/usr/bin/env node
// design-hook.mjs: Claude Code PostToolUse hook.
// After Claude edits a UI file, runs check-design (and ESLint if installed) on that file.
// If there are errors, exit code 2 sends the report back to Claude so it fixes them.
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const root = process.env.CLAUDE_PROJECT_DIR || process.cwd();
process.chdir(root);

let input = "";
process.stdin.on("data", (d) => (input += d));
process.stdin.on("end", () => {
  let file;
  try { file = JSON.parse(input).tool_input?.file_path; } catch { process.exit(0); }
  if (!file || !/\.(jsx?|tsx?|vue|svelte|astro|html|php|twig|css|scss|dart)$/.test(file)) process.exit(0);
  if (!fs.existsSync(file)) process.exit(0);

  const reports = [];
  const run = (args) => {
    try {
      execFileSync(process.execPath, args, { stdio: "pipe", encoding: "utf8" });
    } catch (e) {
      reports.push(`${e.stdout || ""}${e.stderr || ""}`.trim());
    }
  };

  run([path.join(root, "scripts/check-design.mjs"), file]);

  const eslintBin = path.join(root, "node_modules/eslint/bin/eslint.js");
  if (/\.(jsx?|tsx?|vue|svelte|astro)$/.test(file) && fs.existsSync(eslintBin)) {
    run([eslintBin, file]);
  }

  if (reports.length) {
    process.stderr.write(
      `Design check failed for ${file}:\n\n${reports.join("\n\n")}\n\n` +
      "Fix these using tokens from DESIGN.md and shared components from COMPONENTS.md. " +
      "Don't add design-ignore unless the value is truly dynamic.\n"
    );
    process.exit(2);
  }
  process.exit(0);
});
