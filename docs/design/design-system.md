# Design System
The approved prototype is the visual/interaction reference. Production React should extract reusable tokens/components rather than copy one-off styles.

## Tokens
Use CSS variables for clinic primary/secondary colors, typography and branding. Workflow statuses use configurable six-digit HEX colors. Keep semantic states (success/warning/error/info) independent from arbitrary clinic branding.

The clinic workspace uses a centered panel that can expand to 1680px on wide screens, with compact gutters and a distinct panel color in both themes. Use self-hosted Inter Variable for English and Noto Sans Arabic Variable for Arabic so rendering does not depend on fonts installed on the developer's computer. Keep ordinary text near 14px and page headings near 26–28px on desktop; preserve responsive scaling and readable controls on mobile.

## Components
App shell/sidebar/top bar; page header; buttons; inputs/selects/textareas; cards; tables; badges/chips; filters; modal/dialog; empty/loading/error states; permission-aware action menu; file upload; report preview; status/queue card.

## UX rules
Consistent spacing/type hierarchy; keyboard-accessible controls; visible focus; labels on form fields; validation next to the field; destructive actions require clear confirmation; loading prevents accidental double-submit; responsive layouts; do not communicate status by color alone.
