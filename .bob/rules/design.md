# Maximo Field Guide — Design System v2

Follow these rules in all future sessions.

## Concept

A clean engineer's field manual. Minimal, functional, calm.

## Fonts

| Use | Font |
|---|---|
| Page titles, section headings, step card names | Source Serif 4, weight 500 |
| Body, paragraphs, nav, table cells, tags, badges | IBM Plex Sans |
| Field codes (WONUM, WAPPR), module number labels, group labels | IBM Plex Mono, uppercase |

**Never** set paragraphs in Mono. Difficulty text and status badges are sentence case in Plex Sans.

## Colors

### Light mode
| Token | Value |
|---|---|
| background | #F5F7F6 |
| surface | #FFFFFF |
| raised surface | #E9EFEE |
| border | #DCE4E2 |
| row divider | #E6ECEB |
| text | #13262A |
| muted text | #5A6E70 |
| accent | #0E7C74 |

### Dark mode
| Token | Value |
|---|---|
| background | #0F1B1E |
| surface | #152429 |
| raised surface | #1E3338 |
| border | #22353B |
| row divider | #1B2C31 |
| text | #E6EDEC |
| muted text | #93A6A6 |
| accent | #5CC8BE |

Accent is used for links, active sidebar items and focus outlines only.

## Difficulty dots

| Level | Dark | Light |
|---|---|---|
| Beginner | #7BC47F | #3E8E47 |
| Intermediate | #E8B85C | #B7791F |
| Advanced | #E58E73 | #C4583A |

Displayed as a 7px filled circle followed by the word in Plex Sans, sentence case.

## Review status badges

- **Verified**: 16px filled circle #1D9BF0 with white checkmark, label "Verified" in normal text color (never blue).
- **Draft / In review / Not started**: pill shape, 1px border, amber text (#E8B85C dark / #B7791F light), sentence case label.

## Tags

- Field codes: Plex Mono, uppercase, 0.72rem, 1px border (muted), 3px radius.
- Related terms: Plex Sans, 0.82rem, 1px border, 3px radius. On hover: accent border and text.

## Riverbend callout

Surface background, 3px accent left border, small mono uppercase label "AT RIVERBEND" above the text. Border-radius 0 2px 2px 0.

## Module page table

- No vertical borders, no outer table border. Rows separated by 1px divider only.
- No Sub-area column. Rows are grouped under small mono uppercase accent-colored labels (one per sub-area).
- Columns: Term (flexible), Difficulty (130px), Status (110px).
- Row padding 14px 16px. Term names 15px weight 500, accent on hover, no underline.
- Whole row gets surface bg on hover with 6px radius.

## Segmented filter control

Surface background, 1px border, 8px radius, 3px inner padding. Buttons 32px tall. Labels include counts. Active button uses raised-surface bg and text color.

## Module header

Mono label "MODULE 01" in muted, then title in Source Serif 4 at 28px, then description in muted at max-width 56ch.

## General

- Links in body: accent color, underline on hover only.
- Max reading width 72ch.
- Generous whitespace.
- Focus outlines: 2px accent.
- WCAG AA contrast in both modes.

## Never use

- Gradients, glassmorphism, shadows > 2px
- Emojis in UI
- Border radius > 4px except round badge (50%) and segmented control (8px)
- Feature icon grids, stock images
- Animations beyond simple hover transitions
- Phrases: "unlock", "empower", "seamless", "revolutionize", "dive in", "journey"
- Uppercase mono for difficulty or status text (those are Plex Sans sentence case)

## Writing (hand-written pages)

Plain English, short sentences, no em dashes, no hype, no exclamation marks.
