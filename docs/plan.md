# Hybrid Offline-First Budget Tracker — Product and Implementation Plan

## 1. Product vision

Build a small Expo React Native budget tracker with flexible transaction reports and a hybrid assistant:

- Offline: a lightweight assistant programmed with rules, supported phrases, and response templates reads local financial data.
- Online: cloud AI provides more flexible conversation and explanations using verified financial reports.
- Transactions remain usable offline and synchronize with the cloud when the service is reachable.
- No language model is bundled with the app or downloaded afterward.

The offline assistant is a rule-based program, not an on-device language model. The online assistant uses a model hosted by a provider. Both rely on application code for money calculations.

## 2. Requirements from the original idea

1. Daily summary.
2. Weekly summary.
3. Transaction filtering for different wallets.
4. A complete transaction report.
5. A user-selected date range, such as August 4–18, that shows how much was spent during that period.
6. An assistant available without internet.
7. A small app installation without model downloads.
8. Automatic synchronization when online.
9. Cloud AI assistance when online, with offline assistance when disconnected.
10. Implementation in the existing Expo React Native app.

## 3. Reporting and transaction features

### Daily summary

- Selected date, income, expenses, and net cash flow.
- Spending by category and wallet.
- Largest spending category and matching transactions.
- Optional comparison with the previous day when comparable data exists.

### Weekly summary

- Weekly income, expenses, and net cash flow.
- Spending per day and per category.
- Comparison with the previous equivalent week.
- Configurable week start; apply the same setting throughout the app.

### Monthly and custom reports

- Monthly summaries and arbitrary start/end dates.
- Quick choices: Today, Yesterday, This Week, This Month, and Custom Range.
- Start and end dates are both included.
- Summary totals, category breakdowns, wallet breakdowns, and matching transactions.
- Optional comparisons against a clearly labeled previous period of equivalent length.

### Complete transaction report

- Search transaction descriptions, merchants, or notes.
- Filter by date range, one or more wallets, category, and transaction type.
- Sort by date or amount.
- Show active filters, a reset action, transaction count, and filtered totals.
- Clearly show empty states and let users adjust filters.
- Export the same filtered report to CSV or PDF in a later phase.

### Financial calculation rules

- Store amounts as integer minor units, such as centavos, with a currency code.
- Exclude transfers between personal wallets from income and expense totals; still show them in transfer history.
- Distinguish net cash flow for a period from a wallet's current balance.
- Apply one documented policy for refunds, reversals, and deleted transactions across all reports.
- Use transaction occurrence dates for reporting, not synchronization dates.
- Interpret date boundaries in the user's configured reporting timezone. Query from the start date's midnight up to, but excluding, midnight after the end date.
- Never combine different currencies into one monetary total without an explicit conversion policy. Initially, show separate totals by currency.
- Use the same reporting definitions locally and on the backend.

## 4. Offline assistant

### Supported capabilities

- Answer income and spending questions for supported time periods.
- Filter answers by wallet and category.
- Identify the largest spending category.
- Check spending against a saved budget.
- Produce daily, weekly, and monthly summaries.
- Compare periods using deterministic calculations.
- Suggest transaction categories using merchant mappings or keywords, with user correction.
- Produce budget alerts using defined thresholds.

### Example questions

- “How much did I spend today?”
- “Show my GCash expenses this week.”
- “How much did I spend on food from August 4 to August 18?”
- “Where did most of my money go this month?”
- “Am I over my food budget?”
- “Summarize this week.”

### Processing flow

1. Normalize the question without changing meaningful names or amounts.
2. Match a supported intent.
3. Extract dates, wallet names, categories, and transaction type.
4. Validate the extracted values against the user's data and allowed reporting actions.
5. Ask for clarification when required information is ambiguous.
6. Run a predefined local reporting function.
7. Produce a template response and a link to the matching report.

Example intent: `expense_summary(dateRange, walletIds, categoryIds)`.

### Boundaries

- Support a defined vocabulary rather than promising unrestricted conversation.
- If a year, wallet, or date is unclear, ask the user to choose it; never silently invent filters.
- If unsupported, show useful suggested questions or open manual report filters.
- State when there are no matching transactions.
- Treat missing budgets as missing, not as a zero budget.
- Initial language support: English. Consider Filipino/Taglish aliases after testing with representative questions.

## 5. Online cloud assistant

### Capabilities

- Interpret more varied natural-language questions.
- Explain changes in spending and compare categories or periods.
- Suggest practical budget adjustments grounded in actual reports and saved goals.
- Suggest transaction categories for user review.
- Provide conversational follow-up questions within a limited, relevant context.

### Request flow

1. App detects a reachable backend and confirms cloud assistance is enabled.
2. Save local edits and attempt synchronization.
3. Backend checks the synchronization checkpoint before using cloud transaction data.
4. Cloud AI selects an allowed reporting action with structured arguments.
5. Backend validates dates, wallet ownership, categories, and operation scope.
6. Reporting code calculates the result from the appropriate data snapshot.
7. AI explains the verified result. The UI displays authoritative totals and report links from the structured result.
8. Display the applied dates, wallets, categories, and data freshness.

### Pending-sync behavior

- Never imply that a cloud report includes unsynced transactions.
- If synchronization cannot finish promptly, answer supported questions locally using current local data.
- For cloud-only questions, explain that recent changes are pending and offer a local report or retry.
- A later optional path can send a minimal locally calculated report to cloud AI for explanation, under the same cloud-data consent setting.

### Boundaries and privacy

- Keep provider credentials on the backend.
- Send only information needed for the request; prefer aggregated reports over complete transaction histories.
- Explain that synchronization stores data in the app backend and cloud AI processing may send selected data to a separate provider.
- Provide separate controls for cloud sync and cloud assistance. If cloud assistance is disabled, use the offline assistant even while connected.
- Do not send financial data to cloud AI merely because connectivity returns.
- Avoid raw financial details in analytics and diagnostic logs.
- Treat transaction descriptions and notes as data, not instructions to the assistant.
- Start with read-only assistant actions. Editing or deleting financial records through chat is outside the initial scope.

## 6. Hybrid routing and user experience

| State | Behavior |
| --- | --- |
| Offline | Local transactions, reports, and rule-based assistant remain available. |
| Backend reachable and data synchronized | Use cloud AI for assistant questions when enabled. |
| Online with pending local changes | Synchronize first; use the local assistant if current cloud data cannot be confirmed. |
| Wi-Fi connected but backend unreachable | Treat cloud assistance as unavailable and use local assistance. |
| AI timeout, quota exhaustion, or provider failure | Fall back locally for supported questions; explain limitations for unsupported questions. |
| Cloud assistance disabled | Use local assistance regardless of connection. |

- Keep one assistant interface, with a small “Offline assistant” or “Cloud assistant” status.
- Show sync status separately: Synced, Pending changes, Syncing, or Needs attention.
- Preserve the question and filters when falling back.
- Use a bounded timeout and retry policy; do not leave users waiting indefinitely.
- Never automatically replay a failed AI request later without the user's awareness.
- Every financial answer includes the relevant period and filters plus “View transactions.”
- Suggested question chips make the offline assistant easy to discover.

## 7. Proposed architecture

```text
Expo React Native app
  ├─ Transaction, wallet, budget, and report screens
  ├─ Local SQLite database
  ├─ Reporting functions and template insights
  ├─ Rule-based assistant
  ├─ Assistant router and cloud API client
  └─ Synchronization queue
             ↕ authenticated API
Backend
  ├─ Authentication and per-user authorization
  ├─ Sync endpoints and conflict handling
  ├─ Cloud transaction database
  ├─ Validated report endpoints
  └─ Cloud AI orchestration → chosen AI provider
```

Suggested module boundaries: `database`, `transactions`, `wallets`, `budgets`, `reports`, `assistant/local`, `assistant/cloud`, `assistant/router`, and `sync`. Adapt these to the existing repository rather than imposing a rewrite.

Shared TypeScript types and pure reporting utilities are useful where the backend runtime allows them. Otherwise, enforce identical behavior through shared report fixtures and API contracts.

## 8. Data and synchronization design

### Core records

- Wallet: ID, owner, name, currency, and opening balance.
- Transaction: ID, owner, wallet, type, amount, currency, category, occurrence timestamp, optional merchant/notes, and optional transfer link.
- Category: ID, owner or system scope, name, and transaction type.
- Budget: ID, owner, amount, currency, period, and optional wallet/category scope.
- Sync metadata: record revision, server cursor, deletion marker, and queued operation ID.
- Preferences: timezone, week start, cloud sync consent, and cloud assistance consent.

### Sync behavior

- Write locally first and enqueue create/update/delete operations.
- Use stable IDs and idempotent operations so retries cannot duplicate transactions.
- Upload pending changes, pull server changes, then save the new checkpoint.
- Retain deletion markers until all relevant changes can be reconciled; prevent deleted records from reappearing.
- Detect stale revisions. Never silently overwrite conflicting financial edits; present the conflict for resolution.
- Represent wallet transfers as linked operations that synchronize consistently.
- Retry transient failures with backoff and resume after reconnect or app launch.
- Use foreground sync as the baseline. Background sync is best-effort because mobile operating systems restrict execution.
- Keep local data isolated by account, and define logout behavior for unsynced changes.
- Provide an account recovery and backup strategy before presenting cloud sync as a backup feature.

## 9. Keeping the app small

- Do not include local language-model runtimes, model weights, or a model download mechanism.
- Implement the offline assistant using ordinary TypeScript and compact dictionaries/templates.
- Use hosted inference through a lightweight API client.
- Reuse existing dependencies where practical and measure release builds before adding libraries.
- Keep charting and export dependencies proportionate to their value; schedule PDF export after the core experience.
- Measure installed size, download size, startup time, and memory on representative Android/iOS devices.
- A specific size target requires inspecting the current app and establishing a baseline. Transaction history still grows with use even without a model.

Cloud AI introduces recurring inference, database, and hosting costs. Apply request limits, output limits, short conversation contexts, and per-user quotas. The offline assistant remains usable when cloud limits are reached.

## 10. Phased implementation

### Phase 1 — Review the existing Expo app

- Inspect its Expo SDK, navigation, database, authentication, supported platforms, and current transaction model.
- Identify reusable screens and existing sync behavior.
- Record release size and performance baselines.
- Confirm currency, timezone, refund, budget-period, and week-start policies.
- Choose backend and provider after reviewing compatibility, data handling, and cost.

Completion: a confirmed architecture and migration plan that preserves existing financial data.

### Phase 2 — Accurate offline reporting

- Implement or extend local storage for wallets, transactions, categories, and budgets.
- Build reusable report queries and calculation functions.
- Add daily/weekly summaries, custom dates, wallet/category/type filters, and full transaction history.
- Ensure summary cards and transaction lists share identical filters.

Completion: all core reporting works in airplane mode with verified totals.

### Phase 3 — Programmed offline assistant

- Add intent recognition, date parsing, wallet/category matching, clarification, and response templates.
- Add supported question suggestions and report links.
- Add budget alerts, period comparisons, and editable category suggestions.

Completion: supported questions return the same results as manual reports without network requests.

### Phase 4 — Accounts and cloud sync

- Add authenticated backend storage and per-user access checks.
- Implement operation queue, revisions, incremental pull, deletion handling, and conflict resolution.
- Add visible synchronization state and cloud-data settings.

Completion: transactions survive disconnect/reconnect and synchronize without duplication or silent data loss.

### Phase 5 — Cloud AI and hybrid routing

- Integrate one provider behind the backend.
- Add validated, read-only reporting tools and structured response contracts.
- Add synchronization freshness checks, request limits, and offline fallback.
- Verify that provider keys and unrelated financial data never enter the client request path.

Completion: online assistance uses current verified reports, while service failures preserve useful local behavior.

### Phase 6 — Polish and later enhancements

- CSV and PDF exports that match active filters.
- More date expressions and optional Filipino/Taglish support.
- Goal tracking and recurring expense insights if supported by the underlying data model.
- Accessibility, release-size checks, performance tuning, and user feedback.
- Review cloud usage costs and improve question coverage based on consented, privacy-conscious feedback.

## 11. Validation and acceptance criteria

- A fresh installation requires no AI model download.
- With locally available data, offline reporting and supported assistant questions work in airplane mode.
- Selecting August 4–18 includes both dates and excludes transactions outside the range.
- Wallet and category filters produce consistent totals in reports, assistant answers, transaction lists, and exports.
- Transfers do not inflate income or spending; currencies are not silently combined.
- Ambiguous questions trigger clarification; unsupported questions never produce fabricated totals.
- Sync retries do not duplicate records, and deletions/conflicts behave predictably across two devices.
- Cloud answers cannot access another user's wallets or transactions.
- Cloud reports never silently omit known pending local changes.
- AI outages, unavailable internet, and exhausted quotas trigger the documented fallback.
- Cloud assistance sends no requests when disabled.
- Provider secrets stay on the backend and sensitive data is omitted from routine logs.
- Test reporting boundaries, parser examples, sync failure recovery, and the complete offline/online user flow on representative devices.

## 12. Initial scope and decisions still to confirm

Initial release: flexible offline reports, a rule-based assistant, local-first transaction entry, authenticated cloud sync, and online read-only AI assistance.

Later: exports, expanded language coverage, richer budgeting insights, and any chat-based financial edits.

Before implementation, confirm:

- Android, iOS, or both.
- Existing Expo SDK and persistence/authentication setup.
- Backend and AI provider, monthly operating budget, and data retention settings.
- Single-currency launch or separate reporting for multiple currencies.
- Whether offline use is available before account creation.
- Preferred week start, timezone policy, and supported language.

These are implementation decisions, not blockers to understanding the product. No backend or AI provider has been selected or configured by this plan.
