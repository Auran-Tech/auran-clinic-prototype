# Patients
Search first, register second. Core fields: Id, ClinicId, PatientNumber, FullName, Phone, Gender, optional DOB/Notes and audit fields. Exact ClinicId+Phone duplicate is a conflict. PatientNumber is PREFIX-YEAR-SEQUENCE and unique per clinic. Provide search, duplicate assistance, create, get, update and timeline/profile navigation.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
