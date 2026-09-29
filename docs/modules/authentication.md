# Authentication & Sessions
Identity + JWT access tokens and refresh sessions. Support login, current actor context, refresh rotation and logout. Old access/refresh material must be invalidated according to current foundation behavior. Role changes, deactivation and clinic suspension revoke affected sessions. Login is rate-limited. Never log credentials/tokens.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
