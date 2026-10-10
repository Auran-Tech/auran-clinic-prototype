# Audit — Implementation Contract

## Current API
`GET /api/audit-logs?take=100`, Clinic actor + `Audit_View`; tenant scoped; cap 200 rows. No normal mutation endpoint.

## Event shape
AuditLog contains clinic context for clinic events, actor identity/type, action, entity type/id, OccurredAtUtc and redacted MetadataJson. Platform lifecycle/security events use platform actor and appropriate platform scope.

## Required events
Authentication security events where useful without token/credential content; clinic provision/update/status; user create/update/roles/status; patient create/update; medical profile material changes; measurement create; queue check-in/move/exit; session start/end; documentation completion/material edits; clinical order/file actions; follow-up; configuration/settings changes; report export.

## Redaction
Never audit passwords, JWT/refresh tokens, password hashes, full clinical notes, raw uploaded file content or unnecessary PII. Prefer IDs, action, changed field names and safe before/after state for administrative values. Use current AuditRedactor.

## UI
Recent audit table with time, actor, action, entity and safe details; filter/search can be added server-side without bypassing 200 cap semantics. Display clinic-local time while preserving UTC value.

## Tests
Tenant scope, permission, cap, redaction, immutable API surface, actor attribution and correlation where stored.
