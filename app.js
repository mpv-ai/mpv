(function () {
  "use strict";

  const app = document.getElementById("app");
  let edition = null;
  let section = "All";

  const esc = (s) =>
    String(s)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");

  function storyById(id) {
    return edition.stories.find((s) => s.id === id);
  }

  function filtered() {
    if (section === "All") return edition.stories;
    return edition.stories.filter((s) => s.section === section);
  }

  function masthead() {
    return `
      <header class="masthead">
        <div class="ears">
          <span>Vol. ${edition.volume}, No. ${edition.number}</span>
          <span>${esc(edition.city)}</span>
        </div>
        <h1 class="wordmark">MPV</h1>
        <div class="double-rule"></div>
        <div class="dateline">${esc(edition.date)} <span class="dot">·</span> ${esc(edition.editionLabel)}</div>
        <div class="install" id="installHint">
          On iPhone: Share → <b>Add to Home Screen</b>
          <button class="x" type="button" aria-label="Dismiss">×</button>
        </div>
      </header>`;
  }

  function tape() {
    const t = edition.tape;
    const inner = `<span class="tape-src">${esc(t.source)} · updated ${esc(t.updated)}</span>${esc(t.line)}&nbsp;&nbsp;·&nbsp;&nbsp;`;
    return `
      <div class="tape" aria-label="Markets tape">
        <div class="tape-track">${inner}${inner}${inner}</div>
      </div>`;
  }

  function sections() {
    return `
      <nav class="sections" aria-label="Sections">
        ${edition.sections
          .map(
            (s) =>
              `<button type="button" data-section="${esc(s)}" class="${
                s === section ? "active" : ""
              }">${esc(s)}</button>`
          )
          .join("")}
      </nav>`;
  }

  function kicker(s) {
    return `<div class="kicker">${esc(s)}</div>`;
  }

  function byline(story) {
    return `<div class="byline">${esc(story.source)} <span class="sep">·</span> ${esc(story.date)}</div>`;
  }

  function leadCard(story) {
    return `
      <button class="lead" type="button" data-open="${esc(story.id)}">
        ${kicker(story.kicker)}
        <h2 class="lead-hed">${esc(story.hed)}</h2>
        <p class="dek">${esc(story.dek)}</p>
        ${byline(story)}
      </button>`;
  }

  function row(story) {
    return `
      <button class="row" type="button" data-open="${esc(story.id)}">
        ${kicker(story.kicker)}
        <h2 class="row-hed">${esc(story.hed)}</h2>
        <p class="dek">${esc(story.dek)}</p>
        ${byline(story)}
      </button>`;
  }

  function desk() {
    const d = edition.deskNote;
    return `
      <aside class="desk">
        ${kicker(d.kicker)}
        <h2 class="desk-hed">${esc(d.hed)}</h2>
        <p>${esc(d.body)}</p>
        <div class="desk-sign">${esc(d.signed)}</div>
      </aside>`;
  }

  function coming() {
    const c = edition.comingUp;
    return `
      <div class="coming">
        <a href="${esc(c.href)}" rel="noopener noreferrer">
          ${kicker(c.label)}
          <p>${esc(c.line)}</p>
        </a>
      </div>`;
  }

  function colophon() {
    return `<footer class="colophon">MPV · ${esc(edition.city)} · ${esc(edition.editionLabel)}</footer>`;
  }

  function front() {
    const stories = filtered();
    const lead = stories.find((s) => s.lead);
    const rest = stories.filter((s) => !s.lead);
    const showDesk = section === "All" || section === "Markets";

    return `
      <div class="sheet">
        ${masthead()}
        ${tape()}
        ${sections()}
        ${lead ? leadCard(lead) : ""}
        ${showDesk ? desk() : ""}
        ${rest.map(row).join("")}
        ${coming()}
        ${colophon()}
      </div>`;
  }

  function article(story) {
    const also = (story.also || [])
      .map(
        (a) =>
          `<div class="also"><a href="${esc(a.url)}" rel="noopener noreferrer">${esc(a.label)}</a></div>`
      )
      .join("");
    return `
      <div class="sheet article">
        <button class="back" type="button" data-back>Front</button>
        ${kicker(story.kicker)}
        <h1 class="article-hed">${esc(story.hed)}</h1>
        <p class="dek">${esc(story.dek)}</p>
        <div class="article-dateline">${esc(edition.city)} · ${esc(story.date)} · ${esc(story.source)}</div>
        ${story.grafs.map((g) => `<p class="graf">${esc(g)}</p>`).join("")}
        <a class="continue" href="${esc(story.url)}" rel="noopener noreferrer">Continue at the source</a>
        ${also}
        <div class="stamp-block">
          <span class="stamp">${esc(story.owner)}</span>
          <p class="stamp-action">${esc(story.action)}</p>
        </div>
      </div>`;
  }

  function route() {
    if (!edition) return;
    const hash = (location.hash || "").replace(/^#/, "");
    const m = hash.match(/^\/story\/([a-z0-9-]+)/i);
    if (m) {
      const s = storyById(m[1]);
      if (s) {
        app.innerHTML = article(s);
        window.scrollTo(0, 0);
        bind();
        hint();
        return;
      }
    }
    app.innerHTML = front();
    bind();
    hint();
  }

  function bind() {
    app.querySelectorAll("[data-section]").forEach((btn) => {
      btn.addEventListener("click", () => {
        section = btn.getAttribute("data-section");
        route();
      });
    });
    app.querySelectorAll("[data-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        location.hash = "/story/" + btn.getAttribute("data-open");
      });
    });
    const back = app.querySelector("[data-back]");
    if (back) {
      back.addEventListener("click", () => {
        location.hash = "";
      });
    }
    const x = app.querySelector("#installHint .x");
    if (x) {
      x.addEventListener("click", (e) => {
        e.stopPropagation();
        localStorage.setItem("mpv-install-dismissed", "1");
        app.querySelector("#installHint").classList.remove("show");
      });
    }
  }

  function isIos() {
    return /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  }

  function isStandalone() {
    return (
      window.navigator.standalone === true ||
      window.matchMedia("(display-mode: standalone)").matches
    );
  }

  function hint() {
    const el = document.getElementById("installHint");
    if (!el) return;
    if (
      isIos() &&
      !isStandalone() &&
      localStorage.getItem("mpv-install-dismissed") !== "1"
    ) {
      el.classList.add("show");
    }
  }

  function registerSw() {
    if (!("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }

  app.innerHTML = `<div class="sheet"><p class="loading">Setting type…</p></div>`;

  fetch("./edition.json")
    .then((r) => {
      if (!r.ok) throw new Error("edition");
      return r.json();
    })
    .then((data) => {
      edition = data;
      route();
      registerSw();
    })
    .catch(() => {
      app.innerHTML = `<div class="sheet"><p class="error">The edition could not be set.</p></div>`;
    });

  window.addEventListener("hashchange", route);
})();
