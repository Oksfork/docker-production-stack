
# Architecture

## Purpose

This document describes the target architecture of the
Docker Production Stack portfolio project.

## Components

### Nginx

Acts as the HTTP entry point and routes incoming requests
to the appropriate application service.

### Frontend

A Next.js application responsible for the user interface.

### Backend

A Laravel REST API responsible for application logic
and data access.

### Database

PostgreSQL stores application data using persistent
storage managed by Docker.

## Networking

The target design will expose only the required entry
point to the host.

Internal services will communicate through dedicated
Docker networks.

The database should not be directly exposed to the
public network.

## Persistence

Database data will be stored in a named Docker volume.

Backup and restore procedures will be documented and
tested during later project phases.

## Security Considerations

- Keep secrets out of source control.
- Minimize exposed ports.
- Use non-root users where practical.
- Pin or deliberately update dependency versions.
- Use health checks and least-privilege access.
