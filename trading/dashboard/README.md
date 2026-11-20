# ATLAS Insight dashboard

`index.html` is the dashboard. `build.js` builds `snapshot.json`, which is git-ignored, from the verified records. Every figure comes from one calculation layer, `trading/perf.js`.

```
node trading/dashboard/build.js                    # snapshot.json, then serve this folder over http
node trading/dashboard/build.js --html out.html    # standalone file with the snapshot inlined
```

- **Mode:** snapshot. It updates only when rebuilt (by `/cio` or `atlas-insight`). The Refresh button appears only when the page is served next to `snapshot.json`.
- **Import:** the Import control loads any `atlas-insight/1` snapshot JSON.
- **Inputs:**
  - `trading/live/navs.json` (live account values, git-ignored)
  - `trading/live/ledger.json`
  - `trading/{policy,ledger,history,prices}.json`
- **Checks:** the build exits non-zero if any reconciliation check fails. The checks are: NAV = cash + positions; NAV movement = realized + change in unrealized; the paper mark ties to history; gap arithmetic; and the compounding case.
- **Views:** Overview, Daily goal, Trades (sortable, searchable, CSV), Portfolio, Forecasts and execution, Data and methodology. There is also a print report.
- **Style:** cream #FBFBF9, charcoal #222222, blue #0F4C81; Georgia titles, Arial data; negatives in parentheses.
- **Privacy:** the standalone file contains real account values. Keep it private, and do not commit it or publish it publicly.
