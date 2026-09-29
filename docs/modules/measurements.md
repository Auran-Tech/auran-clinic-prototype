# Clinical Measurements — Implementation Contract

## Configuration
`ClinicalField`: ClinicId, Name, FieldType max32, Unit?, IsEnabled, SortOrder. `ClinicalFieldOption`: ClinicId, ClinicalFieldId, Label, Value, SortOrder. Use dynamic types compatible with measurement input (Text/Number/Boolean/Date/SingleSelect/MultiSelect as configured); files/images belong to file/profile/order flows unless explicitly approved.

## Reading
`ClinicalMeasurement`: ClinicId, PatientId, optional VisitId, ClinicalFieldId, typed Text/Number/Boolean/Date/Json value, RecordedAtUtc, RecordedByUserId. Historical readings are append-only; configuration edits never rewrite old readings.

## Permissions
Current catalog lacks a dedicated measurement permission; until added, measurement read follows permitted patient/medical profile access and create must be gated by an explicitly approved permission mapping. Do NOT invent a hidden role check. This is a documented implementation gap to resolve by adding a stable permission before exposing write API.

## API/UI
`GET /api/patients/{id}/measurements`, `POST /api/patients/{id}/measurements`; configuration under `/api/configuration/clinical-fields`. UI shows latest + chronological history with field name/value/unit/recorded time/actor and visit link. Entry form renders enabled configured fields.

## Tests
Typed validation, option membership, disabled field, append-only behavior, patient/visit/field same tenant, timezone display, permissions and historical values after config change.
