<!-- design-system:start (managed by the design-consistent skill; edit via DESIGN.md) -->
## Design system

- **DESIGN.md** is the visual source of truth. **COMPONENTS.md** lists the shared components and page templates. Read both before any UI work.
- For any UI work (pages, sections, components, layouts, styles, or designs from screenshots, Stitch or Claude Design), use the **design-consistent** skill.
- Use only design tokens and shared components. No hardcoded colors, no arbitrary values like `p-[13px]`, no inline styles, and no page-specific copies of shared components.
- For design references: copy the layout, never their colors, fonts or spacing.
- Keep the header, footer or sidebar, and the page structure, identical to the reference screen named in DESIGN.md.
- Don't change DESIGN.md, the tokens or the shared components without asking first.
- **After any UI change, run `npm run lint && npm run lint:design` and fix every error before finishing.**
<!-- design-system:end -->
