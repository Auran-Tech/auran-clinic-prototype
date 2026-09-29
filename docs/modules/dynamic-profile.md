# Dynamic Patient Profile — Implementation Contract

## Configuration model
`PatientProfileSection`: ClinicId, Name, SortOrder, IsSystem, IsEnabled. `PatientProfileField`: ClinicId, SectionId, Label, FieldType max 32, IsRequired, IsEnabled, SortOrder. `PatientProfileFieldOption`: ClinicId, FieldId, Label, Value, SortOrder.

Supported types: Text, LongText, Number, Boolean, Date, Image, File, SingleSelect, MultiSelect. System sections can be enabled/disabled but must not be destructively removed when historical data depends on them. Custom sections/fields are clinic scoped.

## Value model
`PatientProfileValue`: PatientId, FieldId plus exactly the compatible typed value: TextValue, NumberValue decimal(18,2), BooleanValue, DateValue, FileId or JsonValue for multi-value representation. Validate Patient/Field/File belong to same clinic. Do not accept a value for disabled field on new writes. Required applies when the relevant profile section is being saved, not to unrelated patient registration unless explicitly configured for registration later.

## UI
Render fields from configuration sorted by section/field. Select options come only from enabled configured options. Image/File uses file module. Show historical values safely if a field/option is later disabled. Configuration UI supports add/edit/reorder/enable-disable; warn before changes that affect interpretation.

## API target
`GET /api/patients/{id}/profile`; profile-value upsert endpoint(s) may be designed consistently under that resource; configuration under `/api/configuration/profile`. Exact route additions must update OpenAPI.

## Tests
Type/value mismatch, required, option membership, file ownership, tenant FK integrity, disabled field, reordering, historical readability, permission and cross-tenant attempts.
