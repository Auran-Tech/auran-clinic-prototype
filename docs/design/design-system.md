# Design System
The approved prototype is the visual/interaction reference. Production Angular should extract reusable tokens/components rather than copy one-off styles.

## Tokens
Use CSS variables for clinic primary/secondary colors, typography and branding. Workflow statuses use configurable six-digit HEX colors. Keep semantic states (success/warning/error/info) independent from arbitrary clinic branding.

## Components
App shell/sidebar/top bar; page header; buttons; inputs/selects/textareas; cards; tables; badges/chips; filters; modal/dialog; empty/loading/error states; permission-aware action menu; file upload; report preview; status/queue card.

## UX rules
Consistent spacing/type hierarchy; keyboard-accessible controls; visible focus; labels on form fields; validation next to the field; destructive actions require clear confirmation; loading prevents accidental double-submit; responsive layouts; do not communicate status by color alone.
