# Clinic Settings
Clinic is the tenant boundary. Manage identity, code, logo/branding, contact details, timezone, locale, date/time formats, patient prefix, welcome content, prescription header/footer and documentation reminder hours. Platform owns lifecycle/provisioning; clinic-authorized settings manage clinic-facing configuration. Never encode customer-specific behavior in code.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
