# Clinical Orders / Prescription — Implementation Contract

## Configuration
`ClinicalOrderSectionDefinition`: ClinicId, Name, SectionType (`Structured`, `Text`, `Image`, `File`), SortOrder, IsEnabled. Examples can represent medications, investigations, radiology, instructions or clinic-specific sections without code forks.

## Data
`ClinicalOrder`: ClinicId, PatientId, VisitId, DoctorId, CreatedAtUtc/audit. `ClinicalOrderSection`: order + definition + TextValue + SortOrder. `ClinicalOrderItem`: SectionId, Name, DetailsJson for structured rows. Attachments link FileRecord to order/section as modeled. All references must be same tenant and Visit must belong to Patient.

## Rules
Only enabled definitions can create new sections. Snapshot section display/order/type where needed so old orders remain readable after configuration changes. Structured item JSON is schema-controlled by section implementation; do not accept arbitrary executable/content markup. Autocomplete may remember prior names but must not recommend medication, diagnosis, dosage or treatment.

## Permissions
Current backend catalog has no dedicated prescription/order permission. Before exposing mutations, add an approved atomic permission (recommended `ClinicalOrders_View`/`ClinicalOrders_Manage`) or explicitly map to Visit_Edit through a product decision; never authorize by `DOCTOR` role name.

## API/UI
`GET /api/visits/{id}/clinical-orders`, `POST /api/visits/{id}/clinical-orders`, detail/update endpoints if editing is approved. UI builds sections from clinic configuration, supports text/structured rows/image/file upload, print-friendly prescription header/footer from settings.

## Tests
Same-tenant patient/visit/doctor/files, disabled definition, attachment authorization, historical configuration changes, permissions, malformed structured payload and audit.
