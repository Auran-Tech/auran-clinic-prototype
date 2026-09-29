# AURAN Clinic — Agent Operating Contract

This repository is governed by this file. An implementation agent MUST read it before changing code.

## Mission
Build AURAN Clinic V1 as one production-ready multi-clinic product with two security boundaries: **AURAN Platform** and **Clinic Workspace**. Deliver working vertical slices, not isolated scaffolding.

## Canonical source order
When sources disagree, use this order:
1. Explicit current product decisions recorded in this kit.
2. `docs/product/scope-v1.md`, module specs, requirements, architecture and engineering docs in this kit.
3. Executable tests and behavior already implemented in the current codebase.
4. Approved V1 prototype for UX intent and clinic workflows.
5. Legacy backend specifications and old notes.

Never silently choose between contradictory sources. If levels 1–3 conflict and the correct behavior cannot be proven, stop that feature and record an `OPEN_DECISION`.

## Non-negotiable product rules
- Platform Admin and clinic provisioning/suspension are official V1 foundation capabilities.
- One backend product and one Angular clinic application; platform UI may be a bounded area of the same frontend unless the repository already separates it.
- Backend: .NET 8, ASP.NET Core Web API, EF Core, SQL Server.
- Architecture: modular monolith. No microservices/message broker unless a later approved decision changes this.
- Shared SQL database; clinic-owned data is tenant-scoped by `ClinicId`.
- Platform actors MUST NOT call Clinic APIs; Clinic actors MUST NOT call Platform APIs.
- Authentication uses ASP.NET Core Identity + JWT/refresh sessions.
- Authorization is permission-based. Do not hard-code role checks in controllers.
- Clinic users may have multiple roles; effective permissions are their union.
- Clinic Super User is protected and tenant-scoped. The last active Super User cannot be disabled through normal administration.
- Customer-specific branches are forbidden. Clinic differences belong in configuration/data.
- Controllers stay thin. Business behavior belongs to Application/Domain services.
- Use DTOs; never expose EF entities as public API contracts.
- Use FluentValidation for incoming requests.
- Use EF migrations for schema changes.
- All persisted timestamps are UTC; clinic timezone is for display/business-date interpretation.
- Sensitive medical data, passwords, access tokens and refresh tokens must not be logged.

## V1 scope
Implement only capabilities listed in `docs/product/scope-v1.md`. Appointment scheduling, billing/subscriptions, insurance, accounting, pharmacy, branches, patient mobile app and external lab/radiology integrations are deferred.

## Required workflow for every task
1. Read this file and `README.md`.
2. Read the relevant module spec and cross-cutting requirements.
3. Inspect existing implementation/tests before designing changes.
4. State assumptions in code/PR notes; do not invent product rules.
5. Design the smallest complete vertical slice.
6. Implement domain/application behavior, persistence, API, frontend and permissions as applicable.
7. Add/update migration when persistence changes.
8. Add unit tests for business rules and integration tests for security/transactions/tenant isolation.
9. Verify Swagger/OpenAPI behavior.
10. Run build, automated tests and relevant E2E/Postman tests.
11. Fix failures; do not mark a task complete with known regressions.
12. Update canonical docs/contracts when behavior changes.
13. Check `docs/engineering/definition-of-done.md`.

## Stop conditions
Do not guess: medical decision logic, legal/compliance requirements, destructive migration behavior, permission grants, cross-tenant access, platform-vs-clinic ownership, or a new feature outside V1. Raise an `OPEN_DECISION` with options and impact.

## Quality gates
No feature is complete if it lacks tenant/actor isolation, authorization, validation, error handling, critical tests, migration where needed, API documentation, or frontend permission handling where applicable.
