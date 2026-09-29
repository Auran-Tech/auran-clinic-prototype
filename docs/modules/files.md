# Files & Images
Use `IFileStorage`. SQL stores FileRecord metadata and storage key, not large binaries. Initial allowed formats: jpg/jpeg/png/pdf. Validate size, MIME/type and ownership. Development may use local storage; production may use object/S3-compatible storage. Download/read requires tenant and resource authorization.
## Cross-cutting rules
Apply actor/tenant isolation, authorization, validation, audit where relevant, standard errors/responses, UTC persistence and the global Definition of Done.
