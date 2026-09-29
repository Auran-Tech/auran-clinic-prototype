# Platform Foundation
## Goal
Securely operate clinic tenants from the AURAN platform boundary.
## Capabilities
Platform bootstrap/login/refresh/logout; provision clinic + initial protected Super User; list/get/update clinic; suspend/reactivate; platform audit as implemented.
## Rules
Platform token cannot access Clinic APIs and vice versa. Bootstrap is explicit and disabled after initial setup. Duplicate initial identity conflicts. Suspension revokes sessions immediately; reactivation never revives them. Provisioning is transactional/idempotency-aware.
## Acceptance
E2E proves login/refresh rotation, replay rejection, actor-boundary 403, provisioning, duplicate identity 409, suspension token invalidation, reactivation with fresh session and logout revocation.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
