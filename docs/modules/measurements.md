# Clinical Measurements
Clinic configures measurement catalog (name/type/unit/options/enabled). Patient readings are append-only historical records optionally linked to a Visit. New readings never overwrite old ones. Validate value against configured field type/options.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
