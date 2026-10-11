# MPV paper portfolio

A simulated long-term portfolio run by the trading agents in `.claude/agents/`. It starts with $100,000 of pretend cash. **No real orders are placed.** The Robinhood connector is used only for quotes and research, and its order tools are blocked in `.claude/settings.json`.

- `policy.json`: starting cash, target mix and risk limits
- `ledger.json`: every paper trade, with price source and thesis
- `history.json`: mark-to-market snapshots, with SPY for comparison
- `paper.js`: the bookkeeping engine (`positions`, `trade`, `value`)

Run a review with the `/portfolio` skill in Claude Code.

Not investment advice.
