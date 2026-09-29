# Medical Profile — Implementation Contract

## Purpose
Normalized clinician-maintained history, separate from basic Patient and custom dynamic fields.

## Entities
`PatientCondition`: PatientId, ClinicId, Name, optional status/notes as supported, RecordedAtUtc, RecordedByUserId. `PatientAllergy`: PatientId, ClinicId, Name, Reaction?, Notes?, RecordedAtUtc, RecordedByUserId. `PatientMedication`: PatientId, ClinicId, Name, Dosage?/Frequency?/Notes as supported by entity, RecordedAtUtc, RecordedByUserId. Same-tenant FKs are mandatory.

## Permissions
`MedicalProfile_View` read; `MedicalProfile_Edit` create/update/remove/mark historical items. Basic Patient permission alone does not grant medical profile access.

## Behavior
No comma-separated storage. Do not infer allergies/conditions from visit text. User-entered names are clinical records, not system medical advice. Preserve history/audit for material changes; hard-delete only if existing product behavior explicitly supports it, otherwise deactivate/end-date or audit deletion.

## API target
`GET /api/patients/{id}/medical-profile`; `PUT /api/patients/{id}/medical-profile` may accept normalized collections with IDs for deterministic reconciliation. Validate all referenced IDs belong to patient/current clinic.

## UI/tests
Separate Conditions, Allergies, Current Medications panels; clear add/edit/remove affordances; permission-aware. Tests cover normalized persistence, tenant references, unauthorized read/edit, audit redaction and no accidental overwrite of unrelated collection items.
