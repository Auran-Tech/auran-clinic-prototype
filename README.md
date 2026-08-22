# AURAN Clinic Management — Prototype

Interactive UI/UX prototype for the **AURAN Clinic Management System**.

This repository contains the current product prototype used for:

- Product discussions
- UI/UX reviews
- Workflow validation
- Client demonstrations
- Feature planning
- Early usability testing

> This is a prototype only. It is not the production application.

---

## Live Demo

The prototype is deployed using GitHub Pages.

**Demo:** Add GitHub Pages URL here

---

## Current Scope

The prototype currently demonstrates the planned V1 experience for:

- Authentication
- Post-login clinic welcome screen
- Dashboard and statistics
- Patient management
- Duplicate patient detection
- Dynamic patient profiles
- Live clinic queue
- Configurable clinic workflow
- Multi-session patient visits
- Clinical documentation
- Prescription sections
- Attachments and images
- Pending documentation
- Patient follow-ups
- Employees
- System roles
- RBAC permissions
- Permission-aware navigation
- Reports
- PDF / Excel export flow
- Clinic configuration
- System settings
- Timezone and localization
- Audit log
- System guide

---

## Clinic Workflow

The workflow is configurable per clinic.

Different clinics may require different patient stages.

For example:

Patient Check-In  
→ Waiting  
→ Doctor  
→ Drops / Observation  
→ Waiting Again  
→ Doctor Re-check  
→ Exit

The prototype also supports multiple clinical sessions inside the same patient visit.

---

## Roles & Permissions

The system uses Role-Based Access Control (RBAC).

A user can have multiple roles.

System roles are protected and cannot be renamed, deleted, or have their built-in permissions modified.

Navigation and available actions change according to the user's effective permissions.

A protected Super User has full system access.

---

## Running Locally

No installation is required.

Clone the repository:

git clone <repository-url>

Then open:

index.html

in any modern browser.

---

## Technology

This prototype is intentionally implemented as a standalone:

- HTML
- CSS
- JavaScript
- Browser LocalStorage

No backend or database is required for the prototype.

---

## Important

The architecture of this prototype does **not** represent the final production architecture.

The production system will be developed separately using:

- .NET Backend API
- Angular Frontend
- SQL Server
- Production authentication and authorization
- Persistent server-side storage

---

## Repository Purpose

This repository should remain focused on the interactive product prototype.

Production source code should be maintained in separate repositories.

Suggested repositories:

- `auran-clinic-prototype`
- `auran-clinic-api`
- `auran-clinic-web`

---

## Status

**Current Stage:** Interactive Product Prototype

The prototype is actively evolving based on product discussions, clinic requirements, and UI/UX feedback.

---

© AURAN Technology
