# API Contract Guidelines

## Base routing
Current backend uses `/api/...`; no additional `/v1` URL segment in V1. Swagger document may still be named `v1` (`/swagger/v1/swagger.json`)—that is documentation versioning, not route prefixing.

## Envelopes
Application models: `BaseResponse { Message?, Status, Error? }`, `BaseResponse<T> : BaseResponse { Data? }`; one shared `PaginatedResponse<T>` + `PaginationInfo`. Do not create module-specific envelopes.

## Status semantics
200 read/update/action success; 201 create where current controller does so; 400 binding/validation; 401 unauthenticated/invalid session; 403 wrong actor or missing permission; 404 tenant-safe not found; 409 uniqueness/state/concurrency conflict; 429 login rate limit; 500 safe generic error + correlation ID.

## IDs and tenant
IDs are GUIDs unless current model says otherwise. Never use caller ClinicId to authorize clinic endpoints. Cross-tenant resource IDs behave as inaccessible/not-found rather than revealing existence.

## Pagination/filtering
Use query DTOs with page >=1 and bounded row count. Dates are ISO-8601; date-only report filters are interpreted in clinic timezone. Sort fields are allow-listed.

## Validation
FluentValidation/application validators plus DB constraints. Reject unknown enum/status values. Normalize email/phone/codes at boundaries. Validation error response is stable and localizable.

## Idempotency/concurrency
GET is side-effect free. Token refresh is single-use rotation. Provision/check-in/move use transactions. Where retry could duplicate a create, use uniqueness/idempotency/counter semantics. Use rowversion/ETag only when implemented consistently; otherwise return deterministic 409 on detected lost update.

## Security/OpenAPI
Every protected operation documents Bearer auth and 401/403. Generated OpenAPI from running backend is authoritative for implemented foundation. Starter `specs/openapi.yaml` covers target unfinished modules and must converge with generated Swagger as modules ship.

## Correlation/localization
Accept/generate `X-Correlation-ID`; return it. API messages use localization infrastructure; machine error/permission keys remain stable and language-neutral.
