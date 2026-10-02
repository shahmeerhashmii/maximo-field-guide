# Maximo Field Guide

Plain-English explanations of IBM Maximo terms, organized through one fictional utility: **Riverbend Water Authority**.

**Live site:** https://shahmeerhashmii.github.io/maximo-field-guide/

---

## What this is

Maximo is powerful, but the vocabulary is dense. This guide gives students, career switchers, and new Maximo users plain-English definitions they can read before or alongside the official IBM documentation.

Every example uses Riverbend Water Authority, a fictional municipal water utility, so you can follow the same assets and work orders through every concept.

There are 318 terms across 14 modules and 6 learning paths.

## Who it is for

- Students learning asset management or enterprise software
- Career switchers coming from other EAM or CMMS systems
- New Maximo users who need the "what does this actually mean" version

## Running locally

```
npm install
npm run dev
```

The site runs at http://localhost:4321/maximo-field-guide/

## Updating content

All content comes from `data/Maximo_Glossary_Term_Map.xlsx`.

To update content:
1. Edit the spreadsheet (Term Map, Modules, Learning Paths, Riverbend Water, or Sources tabs)
2. Run `npm run build-content` to regenerate all pages
3. Run `npm run dev` to preview

The build-content script deletes and regenerates all auto-generated pages on every run, so removed rows disappear cleanly. It never touches the hand-written pages (start-here, about).

After running build-content, check `reports/unmatched-related-terms.md` for any related terms that could not be matched to a page.

## Review status

Each term has a review status badge:

- **Verified** - A Maximo practitioner has reviewed and confirmed the definition.
- **Draft** - Written but not yet reviewed.
- **In review** - Under active review.
- **Not started** - Planned but not yet written.

The Verified badge is the one to trust. Draft terms are usable but may have small errors.

## How to contribute

Report a mistake or suggest a term through GitHub issues. Use the templates in `.github/ISSUE_TEMPLATE/`.

Pull requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the full process.

## Disclaimer

Independent community resource. Not affiliated with or endorsed by IBM. IBM and Maximo are trademarks of IBM Corp. Riverbend Water Authority is fictional.

---

## Built with IBM Bob

The technical build of this site was done with IBM Bob, an AI software engineering assistant from IBM. IBM Bob wrote the Astro configuration, the content generation script, the page layouts, the design system, and all the tooling.

The content (definitions, examples, module descriptions, learning paths) is human-written and is being reviewed by Maximo practitioners. IBM Bob was not the source of any term definitions.

---

MIT License. See [LICENSE](LICENSE).
Content: CC BY 4.0. See [CONTENT-LICENSE.md](CONTENT-LICENSE.md).
