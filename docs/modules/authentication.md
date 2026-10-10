# Authentication & Sessions — Implementation Contract

## Boundaries
Two actor types: Platform and Clinic. Platform JWT has no clinic context. Clinic JWT identifies clinic user/ClinicId/Super User context. Each protected controller requires the correct ActorPolicy before permission policy. Wrong authenticated actor receives 403, missing/invalid auth 401.

## Current routes
Clinic: `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`. Platform: `POST /api/platform/auth/login`, `/refresh`, `/logout`. Login is anonymous + login rate-limit policy. Refresh is anonymous but validates hashed persisted refresh session. Logout requires matching actor access token.

## Login request/response
LoginRequest contains credential fields defined by backend (email/password). Successful clinic response: BaseResponse<AuthResponse> with AccessToken, RefreshToken, AccessTokenExpiresDate and CurrentUserResponse (user/clinic/roles/effective permissions). Platform response is platform-scoped and contains no ClinicId.

## Session rules
Persist only refresh token hash. Successful refresh rotates: submitted refresh is revoked and replacement stored; reuse/replay returns 401. Logout revokes supplied session. User role replacement, deactivation and clinic suspension invalidate affected sessions/access state immediately. Reactivation never resurrects old sessions. Account inactive/clinic inactive blocks login/refresh/access-token state validation.

## Bootstrap
First Platform Admin can be created only when explicit bootstrap config is enabled. Credentials are environment/secret configuration, never source. After initial bootstrap, disable/remove bootstrap secret values. Re-running must not silently replace an existing platform identity.

## Security
Identity password hashing; configured lockout; no tokens/passwords in logs/audit; HTTPS outside local; secure refresh storage in frontend (prefer HttpOnly secure cookie if backend contract evolves; if token returned to SPA, keep storage strategy explicitly threat-modeled). Correlation ID on responses.

## Tests
Invalid login, rate-limit sixth attempt after configured window behavior, rotation, replay, logout, actor-boundary, inactive user/clinic, role-change revocation, bootstrap idempotence and token claims.
