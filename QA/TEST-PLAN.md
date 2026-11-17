# Spendify / BudgetTrack — QA & Test Plan

## Automated quality gates

From the repository root run: `npm install`, `npm run lint`, `npm test`, `npm run test:coverage`, and `npm run build`.

For the marketing site run: `npm install --prefix website`, `npm run typecheck --prefix website`, and `npm run build --prefix website`.

The GitHub Actions workflow runs the web checks and marketing-site checks for pull requests, pushes to `main` and `qa/**`, and manual dispatches.

## Automated coverage added

- Finance helper unit tests: income/expense aggregation, empty ledgers, invalid/negative amounts, account balance adjustment, CSV column order and escaping.
- Bottom navigation component tests: active-page accessibility state, available destinations, and tab selection callback.
- TypeScript checks and production builds for the root web app and marketing website.

## Manual test matrix

Record commit/build, device/browser, date, tester, result, and evidence for each run. Mark N/A only with a reason.

| Area | Scenario | Expected result |
|---|---|---|
| Dashboard | Fresh storage launch | Loads a sensible default/empty state without console errors |
| Transactions | Add income and expense | Correct amount, type, date, category, note, and account |
| Validation | Blank, zero, negative, malformed, and very large amounts | Invalid values blocked; no NaN/infinite values |
| Accounts | Add account; use it for income and expenses | Correct account changes exactly once |
| Balance integrity | Spend more than account balance | Product policy is respected; no unintended negative balance |
| Goals | Create valid/invalid goal; deposit; complete; delete | Validation, progress, and status update correctly |
| Persistence | Reload after each mutation | No lost, duplicated, or stale records |
| Offline | Disable network; add records; reload | Local core workflows remain usable |
| Recovery | Remove/corrupt a stored key | Graceful recovery, no blank-screen crash |
| CSV export | Empty/populated ledger with commas, quotes, and line breaks | Valid CSV with every field preserved |
| Navigation | Visit each tab and open/close each modal | No dead ends; close/back behavior is consistent |
| Responsive | 320, 375, 390, 430px, tablet, desktop | No horizontal overflow or clipped controls |
| Accessibility | Keyboard-only, screen reader, 200% zoom, reduced motion | Logical focus, visible focus, labels, contrast, semantic controls |
| Visual regression | Light/dark mode and core screens | No unintended layout or theme changes |
| Security/privacy | Inspect storage, logs, export, network requests | No secrets/tokens or unnecessary personal data exposed |
| Performance | Cold start, long transaction list, repeated modal use | No visible jank or unbounded memory/render growth |
| Regression | Repeat core flows after each release | Existing behavior remains intact |

## Mobile-specific checks

The repository currently contains `mobile/` as a Git submodule pointer. Confirm its source is initialized and available before running Expo tests. On Android/iOS devices or emulators additionally verify:

- Launch, foreground/background, force-close/relaunch, and OS process recreation.
- SQLite/AsyncStorage persistence and migrations across app upgrades.
- Airplane mode, network recovery, sync retry, duplicate prevention, and conflict resolution.
- Android back gesture, iOS back navigation, safe areas, keyboard avoidance, and small-screen layouts.
- Biometrics unavailable, success, failure, cancellation, and device-lock changes.
- Backup/export, restore, and data deletion flows.
- Dynamic text size, VoiceOver/TalkBack labels, touch target sizes, and reduced motion.

## Defect severity

- **P0 Critical:** data loss/corruption, cross-user data exposure, materially incorrect financial totals, app cannot start.
- **P1 High:** core transaction/account/goal flow blocked, security regression, offline core use broken.
- **P2 Medium:** important workflow degraded with a workaround.
- **P3 Low:** cosmetic, copy, or minor interaction issue.

Every defect should include reproducible steps, expected/actual result, environment, severity, and evidence. Never attach real financial records or secrets to public issues.
