# Todo Frontend (Next.js + Tailwind, TypeScript)

Frontend-only implementation for the Full-Stack Todo List App. This consumes a separate Express API with Prisma/MySQL via REST.

## Tech
- Next.js (App Router) + React 18
- Tailwind CSS
- TypeScript
- SWR for data fetching + revalidation

## Getting Started

1. **Clone & Install**

```bash
npm install
# or: pnpm i / yarn
```

2. **Configure API base URL**

Create `.env.local` and set your Express server URL (defaults to `http://localhost:3001`):

```
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

3. **Run the dev server**

```bash
npm run dev
# open http://localhost:3000
```

## API Contract

The UI expects an Express API exposing:

- `GET /tasks` → `Task[]`
- `GET /tasks/:id` → `Task`
- `POST /tasks` with `{ title: string; color: 'red'|'blue'|'green'|'yellow'|'purple' }` → `Task`
- `PUT /tasks/:id` with any subset of `{ title?: string; color?: TaskColor; completed?: boolean }` → `Task`
- `DELETE /tasks/:id` → `{ success: true }`

**Task shape**

```ts
type Task = {
  id: number;
  title: string;
  color: 'red'|'blue'|'green'|'yellow'|'purple';
  completed: boolean;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
```


## Folder Structure

```
app/
  page.tsx                 # Home View (list + summary)
  layout.tsx
  tasks/
    new/page.tsx           # Create Task
    [id]/page.tsx          # Edit Task
components/
  TaskCard.tsx
  TaskForm.tsx
  ColorDot.tsx
lib/
  api.ts                   # REST client
types/
  task.ts
```

## Production

```bash
npm run build
npm start
```

Ensure the API is reachable from the browser (CORS enabled on the Express server).
