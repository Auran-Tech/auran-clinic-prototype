# API Guidelines
- REST-oriented HTTP APIs; preserve current implemented route conventions. Legacy clinic routes have no `/v1` prefix.
- Swagger/OpenAPI must be usable by frontend developers.
- Authentication/authorization errors: 401 unauthenticated, 403 authenticated but wrong actor/permission.
- Validation: 400; missing resource: 404; state/uniqueness conflict: 409; rate limit: 429.
- Stable machine error codes include `VALIDATION_ERROR`, `UNAUTHORIZED`, `FORBIDDEN`, `NOT_FOUND`, `CONFLICT`, `PATIENT_PHONE_ALREADY_EXISTS`, `WORKFLOW_TRANSITION_NOT_ALLOWED`, `VISIT_SESSION_ALREADY_ACTIVE`, `VISIT_SESSION_NOT_ACTIVE`, `SUPER_USER_PROTECTED`, `SYSTEM_ROLE_PROTECTED` plus current foundation codes.
- Paginate growing collections. Never trust tenant IDs supplied by clients as authorization.
- Include/propagate `X-Correlation-ID`.
- File endpoints require resource ownership checks.
- OpenAPI generated from the running API is authoritative over the starter `specs/openapi.yaml` when differences reflect tested current implementation.
