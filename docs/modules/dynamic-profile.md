# Dynamic Patient Profile
Clinics can configure sections/fields. Types: Text, LongText, Number, Boolean, Date, Image, File, SingleSelect, MultiSelect. Support required validation, options and ordering. Specialty fields belong here instead of Patient columns. Historical values must remain interpretable if configuration changes.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
