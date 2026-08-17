# IrowzScout — Data Model

## 1. Purpose

This document describes the MongoDB data model used by IrowzScout.

The model is designed around the application's primary workloads:

- Resume processing
- Candidate profile management
- Job ingestion
- Job deduplication
- Personalized job matching
- Scheduled job discovery
- Search execution tracking

---

## 2. Design Principles

### Embed when

- Data belongs tightly to its parent
- Data is usually retrieved together
- The embedded data has bounded growth
- Atomic updates are useful

### Reference when

- Data has high cardinality
- Data grows independently
- Data is queried independently
- Data is shared by multiple entities
- Duplication would become expensive

---

## 3. Collections

- User
- Resume
- CandidateProfile
- SearchProfile
- JobSource
- Job
- JobMatch
- SearchRun

---

## 4. Entity Relationships

```text
User
 ├── Resume
 ├── CandidateProfile
 ├── SearchProfile
 ├── JobMatch
 └── SearchRun

Resume
 └── extractedProfile

SearchProfile
 └── JobMatch

JobSource
 └── Job

Job
 └── JobMatch
```
