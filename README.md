# Ego Cocktails

A Next.js app which consumes cocktail recipe data, built with a clean architecture approach.

---

## Architecture

```
app/
├── classes/
│   ├── clients/
│   │   └── HttpClient.ts
│   ├── cocktail/
│   │   ├── CocktailClient.ts
│   │   ├── CocktailDTO.ts
│   │   ├── CocktailFetchError.ts
│   │   ├── CocktailRepository.ts
│   │   ├── CocktailSearchError.ts
│   │   ├── CocktailService.ts
│   │   ├── ICocktail.ts
│   │   ├── ICocktailClient.ts
│   │   ├── ICocktailIngredient.ts
│   │   ├── ICocktailRepository.ts
│   │   └── InvalidCocktailError.ts
│   └── errors/
│       └── HttpError.ts
└── contracts/
    └── IHttpClient.ts
```

### The Chain

The app follows a strict `Service → Repository → Client` chain. Each layer has one responsibility, is intentionally kept dumb, and only talks to the layer directly below it through a contract. The KISS ("Keep It Simple, Stupid") principle is applied per layer — every class knows exactly what it needs to, and nothing more.

Each layer answers a different question:

| Layer          | Question                                           |
| -------------- | -------------------------------------------------- |
| Business Logic | _"What does the app need to do?"_                  |
| Data Access    | _"How do I get the data the app needs?"_           |
| Infrastructure | _"How do I communicate with the external system?"_ |

### Why This Matters

Because each layer only depends on a contract, not a concrete implementation, any layer can be swapped without touching anything above it:

- Swap `fetch` for `axios`? Only `HttpClient` changes
- Endpoint or base URL changes? Only `CocktailClient` changes
- Swap the entire data source — REST API, database, local file, or mock? Write a new class that implements `ICocktailRepository` and pass it in. `CocktailService` accepts anything that fits the contract
- Business logic changes? Only the `Service` changes
- Components only ever call the `Service` — they have no knowledge of HTTP, endpoints, or data mapping

### Data Flow

Raw API data (`ICocktail`) enters at the infrastructure layer and travels up to the repository. The repository passes it to `CocktailDTO.fromResponse()` which validates and maps it into a `CocktailDTO` — from this point forward, nothing in the app ever sees raw API data. Each layer only ever works with `CocktailDTO`.

```
Component → Service → Repository → Client
                           ↑
                receives ICocktail from Client
                passes it to CocktailDTO.fromResponse()
                everything above only ever sees CocktailDTO
```

---

### Classes

| Class                | Layer          | Responsibility                          | Notes                                                                 |
| -------------------- | -------------- | --------------------------------------- | --------------------------------------------------------------------- |
| `HttpClient`         | Infrastructure | Does HTTP requests                      | No knowledge of any specific API or URL                               |
| `CocktailClient`     | Infrastructure | Owns all cocktail api endpoints         | Extends `HttpClient`, implements `ICocktailClient`, defines all paths |
| `CocktailRepository` | Data Access    | Fetches and maps cocktail data          | Calls named client methods — no knowledge of URL structure            |
| `CocktailDTO`        | Data Transfer  | Validates and maps the raw API response | Acts as the boundary of trust between the API and the app             |
| `CocktailService`    | Business Logic | Applies business logic                  | The only layer components ever interact with                          |

### Contracts

The generic contracts know nothing about cocktails — they work for any API you add in the future. The cocktail-specific contracts keep each layer decoupled from concrete implementations, meaning any class that satisfies the contract can be plugged in without touching anything above it.

| Contract              | Scope    | Responsibility                                                                                                                                    |
| --------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `IHttpClient`         | Generic  | Contract any HTTP client must implement                                                                                                           |
| `ICocktailClient`     | Cocktail | Contract for the cocktail api — defines its named endpoint methods                                                                                |
| `ICocktailRepository` | Cocktail | Contract for cocktail data access — any class that implements this contract can be passed in — the service never knows or cares what is behind it |

### Errors

Errors are thrown as close to the problem as possible and caught as close to the user as possible — **throw early, catch late**.

### Singleton Initialization in Next.js

Next.js applications run in two separate environments: the **server** (during server‑side rendering) and the **client** (in the browser). A singleton `CocktailService` must be initialized in **both** environments, each with its own instance. This creates a subtle race condition: a client component may attempt to use the service before the client‑side initialization code has executed, leading to a `"CocktailService has not been initialized"` error.

#### The Challenge

- Modules imported **without** the `"use client"` directive are **excluded from the client bundle** – they run only on the server.
- Therefore, the server‑side bootstrap (e.g., `import "./lib/bootstrap"` in the root layout) does **not** run in the browser.
- A separate client‑side bootstrap file with `"use client"` is needed to initialize the service on the client.
- Even with both bootstraps in place, the order in which client modules are evaluated can cause the bootstrap code to run **after** a component that depends on the service has already tried to access it.
- The original service threw an error immediately if `instance` was accessed before `init()` was called, making the timing critical.

#### The Solution

1. **Dual Bootstraps**
   - **Server bootstrap** (`app/lib/bootstrap.ts`): imported in the root layout (no `"use client"`), runs during SSR to initialize the server‑side singleton.
   - **Client bootstrap** (`app/lib/client-bootstrap.ts` with `"use client"`): also imported in the layout, runs in the browser to initialize the client‑side singleton.  
     This guarantees that each environment receives its own initialized instance.

2. **Async‑Ready Service**  
   The service was refactored to decouple the instance from the repository:
   - The `instance` getter returns a service object **synchronously**, without requiring the repository.
   - Every public method (`getPopular`, `getPage`, `search`) internally `await`s a promise that resolves when `init()` is called.
   - If a method is called before the client bootstrap executes, it simply waits – no error is thrown.
   - Once the bootstrap calls `init()`, the promise resolves and all pending method calls proceed normally.

This design eliminates the race condition entirely. The service is now robust against the unpredictable order of execution between the client‑side bootstrap and component code. It works reliably on initial page load, client‑side navigation, and after any search or pagination interaction.

---

## Requirements

Ensure you are using the correct Node.js version by running the following command in the root of the repository:

```sh
nvm use
```

---

## Project Setup

```sh
yarn
```

### Start Development Server

```sh
yarn dev
```

### Build for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
