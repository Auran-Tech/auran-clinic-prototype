# V1 Screen Contracts

## Global shell
Authenticated clinic shell: branded sidebar/topbar, current user/roles, clinic name, logout, permission-filtered navigation. Navigation: Dashboard, Patients, Live Queue, Visits, Pending Docs, Follow-ups, Reports, Employees, Roles & Permissions, Configuration, Settings, Audit, System Guide as permitted. Every screen defines loading, empty, validation, forbidden and server-error states.

## Platform
**Platform Login:** email/password, validation, rate-limit error. **Clinics List:** name/code/status/timezone/admin summary, open/provision. **Provision:** clinic Name, CodePrefix, timezone, patient prefix, phone/email/address/website/locale + initial admin fields. **Clinic Detail/Edit:** immutable code, editable operational metadata. **Suspend/Reactivate:** explicit confirmation and warning that suspension invalidates clinic sessions.

## Clinic auth/welcome
Email/password login. On success show configurable welcome page: logo/clinic mark, WelcomeTitle, WelcomeMessage, WelcomeButtonText, then enter workspace. Production does not use prototype demo-user picker.

## Dashboard
Today's activity/queue/documentation/follow-up/doctor metrics constrained by permissions.

## Patients
Search/filter/list + Register. Table shows patient number, name, phone, gender, age. Patient detail header + sections: Overview, Medical Profile, Measurements, Visits, Prescriptions/Orders, Investigations/Attachments, Follow-ups, Timeline when enabled/permitted.

## Live Queue
Columns/groups by configured workflow status. Queue card: patient, number, doctor, entry/wait time, next allowed transitions, exit. Check-in flow starts from patient search and doctor selection when required.

## Visits
List filters date/doctor/status/documentation. Visit workspace: patient context, session history/start-end, complaint/examination/diagnosis/notes/treatment plan, measurements, orders, follow-up, Save Draft/Complete Documentation. Pending Docs is a focused list of NotStarted/Draft/Pending visits.

## Follow-ups
Filters + table patient/doctor/recommended date/recommendation/status; edit status/recommendation if Manage.

## Reports
Report cards → report-specific filter form → preview table → Export PDF/Excel. Export button requires Reports_Export.

## Employees
List user, email, phone, roles, Super User, active status. Create/edit; roles multi-select; activate/deactivate; protected Super User messaging.

## Roles & Permissions
Role tabs (ADMIN/RECEPTIONIST/DOCTOR/NURSE), permission groups and localized descriptions. Built-in grants read-only in V1 unless catalog/product decision changes.

## Configuration
Tabs: Workflow; Patient Profile; Clinical Fields; Clinical Order Sections. CRUD/reorder/enable-disable with reference-safe behavior.

## Settings
Clinic identity/contact, branding, locale/timezone/date/time, welcome content, prescription header/footer, documentation reminder.

## Audit
Recent tenant events, capped/query-backed; time/actor/action/entity/safe metadata.

## System Guide
Explains product workflows/roles; no privileged data/actions.
