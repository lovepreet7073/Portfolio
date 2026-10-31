#!/usr/bin/env node
// check-design.mjs: flags design-system violations. No dependencies. Node 18+.
//
// Usage:
//   node scripts/check-design.mjs                 scan configured/default folders
//   node scripts/check-design.mjs src/app/page.tsx  scan specific files or folders
//   node scripts/check-design.mjs --json          machine-readable output
//   node scripts/check-design.mjs --summary       counts only
//
// Config (optional): design-check.config.json at the project root.
// Skip a line: include "design-ignore" on it. Skip a file: "design-ignore-file" in its first 5 lines.
// Exit code: 1 if any "error"-level issue is found, otherwise 0.

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const argv = process.argv.slice(2);
const FLAGS = new Set(argv.filter((a) => a.startsWith("--")));
const TARGETS = argv.filter((a) => !a.startsWith("--"));

const DEFAULTS = {
  dirs: ["src", "app", "components", "pages", "lib", "resources", "views", "includes", "templates", "partials"],
  extensions: [".tsx", ".jsx", ".ts", ".js", ".vue", ".svelte", ".astro", ".html", ".php", ".twig", ".css", ".scss", ".dart"],
  ignoreDirs: ["node_modules", ".next", ".nuxt", "dist", "build", "out", ".git", "vendor", ".dart_tool", "coverage", ".svelte-kit", "public", "storage"],
  tokenFiles: [],
  tokenFileNames: [
    "tokens.css", "globals.css", "theme.css", "_variables.scss", "variables.scss",
    "tailwind.config.js", "tailwind.config.ts", "tailwind.config.cjs", "tailwind.config.mjs",
    "app_colors.dart", "app_theme.dart", "app_text_styles.dart", "theme.dart",
  ],
  uiDir: null,
  rules: {
    hexColor: "error",
    rawColorFn: "error",
    arbitraryValue: "error",
    inlineStyle: "error",
    flutterRawColor: "error",
    flutterRawStyle: "warn",
    duplicateName: "warn",
  },
};

function loadConfig() {
  const file = path.join(ROOT, "design-check.config.json");
  if (!fs.existsSync(file)) return DEFAULTS;
  try {
    const user = JSON.parse(fs.readFileSync(file, "utf8"));
    return { ...DEFAULTS, ...user, rules: { ...DEFAULTS.rules, ...(user.rules || {}) } };
  } catch (e) {
    console.error(`design-check.config.json is not valid JSON: ${e.message}`);
    process.exit(2);
  }
}

const CFG = loadConfig();
const norm = (p) => p.split(path.sep).join("/");
const tokenFileSet = new Set(CFG.tokenFiles.map((f) => norm(path.normalize(f))));
const uiDir = CFG.uiDir ? norm(path.normalize(CFG.uiDir)).replace(/\/$/, "") + "/" : null;

function isTokenFile(rel) {
  return tokenFileSet.has(rel) || CFG.tokenFileNames.includes(path.basename(rel));
}

function walk(dir, out) {
  let entries;
  try { entries = fs.readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of entries) {
    if (e.name.startsWith(".") && e.name !== ".") continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (!CFG.ignoreDirs.includes(e.name)) walk(full, out);
    } else if (CFG.extensions.includes(path.extname(e.name))) {
      out.push(full);
    }
  }
}

function collectFiles() {
  const files = [];
  const roots = TARGETS.length ? TARGETS : CFG.dirs.filter((d) => fs.existsSync(path.join(ROOT, d)));
  if (!roots.length) roots.push(".");
  for (const r of roots) {
    const full = path.resolve(ROOT, r);
    if (!fs.existsSync(full)) { console.error(`Not found: ${r}`); continue; }
    if (fs.statSync(full).isDirectory()) walk(full, files);
    else files.push(full);
  }
  return [...new Set(files)];
}

// ---- rules ----------------------------------------------------------------
const HEX = /(?<![\w&./-])#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})(?![\w-])/g;
const RAW_COLOR_FN = /\b(?:rgba?|hsla?|oklch|oklab)\(\s*[\d.]/g;
// Tailwind arbitrary values like p-[13px], bg-[#fff], md:rounded-[11px]; skips var() references
const ARBITRARY = /(?<=^|[\s"'`{(])(?:[a-z0-9-]+:)*!?-?[a-z][a-z0-9-]*-\[(?!var\()[^\]\s]+\]/g;
const INLINE_JSX = /(?<![:\w-])style\s*=\s*\{\s*\{/g;
const INLINE_HTML = /(?<![:\w-])style\s*=\s*["']/g;
const FLUTTER_COLOR = /\bColor\(\s*0x[0-9a-fA-F]+\s*\)|\bColors\.(?!transparent\b)[a-zA-Z]+/g;
const FLUTTER_STYLE = /\bfontSize\s*:\s*\d+(?:\.\d+)?/g;
const SKIP_HEX_LINE = /href\s*=|url\(|xlink:|#region|#endregion/;

const MARKUP_EXT = new Set([".tsx", ".jsx", ".ts", ".js", ".vue", ".svelte", ".astro", ".html", ".php", ".twig"]);
const COMPONENT_EXT = new Set([".tsx", ".jsx", ".vue", ".svelte", ".astro"]);
const PRIMITIVES = ["Button", "Input", "Select", "Dropdown", "Modal", "Dialog", "Card", "Badge", "Table", "Toast", "Tabs", "Checkbox", "Textarea"];

const issues = [];
const add = (rule, file, line, text, msg) => {
  const level = CFG.rules[rule];
  if (!level || level === "off") return;
  issues.push({ rule, level, file, line, text: text.trim().slice(0, 140), msg });
};

function checkFile(abs) {
  const rel = norm(path.relative(ROOT, abs));
  const ext = path.extname(abs);
  let src;
  try { src = fs.readFileSync(abs, "utf8"); } catch { return; }
  const lines = src.split(/\r?\n/);
  if (lines.slice(0, 5).some((l) => l.includes("design-ignore-file"))) return;

  const token = isTokenFile(rel);
  const inUi = uiDir && rel.startsWith(uiDir);

  lines.forEach((text, i) => {
    if (text.includes("design-ignore")) return;
    const n = i + 1;

    if (!token && !SKIP_HEX_LINE.test(text)) {
      for (const m of text.matchAll(HEX)) {
        // in CSS, only flag hex inside a declaration (after ":"), not id selectors like #main {
        if ((ext === ".css" || ext === ".scss") && !text.slice(0, m.index).includes(":")) continue;
        add("hexColor", rel, n, text, `Hardcoded color ${m[0]}. Use a color token.`);
      }
    }
    if (!token) {
      for (const m of text.matchAll(RAW_COLOR_FN)) add("rawColorFn", rel, n, text, `Raw color ${m[0]}...). Use a color token.`);
    }
    if (MARKUP_EXT.has(ext) && !inUi) {
      for (const m of text.matchAll(ARBITRARY)) add("arbitraryValue", rel, n, text, `Arbitrary value ${m[0]}. Use a scale value or token.`);
    }
    if (MARKUP_EXT.has(ext)) {
      if (INLINE_JSX.test(text) || INLINE_HTML.test(text)) add("inlineStyle", rel, n, text, "Inline style. Use tokens/classes or a shared component.");
      INLINE_JSX.lastIndex = 0; INLINE_HTML.lastIndex = 0;
    }
    if (ext === ".dart" && !token) {
      for (const m of text.matchAll(FLUTTER_COLOR)) add("flutterRawColor", rel, n, text, `Hardcoded ${m[0]}. Use AppColors / Theme.of(context).colorScheme.`);
      for (const m of text.matchAll(FLUTTER_STYLE)) add("flutterRawStyle", rel, n, text, `Raw ${m[0]}. Use a text style from the theme.`);
    }
  });
}

function checkDuplicateNames(files) {
  const byPrimitive = {};
  for (const abs of files) {
    if (!COMPONENT_EXT.has(path.extname(abs))) continue;
    const base = path.basename(abs, path.extname(abs));
    const name = base.replace(/[-_](\w)/g, (_, c) => c.toUpperCase()).replace(/^\w/, (c) => c.toUpperCase());
    for (const p of PRIMITIVES) {
      if (name !== p && name.endsWith(p) && name.length > p.length) {
        (byPrimitive[p] ||= []).push(norm(path.relative(ROOT, abs)));
      }
    }
  }
  for (const [p, list] of Object.entries(byPrimitive)) {
    add("duplicateName", list[0], 0, list.join(", "),
      `${list.length} "*${p}" component(s): possible duplicates of a shared ${p}. Check COMPONENTS.md; merge with ui-components if they only differ in style.`);
  }
}

// ---- run -------------------------------------------------------------------
const files = collectFiles();
files.forEach(checkFile);
checkDuplicateNames(files);

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warn");
const byRule = issues.reduce((acc, i) => ((acc[i.rule] = (acc[i.rule] || 0) + 1), acc), {});

if (FLAGS.has("--json")) {
  console.log(JSON.stringify({ filesScanned: files.length, errors: errors.length, warnings: warnings.length, byRule, issues }, null, 2));
} else {
  if (!FLAGS.has("--summary")) {
    const byFile = {};
    for (const i of issues) (byFile[i.file] ||= []).push(i);
    for (const [file, list] of Object.entries(byFile)) {
      console.log(`\n${file}`);
      for (const i of list) {
        const loc = i.line ? `:${i.line}` : "";
        console.log(`  ${i.level === "error" ? "ERROR" : "warn "} ${i.rule}${loc}  ${i.msg}`);
        console.log(`         ${i.text}`);
      }
    }
  }
  console.log(`\ncheck-design: ${files.length} files, ${errors.length} errors, ${warnings.length} warnings`);
  if (Object.keys(byRule).length) console.log("by rule: " + Object.entries(byRule).map(([r, c]) => `${r} ${c}`).join(", "));
  if (errors.length) console.log("Fix: use tokens from DESIGN.md and shared components from COMPONENTS.md.");
}

process.exit(errors.length ? 1 : 0);
