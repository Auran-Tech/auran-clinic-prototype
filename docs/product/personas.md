# Personas and Actors
## AURAN Platform Admin
Operates the platform boundary. Provisions clinics, manages clinic lifecycle/metadata and cannot use Clinic APIs with a Platform session.

## Clinic Super User
Protected clinic-level actor with all clinic permissions. Still restricted to one clinic. At least one active Super User must remain.

## Admin
Clinic administration: users, configuration, settings, reports/audit according to permission catalog.

## Receptionist
Searches/registers patients, checks patients in, operates permitted queue actions and reviews follow-ups.

## Doctor
Reviews patients/medical profile, performs visit sessions, records clinical documentation/measurements/orders, completes documentation and creates follow-up recommendations.

## Nurse
Views patients/queue/visits and records permitted measurements.

## Patient
A subject of clinic records in V1, not an authenticated application actor. Patient mobile access is deferred.
