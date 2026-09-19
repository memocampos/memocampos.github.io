# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

**Scrolling Score** is a static, client-side-only web app (no build step, no framework, no package.json) that displays a live-scrolling ticker of NFL scores, standings, and win-probabilities. It's served directly from `index.html` — deployed as a static GitHub Pages site.

## Running / testing locally

There is no build or test tooling. To work on this app:
- Open `index.html` directly in a browser, or serve the directory with any static file server (e.g. `python3 -m http.server`) since some browsers restrict `file://` fetches.
- There are no linters, formatters, or automated tests configured. Verify changes manually in the browser.

## Architecture

Everything lives in three files plus a big `images/` tree:

- `index.html` — the entire UI: a collapsible "Settings" panel (form inputs for theme, colors, speed, refresh rate, IFTTT webhooks per team) and the `#path > #scores` ticker container that JS populates. `body onload="set_values()"` kicks off state restoration; an inline `<script>` at the bottom of the body starts the data fetches (`Probabilities()`, `Standings()`, `Scores()`).
- `static/scripts.js` — all application logic (single global-function file, no modules/classes):
  - **Persistence**: all user settings (API key, theme, background color, scrolling speed, refresh rate, per-team IFTTT webhook URLs, checkboxes) are read/written directly to `localStorage` by key name. `sessionStorage` is used for same-day cached API data (standings, probabilities) and for per-game score snapshots used to detect touchdowns.
  - **Data source**: all live data (`scores`, `standings`, `probabilities`) comes from one external Lambda endpoint: `https://vyidloxhgnzajfy5slqzmswtau0olabe.lambda-url.us-west-1.on.aws/?action=<scores|standings|probabilities>`. There is no local API/backend code in this repo.
  - **Game-day gating**: `IsGameDay()` / `isThanksgiving()` use the current day/hour to decide whether to show live `Scores()` (game day) or `Standings()` (otherwise) in the ticker. This is time-window logic, not a feature flag — check it before assuming scores should always render.
  - **HTML generation**: ticker content is built via string-concatenation functions (`generateHTML`, `generateHTMLwData`, `generateHTMLStandings`, `displayTouchdown`) that are `insertAdjacentHTML`'d into `#myH2`. There's no templating library — new markup follows this same string-building pattern.
  - **Touchdown detection**: `validateGame()` compares each poll's score against the last snapshot stored in `sessionStorage`; a jump of ≥6 points (`isTouchdown()`) triggers a visual touchdown animation and, if configured, fires a GET request to the team's IFTTT webhook URL (`clickimage()`), then auto-fires the "off" webhook after 25s.
  - **Theming**: `createSRC(team)` builds image paths as `images/<theme>/<TEAM_ABBR>.png`, where `<theme>` is one of the folder names under `images/` (`logo`, `logo-with-background`, `logo_name`, `helmet`, `names`, `disney`, `trump`, `corndoggy`, etc.) selected via the Settings radio buttons. Adding a new theme means adding a same-named folder under `images/` with one PNG per team abbreviation, plus a radio option in `index.html`.
  - Auto-refresh: the page force-reloads itself (`window.location.reload`) on a timer set by the user's `RefreshRate` setting.
  - Note the `getlocal`/`checked`/`selected` helper functions and the pattern of pairing each localStorage key with a same-named HTML element `id`/`name` — any new setting should follow that same read/write pairing in both `set_values()` and `SettingsForm()`.
- `static/collapsible.js` — generic toggle behavior for `.collapsible` elements (used only by the Settings panel button).
- `static/memo.css` — all styling, including CSS custom properties (`--1` through `--8`) that map to scrolling-speed durations, swapped in via `myFunction_set()`.
- `images/` — one subfolder per visual theme, each containing team-abbreviation-named PNGs (e.g. `images/helmet/PIT.png`); also `images/backgrounds/*.webp` for standings cards and `images/logo/*.png` used for webhook icons in the settings form.

## Conventions to follow

- Team abbreviations (`ARI`, `ATL`, `BUF`, etc.) are the consistent key across image filenames, `localStorage`/`sessionStorage` keys (`webhook_<ABBR>`, `<matchid>-home-score-<ABBR>`, etc.), and API responses — keep new code consistent with this scheme rather than introducing a different identifier.
- This is plain ES5-style vanilla JS with global functions and `var`; match that style rather than introducing modules, `let`/`const`-only patterns, or bundler-dependent syntax, since there is no build step to compile it.
