# Medical Profile
Represent conditions, allergies and current medications as normalized child records, not comma-separated strings. Access requires medical-profile permissions. Changes are audited. The medical profile is distinct from configurable custom profile fields.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
