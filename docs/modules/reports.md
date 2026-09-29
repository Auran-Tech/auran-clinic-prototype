# Reports — Implementation Contract

## Permissions
`Reports_View` preview; `Reports_Export` export. Export never grants broader data than preview.

## Flow
Select report → set filters → Generate Preview → server returns columns/rows/summary metadata → export same normalized filter to PDF or Excel. Validate from<=to and clinic-local date boundaries converted to UTC query range.

## V1 reports
1. Patients: filters From/To creation date, Gender; columns Patient Number, Name, Phone, Gender, Age, Conditions summary.
2. Visits: From/To, Doctor, DocumentationStatus; Patient, Doctor, Entry, Visit Status, Documentation, Sessions count.
3. Clinic Queue: From/To, Doctor, Workflow Status; Patient, Doctor, Entry, Exit, Status, Clinic Time.
4. Doctor Activity: From/To, Doctor; Doctor, Current Queue, Total Visits, Completed Docs, Pending Docs.
5. Pending Documentation: From/To, Doctor, status limited to NotStarted/Draft/Pending; Patient, Doctor, Entry, Documentation, elapsed/pending age as appropriate.
6. Follow-ups: From/To, Doctor and status where supported; Patient, Doctor, Visit/Recommended date, Recommendation, Status.
7. Measurements: include only if implemented in report service; field/patient/date filters.
8. Audit: may remain audit screen/export if implemented; same tenant/permission rules.

## Export
PDF: clinic branding/header, report title, filters, generated-at clinic local time, paginated table. Excel: stable headers and typed dates/numbers. Escape spreadsheet formula injection for text beginning `=`, `+`, `-`, `@`. File name contains report code/date, no patient name by default.

## Performance/security
Server-side filtering/pagination/streaming as needed; no loading all tenants; cap preview rows and require export for larger results; exports tenant scoped. Do not include fields not defined by report contract.

## API
`POST /api/reports/{reportCode}/preview`; `POST /api/reports/{reportCode}/export` with `{format,filters}`. 400 invalid report/filter/format, 403 missing View/Export.

## Tests
Filter boundaries/timezone, permission separation, tenant isolation, PDF/Excel content headers, formula injection, empty report, large result behavior.
