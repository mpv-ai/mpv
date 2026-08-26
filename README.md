# MPV

Vol. 1, No. 10 — Wednesday, August 26, 2026. Night Edition. New York.

**Live:** [https://mpv-ai.github.io/mpv/](https://mpv-ai.github.io/mpv/)

A cream-paper iPhone edition. Static HTML. No backend.

## Add to Home Screen (iPhone)

1. Open [https://mpv-ai.github.io/mpv/](https://mpv-ai.github.io/mpv/) in **Safari**.
2. Tap the **Share** button.
3. Tap **Add to Home Screen**.
4. Tap **Add**. MPV opens as a standalone paper, full bleed, with a black status bar.

Chrome on iPhone cannot add a Home Screen web app the same way. Use Safari.

After the first load, the edition is available offline via a service worker. The installed app refetches `edition.json` every hour and when it is reopened (visibility / pageshow). The service worker treats `edition.json` as network-first so a new issue is not stuck behind the cache.

## Files

`index.html`, `styles.css`, `app.js`, `edition.json`, `sw.js`, `manifest.webmanifest`, and the nameplate icons. Served from the repository root on GitHub Pages (`main` / `/`).
