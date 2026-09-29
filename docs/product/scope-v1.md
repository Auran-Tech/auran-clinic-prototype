# V1 Scope
## In scope — Platform Foundation
Platform Admin authentication/session management; bootstrap of the first Platform Admin; clinic provisioning; creation of the first protected Clinic Super User/initial administrator; clinic listing/detail/metadata update; clinic activation/suspension/reactivation; Platform↔Clinic actor-boundary enforcement; platform/tenant audit required by implemented foundation behavior.

## In scope — Clinic Workspace
Authentication/current-user context; users; static system roles and permission catalog; multi-role assignment; protected Super User; clinic settings/branding/localization; patients and duplicate detection; dynamic patient profile; medical profile; clinical measurements; configurable workflow/live queue/history; visits and multiple doctor sessions; delayed documentation; clinical orders/prescriptions with files/images; follow-ups; reports preview/export; audit; dashboard; file storage abstraction.

## Explicitly deferred
Subscriptions, plans, commercial billing, renewals, owner portal, feature entitlements/usage limits, branches, appointment scheduling, patient mobile app, insurance, accounting, pharmacy, external lab integration, external radiology integration, family linking, advanced offline sync, microservices, message broker and Redis unless a demonstrated technical requirement is separately approved.

## Scope rule
Foundation capabilities already required to securely operate the platform are not considered “advanced SaaS management.” New commercial/SaaS capabilities remain deferred.
