# Security Baseline
Separate Platform and Clinic actor boundaries. Enforce authentication, actor type, tenant and permission server-side. Never accept a client `ClinicId` as authority. Protect the last active Super User.

Use Identity password hashing, short-lived access tokens plus rotating refresh sessions, refresh replay rejection, immediate revocation after logout/role change/deactivation/clinic suspension, and login rate limiting. Store secrets outside source control. CORS is allow-listed. HTTPS is required outside local development.

Validate all input and uploaded files. Authorize file ownership. Do not log passwords, tokens or full sensitive medical notes. Audit privileged/security/configuration actions using safe metadata. Return correlation IDs without leaking stack traces.

Security tests must cover 401/403 boundaries, cross-tenant attempts, Platform↔Clinic boundary, revoked/rotated tokens, last-Super-User protection and suspended clinic behavior.
