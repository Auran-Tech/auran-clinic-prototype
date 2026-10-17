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

## Implementation synchronization — October 15, 2026

The current implemented visit-report API uses the existing reporting controller and an incremental GET contract:

- `GET /api/reporting/visits` — visit report preview, requires `Reports_View`.
- `GET /api/reporting/visits/export` — existing CSV visit export, requires `Reports_Export`.
- `GET /api/reporting/visits/export/xlsx` — proposed true Excel/OpenXML visit export in backend PR [#149](https://github.com/Auran-Tech/auran-clinic-backend/pull/149). Requires **both** `Reports_View` and `Reports_Export`, uses the same normalized `VisitReportQuery` filters, returns an `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` download with no patient name in the filename.
- The React frontend integration is PR [#76](https://github.com/Auran-Tech/auran-clinic-frontend/pull/76). Deploy the API before exposing this new button.

Implementation uses native OpenXML ZIP parts, Unicode-safe inline string cells (never interpreted as formulas), and typed Excel UTC date cells; tests cover those properties and SQL-backed endpoint permission gates. Its current in-memory report query is **not yet certified** for high-volume reports; agree on a query cap/streaming strategy and load test before production.

These GET endpoints are the executable incremental implementation, **not** replacement for the target generalized `POST /api/reports/{reportCode}/preview|export` design above. Other V1 report types, branded paginated PDF generation, export audit policy, clinic-local date presentation and full deployment assurance remain outstanding. Do not mark the full Reports V1 feature complete merely because visit XLSX is implemented.

## Incremental release safety boundary — October 16, 2026

Backend [PR #151](https://github.com/Auran-Tech/auran-clinic-backend/pull/151) and frontend [PR #79](https://github.com/Auran-Tech/auran-clinic-frontend/pull/79) are merged:

- The existing visit preview, CSV and XLSX endpoints now enforce a **hard maximum of 10,000 rows**. Queries fetch at most 10,001 rows from SQL to detect over-limit responses without silently truncating patient records.
- If the maximum is exceeded, all three endpoints return **HTTP 413**, error code `report_too_large`. The user must narrow filters and retry. The frontend displays a safe, actionable message.
- CSV and XLSX now both require **`Reports_View` and `Reports_Export`**, so export cannot grant broader authorization than preview.
- This limit prevents unbounded report materialization, but it does **not** establish a scalable reporting design. A future contract must support bounded preview pages, continuation/streaming for high-volume export, explicit resource budgets and load testing.

**Clinical acceptance:** No incomplete or silently truncated clinical export may be presented as complete. Limit changes require product/clinical sign-off, documented operational thresholds and regression tests at the exact boundary. The canonical target API and remaining report types remain unchanged.

## Patients report incremental coverage — October 16, 2026

The following first slice is merged in backend [#152](https://github.com/Auran-Tech/auran-clinic-backend/pull/152) and frontend [#80](https://github.com/Auran-Tech/auran-clinic-frontend/pull/80):

- `GET /api/reporting/patients`: patient preview with clinic-local **registration From/To** and optional **Gender** filters, protected by `Reports_View`.
- `GET /api/reporting/patients/export`: identical bounded report as CSV, protected by **both** `Reports_View` and `Reports_Export`.
- Columns currently implemented: patient number, name, phone, gender, date of birth, registration UTC timestamp.
- Clinic isolation derives from the EF tenant query filter; the result limit is 10,000 records with explicit `413 report_too_large` on overflow. CSV neutralizes spreadsheet formulas.
- A live Playwright test verifies an actual patient registration, preview, CSV download and cross-actor denial against disposable SQL Server.

**Not yet complete:** age at clinic-local reference date, medical conditions summary, patient-specific XLSX and branded PDF, pagination/streaming and generalized POST report contract. Displaying all registration times in user-browser locale may not equal clinic-local display time, so final bilingual/timezone acceptance remains required. Do not label the entire Patients report V1 feature complete.

## Clinic Queue report incremental coverage — October 17, 2026

Backend [PR #153](https://github.com/Auran-Tech/auran-clinic-backend/pull/153) and frontend [PR #81](https://github.com/Auran-Tech/auran-clinic-frontend/pull/81) are merged:

- `GET /api/reporting/queue` — tenant-scoped preview, `Reports_View` required.
- `GET /api/reporting/queue/export` — same bounded report as formula-safe CSV, both `Reports_View` and `Reports_Export` required.
- Filters: clinic-local From/To queue entry date, doctor GUID, workflow status GUID. Includes patient/doctor, workflow status, entry and exit UTC, and elapsed queue minutes for exited entries only.
- Uses EF clinic-scoped joins, deterministic ordering, strict 10,000-row limit with HTTP 413 `report_too_large`, and no silent truncation. The duration field stays blank for active entries rather than guessing.
- Unit date/filter validation and SQL-backed actor-permission checks; Playwright Live Stack verifies clinic actor, Platform denial, reversed date filter and downloaded CSV.

**Still not full V1:** exported Excel, branded PDF, approved clinic-local date/time presentation, separate complete workflow status catalog for filtering, high-volume pagination/streaming, and clinical/operations/privacy review. Existing GET routes are incremental and do not replace the target generalized POST report API.

## Doctor Activity report incremental coverage — October 17, 2026

Backend [PR #154](https://github.com/Auran-Tech/auran-clinic-backend/pull/154) and frontend [PR #82](https://github.com/Auran-Tech/auran-clinic-frontend/pull/82) are merged:

- `GET /api/reporting/doctors` — preview, `Reports_View`.
- `GET /api/reporting/doctors/export` — formula-safe CSV, requires `Reports_View` and `Reports_Export`.
- Filters: clinic-local From/To date on visit entry, optional doctor GUID. Includes all clinic users with `DOCTOR` role even if they have zero visits. SQL calculates clinic-scoped metrics.
- `CurrentQueue` counts queue records with no exit timestamp at request time; **it is deliberately a live operational count independent of selected dates**. `TotalVisits`, `CompletedDocs` and `PendingDocs` are restricted by visit entry dates and doctor. `PendingDocs` includes all statuses except `Completed` (`NotStarted`, `Draft`, `Pending`).
- Uses the shared 10,000-row hard limit and `413 report_too_large` on overflow, plus clinic/actor authorization.
- Unit date/query checks, hosted SQL permission matrix and browser E2E including an actual created `DOCTOR`-role user, empty activity counters, Platform actor denial and CSV export.

**Remaining V1:** XLSX and branded PDF formats, approved multilingual/RTL labels and clinic-local display formatting, reliable monitoring/load budgets, generalized reporting API, paging/streaming, and independent security/clinical/privacy/operations acceptance. Dashboard totals remain operational indicators, not clinical completion attestations.
