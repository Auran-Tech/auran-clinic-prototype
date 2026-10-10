# Files & Attachments — Implementation Contract

## Data
FileRecord: Id, ClinicId, OriginalName, StoredName, ContentType, Size bigint, StorageProvider, StorageKey, UploadedAtUtc, UploadedByUserId, audit fields. SQL stores metadata only. PatientAttachment links Patient/File plus Category?/Notes?. ClinicalOrderAttachment links order/section/file as modeled.

## Permissions
`Files_View`, `Files_Upload` plus permission to parent resource. Possessing a FileId is never sufficient authorization.

## Upload
Allowed initial formats: jpg/jpeg/png/pdf. Server validates configured maximum size, extension AND detected/accepted MIME; sanitize display filename; generate storage key/name server-side; never use user path. Upload storage then persist metadata transactionally/compensate storage on DB failure. Malware scanning can be added through provider hook; if not available, do not claim files are scanned.

## Download/read
Resolve FileRecord in current clinic and verify actor can access its parent patient/order/profile resource. Return safe Content-Type/Disposition. Prevent path traversal and direct storage-key exposure where possible.

## Delete
Do not physically delete a referenced file. If deletion is introduced, validate references, audit and remove storage only after DB operation succeeds/compensates.

## Storage
Development local provider allowed; production object/S3-compatible provider through `IFileStorage`. Secrets outside source.

## Tests
MIME/extension mismatch, oversize, unsupported type, tenant access, orphan prevention, storage failure compensation, filename/path traversal, parent permission and upload audit.
