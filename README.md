# Pagefold Books

The front of a small online bookshop, split into five small apps that share a server and a theme. There is no build step: every app is plain files, and the framework files are vendored at pinned versions in `vendor/`.

| App | Path | Stack |
|---|---|---|
| Storefront | `/apps/storefront/` | React 18.2 (UMD, htm) |
| Account and orders | `/apps/account/` | Vue 3.4 |
| Checkout | `/apps/checkout/` | plain JavaScript |
| In-store events | `/apps/events/` | Preact 10 with htm |
| Reading list | `/apps/reader/` | Alpine.js 3.13 |

```bash
npm install
npm start          # http://localhost:3000   (PORT=... to change)
npm test           # Playwright, starts the server itself
```

`server/` holds the API (in memory), `shared/` the theme, `lib/` helpers used by more than one page, `static/` first-party scripts, `vendor/` the pinned framework files.
