# AI Job Hunter — Documentation

AI Job Hunter is an AI-powered job discovery platform that analyzes a user's resume, understands their skills and career preferences, searches connected job sources, ranks opportunities based on their profile, and continuously discovers new relevant jobs.

---

## Documentation

### Product

- [Product Overview](./01-product-overview.md)
- [Architecture](./08-architecture.md)
- [Database Design](./09-database-design.md)

### Development Phases

| Phase   | Document                                                    | Goal                                          | Status |
| ------- | ----------------------------------------------------------- | --------------------------------------------- | ------ |
| Phase 1 | [Foundation](./02-phase-01-foundation.md)                   | Set up the application foundation             | ⬜     |
| Phase 2 | [Resume Intelligence](./03-phase-02-resume-intelligence.md) | Convert resume into structured candidate data | ⬜     |
| Phase 3 | [Job Discovery](./04-phase-03-job-discovery.md)             | Fetch and normalize jobs                      | ⬜     |
| Phase 4 | [AI Matching](./05-phase-04-ai-matching.md)                 | Match jobs against candidates                 | ⬜     |
| Phase 5 | [Automated Discovery](./06-phase-05-automated-discovery.md) | Automatically discover new jobs               | ⬜     |
| Phase 6 | [MVP Polish](./07-phase-06-mvp-polish.md)                   | Make the product production/demo ready        | ⬜     |

### Roadmap

- [Future Roadmap](./10-future-roadmap.md)

---

## MVP Goal

The first version should allow a user to:

1. Create an account
2. Upload a resume
3. Let AI analyze the resume
4. Review and edit their candidate profile
5. Define job preferences
6. Search connected job sources
7. See personalized job matches
8. Understand why a job matches
9. Save interesting jobs
10. Automatically discover new jobs every day

---

## MVP Architecture

```text
                    ┌──────────────────┐
                    │      User        │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │    Next.js       │
                    │   Application    │
                    └────────┬─────────┘
                             │
              ┌──────────────┼──────────────┐
              │              │              │
              ▼              ▼              ▼
        Resume Module   Job Discovery   Scheduler
              │              │              │
              ▼              ▼              ▼
           Gemini       Job Sources     Vercel Cron
              │              │              │
              └──────────────┼──────────────┘
                             ▼
                         MongoDB
                             │
                             ▼
                       Job Dashboard
```
