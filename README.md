# AURAN Clinic V1 — Canonical Source of Truth

This repository is the authoritative product and implementation specification for AURAN Clinic V1, plus the approved interactive prototype (`index.html`). Start with `AGENTS.md`.

## What an implementation agent gets here
- Exact V1 scope and approved decisions.
- Business/security/permission rules.
- Implementation contracts per module: data, commands/queries, validation, APIs, UI, transactions, audit, edge cases and tests.
- Backend/frontend/database/API architecture.
- Screen and user-flow contracts.
- Engineering Definition of Done and task/acceptance templates.
- Target OpenAPI surface, logical schema inventory, permission catalog and safe demo seed.

## Source precedence
Current product decisions/canonical specs here come first. For foundation behavior already implemented, tested current `Auran-Tech/auran-clinic-backend` code/generated Swagger is the detailed executable reference. Root `index.html` is UX/workflow intent, not production architecture. Legacy specs are references only.

## V1 product
**Platform:** Platform Admin auth, clinic provisioning, initial protected clinic Super User/Admin, clinic metadata, activation/suspension/reactivation, actor-boundary/session security.

**Clinic:** authentication, RBAC/users, settings/configuration, patients, medical/dynamic profile, measurements, live queue/workflow, visits/multi-session/delayed documentation, clinical orders/files, follow-ups, reports, dashboard and audit.

**Deferred:** appointment scheduling, subscriptions/commercial billing, branches, patient mobile app, insurance/accounting/pharmacy, external lab/radiology, family linking and advanced distributed/offline architecture.

## Repository map
`docs/product` product decisions/scope/personas/glossary; `docs/requirements` functional/NFR/business/permissions; `docs/modules` module implementation contracts; `docs/architecture` system/backend/frontend/database/API/integrations; `docs/design` UI/screens/flows; `docs/engineering` coding/security/testing/DoD; `docs/delivery` implementation order/templates; `specs` machine-oriented target contracts.

## Implementation synchronization rule
Production code may live in separate backend/frontend repos, but an intentional contract/scope change is incomplete until this canonical repo is updated. Do not copy old prototype localStorage/demo auth into production.
