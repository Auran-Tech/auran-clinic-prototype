# AURAN Clinic — Agent Operating Contract

This repository is the canonical product/implementation specification for AURAN Clinic V1. Read this before any implementation task.

## Source precedence
When details conflict:
1. Explicit approved decisions in `docs/product/decisions.md` and current V1 scope.
2. Canonical module/requirements/architecture/spec files in this repository.
3. Current tested implementation/generated Swagger in `Auran-Tech/auran-clinic-backend` for foundation behavior already implemented.
4. Root `index.html` approved prototype for UX/workflow intent not otherwise specified.
5. Legacy backend specs/old notes.

Never silently choose between contradictions. For a genuinely missing medical/commercial/destructive/security decision, record `OPEN_DECISION` and stop only that affected behavior; continue independent work.

## Mission & architecture
Build one production-ready configurable multi-clinic product with AURAN Platform and Clinic Workspace security boundaries. Backend .NET 8/ASP.NET Core/EF Core/SQL Server modular monolith; frontend Angular/TypeScript/SCSS. Shared DB with ClinicId tenant boundary. Configuration over customer forks.

## V1 boundaries
Platform Admin/provisioning/suspension are in V1. Clinic modules: auth/RBAC/settings, patients, medical/dynamic profile, measurements, workflow/live queue, visits/sessions/delayed docs, clinical orders/files, follow-ups, reports, dashboard, audit. Deferred: appointments, subscriptions/billing, branches, insurance/accounting/pharmacy, patient mobile, external lab/radiology, family linking, advanced offline, microservices/message broker.

## Non-negotiable engineering rules
- Platform actor cannot call Clinic APIs; Clinic actor cannot call Platform APIs.
- Never trust caller ClinicId for authorization. Enforce tenant scope in service/query and DB relationships.
- Identity + JWT + rotating hashed refresh sessions. Session invalidation rules in authentication spec.
- Permission policies, never role-name controller logic. Multi-role union; protected tenant-scoped Super User.
- Thin controllers; Application orchestrates; Domain owns invariants; Infrastructure owns EF/Identity/storage.
- DTOs at API; FluentValidation; global exception handling; stable BaseResponse/Pagination conventions.
- EF migrations only for schema evolution. Inspect latest snapshot/migrations first.
- UTC persistence; clinic timezone for display/business date.
- Transactions for multi-record operations; concurrency-safe counters and operational state.
- No sensitive credentials/tokens/full medical notes in logs/audit.
- No autonomous medical diagnosis/treatment/recommendation logic.
- No customer-specific branches.

## Task workflow
1. Read relevant product decision, module spec, business rules, permission/security/API/database docs.
2. Inspect current backend/frontend implementation and tests before designing.
3. Identify implemented vs missing behavior; extend, do not duplicate foundation.
4. Implement smallest complete vertical slice: domain/application → persistence/migration → API → Angular UI → tests/docs.
5. Add permission catalog/localization when a new protected action is introduced.
6. Add unit tests for invariants; integration tests for actor/tenant/permission/transaction/concurrency; UI/E2E for critical flow.
7. Verify generated Swagger and API response/error behavior.
8. Run builds/tests and relevant Postman E2E. Fix failures.
9. Update canonical docs/specs in this repo whenever intentional behavior changes.
10. Check Definition of Done.

## Stop conditions
Do not invent: medical decision rules; legal/compliance retention requirements; destructive migration/data deletion policy; permission grants; cross-tenant/platform ownership; new out-of-scope commercial feature. Record options/impact as OPEN_DECISION.

## Completion rule
A feature is not complete without actor+tenant isolation, permission, validation, persistence integrity, transaction/concurrency consideration, stable errors, audit where required, Swagger, critical automated tests, Angular permission/error/loading behavior where applicable, and updated canonical docs.
