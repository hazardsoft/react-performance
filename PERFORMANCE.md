# Performance Optimization Report

CO₂ Emissions Data Explorer — profiling baseline, optimizations, and before/after comparison.

---

## Profiling Methodology (test conditions)

All measurements were captured under identical conditions for baseline and optimized runs so the
before/after comparison is valid:

- **Mode:** development (`npm run dev`, Vite) — per task requirement.
- **Browser:** Chrome Incognito, **React DevTools the only enabled extension**.
- **CPU throttle:** Chrome DevTools → Performance → **CPU 6× slowdown**, identical in both phases.
- **react-scan:** `enabled: false` while recording Profiler numbers (used separately, only as a
  qualitative "what re-renders and why" pass).
- **StrictMode:** left enabled (dev double-render) and identical across both phases.

---

## Baseline Measurements

### Interaction A: Sort countries

- **Commit duration**: 4100 ms
- **Render duration**: 1187 ms
- **# commits**: 1
- **Screenshot**: ![baseline sort](screenshots/baseline/sort-countries.png)/

### Interaction B: Search countries (type "United")

- **Commit duration**: 1900 ms
- **Render duration**: 521 ms
- **# commits**: 6
- **Screenshot**: ![baseline search](screenshots/baseline/search-countries.png)

### Interaction C: Change year

- **Commit duration**: 3400 ms
- **Render duration**: 1204 ms
- **# commits**: 1
- **Screenshot**: ![baseline year](screenshots/baseline/change-year.png)

### Interaction D: Toggle column

- **Commit duration**: 9100 ms
- **Render duration**: 1055 ms
- **# commits**: 4
- **Screenshot**: ![baseline column](screenshots/baseline/toggle-column.png)

---

## Optimized Measurements

### Interaction A: Sort countries

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **# commits**: \_\_\_
- **Screenshot**: ![optimized sort](screenshots/optimized/a-sort.png)

### Interaction B: Search countries (type "United")

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **# commits**: \_\_\_
- **Screenshot**: ![optimized search](screenshots/optimized/b-search.png)

### Interaction C: Change year

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **# commits**: \_\_\_
- **Screenshot**: ![optimized year](screenshots/optimized/c-year.png)

### Interaction D: Toggle column

- **Commit duration**: \_\_\_ ms
- **Render duration**: \_\_\_ ms
- **# commits**: \_\_\_
- **Screenshot**: ![optimized column](screenshots/optimized/d-column.png)

---

## Summary of Improvements

| Interaction      | Baseline (ms) | Optimized (ms) | Improvement |
| ---------------- | ------------- | -------------- | ----------- |
| Sort countries   | \_\_\_        | \_\_\_         | \_\_\_%     |
| Search countries | \_\_\_        | \_\_\_         | \_\_\_%     |
| Change year      | \_\_\_        | \_\_\_         | \_\_\_%     |
| Toggle column    | \_\_\_        | \_\_\_         | \_\_\_%     |
| **Average**      | **\_\_\_**    | **\_\_\_**     | **\_\_\_%** |

> Improvement % = (baseline − optimized) / baseline × 100.
