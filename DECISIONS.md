# Decisions

This file records every decision made without asking the user for clarification.

---

## Technical

**TypeScript runner for build script**
Used `ts-node/esm` with `--loader` flag to run the build-content TypeScript script directly. Decision: ts-node is simpler to set up than compiling first and supports ESM modules used throughout the project.

**Content schema approach**
Used Starlight's `docsSchema({ extend: z.object({...}) })` to add custom frontmatter fields to the docs collection, rather than a separate content collection. Decision: Starlight's routing and sidebar work from the docs collection, so keeping everything in one collection avoids duplication.

**Custom page routing**
Used `src/pages/terms/[slug].astro`, `src/pages/modules/[slug].astro`, and `src/pages/paths/[slug].astro` for custom layouts, with `StarlightPage` as the wrapper. Decision: this is cleaner than overriding Starlight's internal components and still benefits from the sidebar and theme.

**Generated content in docs directory**
All generated markdown files go inside `src/content/docs/` (terms/, modules/, paths/) so Starlight picks them up automatically for sidebar and search. Decision: this avoids custom loaders while keeping the content in the standard location.

**"Total" row in Modules sheet**
The Modules sheet has a "Total" row at the bottom (row 16) that is a formula summary. The build script skips it by requiring module names to match `/^\d{2}\s/` (start with two digits and a space). Decision: filtering by pattern is more robust than hardcoding the last row number.

**Unmatched related terms**
178 related terms could not be matched to a term page. These are written to `reports/unmatched-related-terms.md` and shown as plain text tags on the term page. Decision: unmatched terms are not an error; the spreadsheet may have inconsistent naming. The report allows the user to fix the spreadsheet later.

**Social links config**
Starlight v0.32 uses `social: { github: 'URL' }` as an object, not an array. The array format used in the scaffold template was for a newer version that was not installed.

**Node.js installation**
Node.js was not pre-installed. Used nvm (Node Version Manager) to install LTS version without requiring Homebrew or admin access.

**Astro version pinning**
Installed `astro@^5.7.0` and `@astrojs/starlight@^0.32.0` as the latest stable versions at build time.

---

## Content

**Riverbend Water page format**
The Riverbend Water sheet has the title in row 1, subtitle in row 2, headers in row 4, and data from row 5. The generated page includes a CSS-only asset hierarchy tree showing P-101 > {M-101, C-101} inside TP1-INTAKE-PS inside TP1-INTAKE inside TP1 inside RWA, as specified.

**Work Order Lifecycle special case**
The term whose title contains "Lifecycle / Status Flow" gets the status track component. Detection is by checking if the title contains "lifecycle" (case-insensitive). This matches exactly one term in the dataset.

**Learning path step count fill-down**
The Learning Paths sheet has the path name only on the first row of each group, not repeated. The build script fills down the path name to group the terms correctly.

**Homepage overrides Starlight index**
The `src/pages/index.astro` page overrides the Starlight splash index. The default `src/content/docs/index.mdx` is rendered inside the `StarlightPage` component from the custom page, which provides the custom homepage content.

**Related term matching**
Three matching strategies are used in order:
1. Exact match on the Term column
2. Case-insensitive match on the Term column
3. Match on the text before " (" or " /" in the term name

If none match, the term is shown as plain text and logged to the unmatched report.

**Prev/next navigation**
On term pages, prev/next links go to neighbouring terms within the same module, sorted by the order they appear in the spreadsheet (row order).

**Sidebar autogenerate**
The sidebar uses `autogenerate: { directory: 'paths' }` and `autogenerate: { directory: 'modules' }`. This means sidebar items are in filesystem order. Because module slugs start with two-digit numbers (01-, 02-, ...), they sort correctly.

---

## Design

**Fonts via @fontsource**
Self-hosted IBM Plex Sans and IBM Plex Mono via the `@fontsource` npm packages, loaded as Starlight `customCss` entries. No Google Fonts CDN is used.

**CSS variable mapping**
Custom design tokens (`--mfg-*`) are mapped to Starlight's CSS variables (`--sl-color-*`) so the Starlight components pick up the custom palette without replacing every component.

**Border radius cap**
All border radii are 2px except the review status badge circle, which is 50% (round). The tag border radius is 2px to match the "stamped equipment tag" aesthetic.

**Favicon**
SVG favicon showing a rectangular equipment tag with a punched hole and three label lines, in the accent color (#c2410c light, #ff7a3d dark). The SVG uses the accent color directly rather than adapting to color scheme preference, since SVG favicon `prefers-color-scheme` support is limited.
