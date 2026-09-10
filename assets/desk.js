/** Shared demo desk helpers for plan-stack variants. */

export function fmtWait(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60_000) return `${Math.round(ms / 1000)}s`;
  return `${(ms / 60_000).toFixed(1)}m`;
}

export function cellHeight(ms, { min = 36, max = 180, scale = 0.00032 } = {}) {
  return Math.round(Math.min(max, Math.max(min, min + ms * scale)));
}

export function renderStack(container, phases, { animateNew = false, known = new Set() } = {}) {
  container.innerHTML = "";
  for (const ph of phases) {
    const el = document.createElement("article");
    const isNew = animateNew && known.size > 0 && !known.has(ph.id);
    el.className = "phase" + (isNew ? " is-insert" : "");
    el.dataset.status = ph.status;
    el.style.minHeight = `${cellHeight(ph.estimatedWaitMs)}px`;
    el.innerHTML = `
      ${ph.status === "recalculating" ? '<span class="spinner" aria-hidden="true"></span>' : ""}
      <div class="title"></div>
      <div class="meta"></div>
    `;
    el.querySelector(".title").textContent = ph.title;
    el.querySelector(".meta").textContent = `${ph.status} · ETA ${fmtWait(ph.estimatedWaitMs)}`;
    container.appendChild(el);
  }
}

export const sessionDemoPhases = [
  { id: "a", title: "Draft speculative plan", status: "done", estimatedWaitMs: 25000 },
  { id: "b", title: "Push branch", status: "done", estimatedWaitMs: 12000 },
  { id: "c", title: "Wait CI (GitHub Actions)", status: "waiting", estimatedWaitMs: 420000 },
  { id: "d", title: "Changelog + docs (queued)", status: "pending", estimatedWaitMs: 90000 },
  { id: "e", title: "Notify coordinator", status: "pending", estimatedWaitMs: 20000 },
];

export const multiSession = [
  {
    title: "Coordinator",
    phases: [
      { id: "c1", title: "Spawn workers", status: "done", estimatedWaitMs: 15000 },
      { id: "c2", title: "Wait CI fan-in", status: "waiting", estimatedWaitMs: 360000 },
      { id: "c3", title: "Merge wave", status: "pending", estimatedWaitMs: 60000 },
    ],
  },
  {
    title: "Worker: panel",
    phases: [
      { id: "w1", title: "Implement dock", status: "active", estimatedWaitMs: 140000 },
      { id: "w2", title: "Wire poll", status: "pending", estimatedWaitMs: 50000 },
    ],
  },
  {
    title: "Worker: docs",
    phases: [
      { id: "d1", title: "ADR draft", status: "done", estimatedWaitMs: 40000 },
      { id: "d2", title: "Pages deploy", status: "waiting", estimatedWaitMs: 240000 },
    ],
  },
];
