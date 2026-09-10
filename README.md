# plan-stack (HCI-Nerdz demo)

Interactive explainer for **speculative agentic wait queues** — ETA-sized phase stacks, multi-session columns, and live recalc/insert when estimates break.

Product implementation: [dev-centr/plan-stack](https://github.com/dev-centr/plan-stack). Sibling desk: [actor-model agentic UI](https://hci-nerdz.github.io/demos/actor-model-agentic-ui/).

## Variants

| Path | Idea |
| --- | --- |
| [`/session/`](session/) | One session column; wait-sized cells; register then go silent |
| [`/columns/`](columns/) | Harness window with h-scroll session columns |
| [`/recalc/`](recalc/) | Expectation break → circle wait → animated insert |

Hub is selector-only (no interactive desk).

## Local

Open `index.html` via any static server (GitHub Pages uses `./` base for project site).

```powershell
cd $env:code\github.com\HCI-Nerdz\plan-stack
npx --yes serve .
```

## Pages

Deployed to `https://hci-nerdz.github.io/plan-stack/` via GitHub Actions.
