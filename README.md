# Meals & Drinks Explorer

A learning project built to practice **TypeScript**, **TanStack Router**, **TanStack Query**, **ShadCn UI**, and **Tailwind CSS** by building a real-world style application that consumes two public APIs.

---

## Project Goals

This project is not about building a perfect app — it's about practicing and understanding:

- Type-safe routing with **TanStack Router** (file-based routing, loaders, route params)
- Data fetching and caching with **TanStack Query** (useQuery, loading/error states, caching)
- Building UI exclusively with **ShadCn** components
- Writing clean, strict **TypeScript** throughout (no `any`)
- Styling with **Tailwind CSS**

---

## APIs Used

| API                                               | Base URL                                  | What it provides          |
| ------------------------------------------------- | ----------------------------------------- | ------------------------- |
| [TheMealDB](https://www.themealdb.com/api.php)    | `https://www.themealdb.com/api/json/v1/1` | Meals, categories, search |
| [boozeapi](https://www.thecocktaildb.com/api.php) | `https://boozeapi.com/api/v1/cocktails`   | Cocktails/drinks, search  |

Both APIs are free and require no authentication.

---

## 📄 Pages

| Route              | Description                         |
| ------------------ | ----------------------------------- |
| `/meals`           | Browse all meals with a search bar  |
| `/meals/$mealId`   | Single meal detail page             |
| `/drinks`          | Browse all drinks with a search bar |
| `/drinks/$drinkId` | Single drink detail page            |
| `/subscribe`       | Subscribe to a test backend         |

---

## Tech Stack

| Technology                                     | Purpose                       |
| ---------------------------------------------- | ----------------------------- |
| [React](https://react.dev/)                    | UI framework                  |
| [TypeScript](https://www.typescriptlang.org/)  | Type safety throughout        |
| [TanStack Router](https://tanstack.com/router) | File-based, type-safe routing |
| [TanStack Query](https://tanstack.com/query)   | Data fetching & caching       |
| [ShadCn UI](https://ui.shadcn.com/)            | Component library             |
| [Tailwind CSS](https://tailwindcss.com/)       | Utility-first styling         |
| [Vite](https://vitejs.dev/)                    | Build tool & dev server       |

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
# Clone the repo
git clone git@github.com:arwegasira/learning-TanstackRouter.git
cd your-repo-name

# Install dependencies
npm install

# Start the dev server
npm run dev
```

App will be running at `http://localhost:5173`

---

## Project Structure

```

```

---

## Learning Log

A running log of concepts practiced and things learned during this project.

| #   | Concept                            | Notes                                       |
| --- | ---------------------------------- | ------------------------------------------- |
| 1   | TanStack Router file-based routing | `createFileRoute()`, route params           |
| 2   | TanStack Query `useQuery`          | Fetching, loading & error states            |
| 3   | ShadCn component integration       | `<Card>`, `<Input>`, `<Skeleton>` etc.      |
| 4   | TypeScript API response typing     | Typing raw API responses, using `z.infer<>` |

> This table grows with every PR merged into the project.

---

## Git Workflow

This project follows a team-style Git workflow for practice:

- `main` — protected, production-ready
- `develop` — integration branch
- `feature/xxx` — all work happens here, merged via PR

No direct pushes to `main` or `develop`. All changes go through pull requests.

---

## License

MIT
