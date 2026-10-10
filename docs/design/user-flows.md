# V1 User Flows

## Platform bootstrap/onboarding
Deploy empty DB → explicitly enable bootstrap secrets → start API → create first Platform Admin → disable bootstrap → Platform login → Provision Clinic → transaction creates clinic/default settings/initial Super User+ADMIN → clinic admin logs in separately.

## Session lifecycle
Login → access+refresh → access expires → refresh rotates → old refresh unusable. Role change/user deactivate/clinic suspend → affected sessions invalid immediately → reactivation requires fresh login. Logout revokes supplied refresh session.

## Patient registration
Patients → search name/phone → if exact phone match, open existing and block create → otherwise Register → validate demographics → reserve patient number → create/audit → patient profile.

## Check-in/live flow
Find patient → Check In → select doctor if flow requires → create Visit+QueueEntry+initial history transaction → Live Queue → only configured next transitions shown → each move writes history → session start/end through explicit action/status rule → Exit; documentation may remain pending.

## Clinical visit
Open visit → start doctor session → review permitted profile/history → record documentation/measurements/orders → end session → patient may move/wait/recheck → another non-overlapping session may start → operational exit → Save Draft/Pending or Complete Documentation deliberately.

## Dynamic configuration
Admin opens Configuration → add/reorder/enable sections/fields/statuses/order sections → validate references → save/audit → UI renders config on next load. Historical records remain readable.

## Reports
Reports → choose report → set filters → preview → adjust → export same filters PDF/Excel.

## User management
Employees → Create → profile/password/roles → optional Super User only by Super User → create transaction → user logs in. Role replacement/deactivation revokes sessions. Last Super User operation blocked.

## Follow-up
Visit → clinician records recommendation/date → Follow-ups list → authorized staff update status. No booking slot/calendar created.
