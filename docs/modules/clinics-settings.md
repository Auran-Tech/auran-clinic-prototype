# Clinic Settings & Configuration — Implementation Contract

## Ownership split
Platform owns clinic lifecycle and platform-operational metadata. Clinic `Settings_Manage` owns clinic-facing settings/configuration. `Settings_View` reads settings. Configuration endpoints that alter workflow/profile/clinical/order definitions require an explicit management permission; current catalog should add/use a stable Config permission before those APIs are exposed rather than role checks.

## Clinic identity/settings
Clinic: Name, generated immutable Code, LogoUrl/file strategy, PrimaryColor, SecondaryColor, FontFamily, WelcomeTitle, WelcomeMessage, TimeZoneId max100, PatientNumberPrefix max20. ClinicSettings: Phone, Email, Address, Website, Locale, DateFormat, TimeFormat, DocumentationReminderHours, PrescriptionHeader/Footer, WelcomeButtonText. Enforce one settings record per Clinic.

## Validation
Name nonblank/max200; Code server-generated/max50/unique; colors valid CSS hex when provided; supported timezone/locale; patient prefix normalized uppercase/alphanumeric/hyphen and bounded; reminder hours nonnegative within sensible configured limit; email valid; URL valid http(s) if provided. Do not change historical UTC timestamps when timezone changes.

## Branding
Frontend applies clinic branding via CSS variables after authentication/current context. Branding cannot make text inaccessible; UI falls back to safe defaults. Welcome screen uses clinic welcome content and button text.

## Configuration subareas
Workflow statuses/transitions; patient profile sections/fields/options; clinical measurement fields/options; clinical-order section definitions. Configuration is tenant-scoped and changes are audited. Prefer disable over destructive deletion when referenced by history.

## API target
`GET/PUT /api/settings`; `GET/PUT` configuration resources under `/api/configuration/...` with explicit item CRUD/reorder/enable operations. Every new exact route must update OpenAPI and tests.

## UI
Settings sections: Clinic identity/contact; Branding; Localization; Welcome; Prescription defaults; Documentation reminder. Configuration is a separate admin screen with tabs Workflow, Patient Profile, Clinical Fields, Order Sections.
