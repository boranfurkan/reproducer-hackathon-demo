# Pagefold Books

A small online bookshop (React + Express). Used as the target app for ReProducer demos.

## Run

```bash
npm install
npm run build
npm start        # http://localhost:3000  (set PORT to change it)
```

For development with hot reload run `npm start` in one terminal and `npm run dev` in another.

## Test

```bash
npx playwright install chromium webkit   # once
npm test
```

Tests live in `tests/` and use Playwright. `npm test` builds and starts the server itself.

## Layout

- `server/` – Express API (`/api/categories`, `/api/books`) and static hosting of `dist/`
- `src/` – React client (hash routing)
- `tests/` – Playwright tests
