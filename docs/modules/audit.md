# Audit
Audit important patient, medical profile, measurement, queue, visit documentation, order, user/role, workflow/configuration/settings and platform lifecycle actions. Capture actor, action, entity, time and safe metadata. Do not expose mutation/delete through normal APIs. Tenant audit is permission-protected; platform audit stays in the platform boundary.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
