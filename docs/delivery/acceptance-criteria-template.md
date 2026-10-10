# Acceptance Criteria Template
Use observable Given/When/Then criteria.

## Happy path
**Given** valid actor, permission and tenant context  
**When** the user performs the action  
**Then** expected state/response/UI is produced.

## Validation
Invalid required/type/range/input → 400 with stable validation details; no partial write.
## Authorization
Unauthenticated → 401. Wrong actor/permission → 403. UI does not expose unauthorized action.
## Tenant isolation
A Clinic actor cannot read/change another clinic's resource even when an ID is known.
## Conflict/concurrency
State/uniqueness conflicts → 409; transaction leaves consistent state.
## Audit
Privileged/clinical/configuration action writes the expected safe audit event.
## Regression
Relevant automated tests pass and a regression test is added for fixed defects.
