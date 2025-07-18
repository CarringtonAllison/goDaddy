# GoDaddy Repo Explorer

A React + TypeScript web app to browse GoDaddy's public GitHub repositories, view details, and explore languages used.

https://godaddyrepos.pages.dev/

## Features

- **Repository List:** Displays all GoDaddy public repos with key stats.
- **Repo Details:** Click a repo to view its description, issues, watchers, forks, and languages.
- **Responsive Design:** Works well on desktop and mobile.
- **Caching:** Uses localStorage to cache repo data and minimize API calls.
- **Error Handling:** Shows clear messages for API errors and rate limits.
- **Navigation:** Seamless navigation between repo list and details.
- **Accessibility:** Keyboard and screen reader friendly.
- **Testing:** Playwright tests for UI, navigation, error handling, and loading states.

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- React Router
- Playwright (for testing)

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

- Clone the github repo locally and run install.

```bash
npm install
```

### Running the App

```bash
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173) in your browser.

### Running Tests

```bash
npx playwright test
```

## Project Structure

```
src/
  components/
    Navbar.tsx
    RepoList.tsx
    RepoCard.tsx
  RepoDetails.tsx
  App.tsx
tests/
  example.spec.ts
```

## Future Implementations

- Add more tests for error handling and loading states.
- Add filters such as owners, branches, created dates, etc.
- Possibly use Modals to dislay Repo Details.
