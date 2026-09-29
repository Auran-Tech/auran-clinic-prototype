# AURAN Clinic V1 — Canonical Agent Kit

This repository is the canonical source of truth for AURAN Clinic V1. The prototype and reference assets live alongside these canonical contracts; when they disagree, follow `AGENTS.md`. Start with `AGENTS.md`, then `docs/product/scope-v1.md`, then the module you are implementing.

## Product boundaries
AURAN Clinic V1 contains two bounded areas: **Platform Foundation** for AURAN administrators to provision and control clinics, and the **Clinic Workspace** used by clinic staff for patients, queue, visits, clinical documentation, reports and administration.

## Technology
Backend: .NET 8 / ASP.NET Core Web API / EF Core / SQL Server. Frontend: Angular / TypeScript / SCSS. Authentication: Identity + JWT/refresh sessions. Authorization: permission-based RBAC. Deployment style: modular monolith.

## Documentation map
- `docs/product/`: why the product exists, scope, personas and terminology.
- `docs/requirements/`: functional/NFR/business/permission rules.
- `docs/modules/`: one implementation contract per module.
- `docs/architecture/`: backend, frontend, database and API boundaries.
- `docs/design/`: design system, screens and user flows.
- `docs/engineering/`: coding, security, testing and completion rules.
- `docs/delivery/`: build order and task/acceptance templates.
- `specs/`: machine-oriented contracts and starter schema/data.

## Current V1
Platform Admin, provisioning and suspension are **in scope**. Appointments and commercial billing/subscriptions remain **out of scope**.

## Prototype reference
The root `index.html` remains the approved interactive UX/workflow reference. It is not the production architecture and MUST NOT override canonical product, security, data, or engineering contracts.

## Repository role
This repository owns the canonical product definition and implementation contracts. Production backend/frontend source may live in separate repositories, but implementation changes must remain aligned with the contracts here. Any intentional behavior change must update this repository's canonical docs/specs in the same delivery process.
