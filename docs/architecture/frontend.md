# Frontend Architecture
Target: one Angular/TypeScript/SCSS product organized by bounded features.

```text
src/app/
  core/        auth, guards, interceptors, API base, session, error handling
  shared/      reusable presentational components, directives, pipes, models
  platform/    Platform Admin bounded area
  features/    dashboard, patients, queue, visits, follow-ups, reports,
               employees-rbac, configuration, settings, audit
```

Use route-level lazy loading where useful. API calls live in typed services, not components. Components do not invent business rules. Route/action visibility uses effective permissions; backend remains authoritative. Global interceptors handle auth/correlation/common errors. Forms use Angular validation mirroring server constraints without replacing server validation.

The approved prototype is UX intent, not production architecture. Rebuild it as accessible responsive components; do not copy demo localStorage behavior into production. Keep styling tokenized so clinic branding can be applied through CSS variables. Design for future RTL/localization even if V1 content begins in English.
