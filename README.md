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
│   │   ├── CocktailFetchError.ts
│   │   ├── CocktailRepository.ts
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
