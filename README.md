# MazdaTrim

Compare Mazda models by year, browse trims in a modal, and review shared safety vs trim-specific equipment. Built with [Next.js](https://nextjs.org) 16 and React 19.

## Requirements

- **Node.js** 20.x or newer (22 LTS recommended)
- **npm** 10+ (or pnpm / yarn)

## Setup

```bash
git clone <your-repo-url> mazdatrim
cd mazdatrim
npm install
```

Optional: copy `.env.example` to `.env.local` if you add environment variables later.

## Scripts

| Command        | Description                    |
| -------------- | ------------------------------ |
| `npm run dev`  | Dev server at http://localhost:3000 |
| `npm run build`| Production build (`.next`)     |
| `npm run start`| Serve production build         |
| `npm run lint` | ESLint (core-web-vitals)       |

## Production build

```bash
npm run build
npm run start
```

Deploy the output on [Vercel](https://vercel.com), [Netlify](https://netlify.com), or any Node host that supports Next.js. See the [Next.js deployment docs](https://nextjs.org/docs/app/building-your-application/deploying).

## GitHub

1. Create a new repository on GitHub (empty, no README if you are pushing this project as the first commit).
2. From this folder:

```bash
git init
git add .
git commit -m "Initial commit: MazdaTrim Next.js app"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

If the repo already exists with history, use `git remote add` / `git push` as appropriate.

## Data and images

- Trim and MSRP content are **illustrative**; confirm against [Mazda USA](https://www.mazdausa.com).
- Vehicle images load from Mazda USA’s CDN (`www.mazdausa.com`); see `next.config.ts` `images.remotePatterns`. Hosting copies locally is an option if their URLs change.

## License

Private / your choice — this project is not affiliated with Mazda Motor Corporation.
