# Contributing to RISE

## Branches

Each team member works on their own branch and opens a pull request into `main`.

| Branch | Owner |
| :--- | :--- |
| `rise_shivansh` | Shivansh |
| `rise_pari` | Pari |
| `rise_aditya` | Aditya |

Only Shivansh merges pull requests. Nobody pushes to `main` directly.

## Daily routine

```bash
git checkout rise_yourname
git pull origin main
# work, then commit small pieces
git add src/components/home
git commit -m "refactor(home): add hero component" -m "Hero markup moved out of Home.jsx."
git push origin rise_yourname
```

Add files by folder or name. Avoid `git add .`, which also picks up `dist/`, `.env` and stray files.

## Commit messages

```
type(scope): what changed

Why it changed, in one to three lines (optional).
```

- **Title:** imperative ("add", not "added"), lower case, at most 60 characters, no full stop.
- **Scope:** the page or area, e.g. `home`, `login`, `welcome`, `dashboard`, `layout`, `ui`, `hooks`.
- **One logical change per commit.** Never "made changes", "update" or "fixed stuff".

| Type | Use for |
| :--- | :--- |
| `feat` | a new feature or component |
| `fix` | a bug fix |
| `refactor` | same behaviour, cleaner code |
| `style` | CSS only |
| `docs` | README and other docs |
| `chore` | setup, config, file moves |

Examples from this repo:

```
feat(auth): share login state with AuthContext
style(login): style input fields and error messages
refactor(routing): move routes into an App component
```

## Pull requests

- **Title:** same format as the main commit, e.g. `feat(layout): add shared layout and protected routes`.
- **Description:** what changed (two or three bullets), how to test (which pages to open), and a screenshot for UI changes.
- Before opening: `npm run build` must pass.

## Code style

- One component per file. A page file only arranges components.
- Lists use `.map()` with a `key`.
- Shared helpers live in `src/utils/`, shared state logic in `src/hooks/`, reusable pieces in `src/components/ui/`.
- Keep code simple enough to explain line by line: plain `if`, `.map()`, `.filter()`, no regex, no new libraries without team agreement.
- Colours come from the CSS variables in `src/styles/global.css`.
