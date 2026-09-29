# Coding Standards
## C#/.NET
Nullable reference types enabled; async I/O with `Async` suffix; cancellation tokens through I/O boundaries; dependency injection; small cohesive services; FluentValidation; no controller business logic; no direct entity exposure; no catch-and-ignore; no secrets/constants for environment credentials; meaningful domain/error names.

Prefer feature folders inside architectural projects when modules grow. Keep domain independent from EF/ASP.NET. Infrastructure implementations satisfy Application interfaces. Avoid generic repository abstractions that hide useful EF capabilities unless the existing codebase already standardizes them.

## Angular/TypeScript
Strict typing; feature-oriented organization; smart/container logic separated from reusable presentation where useful; RxJS streams cleaned up; no business rules duplicated in templates; typed API models/services; guards/interceptors centralized; no production state in localStorage except explicitly approved session strategy.

## SQL/EF
Migrations are forward-reviewable; add indexes/constraints deliberately; no destructive data change without migration plan; UTC datetime semantics; tenant filters and tenant-aware keys.

## General
No customer-specific branches. No commented-out/debug code. Comments explain why, not obvious what. Keep changes scoped; update tests/docs with behavior.
