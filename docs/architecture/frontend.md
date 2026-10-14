# Frontend Architecture

## Implemented production stack

The production frontend is `Auran-Tech/auran-clinic-frontend`, built with React 19, TypeScript and Vite. Routing uses React Router; server-state synchronization uses TanStack Query; HTTP uses Axios; forms use React Hook Form and Zod; localization uses i18next. Tests use Vitest and Testing Library.

The historical Angular frontend description was superseded by the actual implemented frontend repository. Do not create an Angular application or port completed screens to a second framework.

## Feature boundaries

Organize frontend implementation by clinical and administrative bounded features: platform administration, dashboard, patients, queue, visits, clinical orders, attachments, follow-ups, employees/RBAC, clinic settings, reports, and audit. Reuse the existing repository's conventions and components after inspecting them; this is a responsibility map, not a mandate to reorganize working files.

Keep API calls in typed service modules or data hooks instead of embedding HTTP calls in presentation components. Avoid duplicating backend business rules. Use feature-level loading, empty, error, and permission-denied states.

## Security and privacy

Backend authorization and tenant isolation remain authoritative. UI permissions only affect affordances. Never persist medical records or credentials in localStorage, console logs, analytics, or demo seed code. Session handling must follow backend rotation and revocation contracts. Ensure the prototype's simulated authentication is not reused.

## Localization and design

Arabic and English are first-class, including RTL/LTR behavior. IDs, phone numbers, and timestamps stay machine-readable and visually isolated where needed. Rebuild approved prototype workflows as accessible responsive React components rather than copying the prototype file-for-file. Prefer shared tokens and CSS variables for clinic branding.

## Verification

For each vertical slice, validate the API contract against current backend OpenAPI and add permission, failure, loading, accessibility and critical workflow tests. Run `npm run lint`, `npm run test`, and `npm run build`, and verify browser flows against the real backend wherever practical.
