# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run start:dev          # run with watch mode
npm run start:debug        # run with watch + debugger
npm run start:prod         # run compiled build (node dist/main)
npm run build              # nest build -> dist/ (deletes outDir first)
npm run lint               # eslint --fix over src/apps/libs/test
npm run format             # prettier --write

npm test                   # all unit tests (jest, *.spec.ts under src/)
npm test -- path/to/x.spec.ts   # single test file
npm run test:watch
npm run test:cov
npm run test:e2e           # e2e tests (test/jest-e2e.json)

# Database (TypeORM CLI, driven by src/config/database.config.ts) — see "Working with migrations"
npm run build && npm run migration                              # run pending migrations
npm run migration:revert                                       # revert last migration
npm run migration:create -- src/database/migrations/YourName    # empty hand-written migration
npm run migration:generate -- src/database/migrations/YourName  # migration diffed from entities
npm run seed                                                   # run seeders (database.seed.config.ts)
```

## Local database setup

`docker-compose.yml` stands up the whole stack — the `api` (built from `Dockerfile`), Postgres, and pgAdmin:

```bash
docker compose up -d          # api + db + pgadmin
npm run build && npm run migration   # create schema (build first — see gotcha below)
npm run seed                  # optional: sample data
docker compose down           # stop (add -v to also wipe the data/pgadmin volumes)
```

The **db** service publishes Postgres on host port **5433** (mapped to 5432 in-container, to avoid clashing with a local Postgres) with `postgres`/`postgres` and db `recipe_db`; data persists in the `pgdata` volume. Your local `.env.development` must line up with whichever DB you target — note the host port is `5433`, not `5432`, so `DB_PORT=5433` when running the app on the host. (`DB_PORT` is honored now that the parsing bug in `database.config.ts` is fixed; it previously always fell back to 5432.)

**pgAdmin** runs at http://localhost:5050 (login `admin@admin.com` / `admin`) and auto-registers the db server from `pgadmin-servers.json` — no manual connection step. Inside the Docker network it connects to host `db` port `5432` (the service name), not `localhost`.

## Working with migrations

`synchronize` is off, so all schema changes go through migrations. Migrations live in `src/database/migrations/` (timestamp-prefixed). **The runner reads compiled JS** — `database.config.ts` sets `migrations: ['dist/database/migrations/*.js']` — so a migration only applies after `npm run build`. Skip the build and the CLI reports "No migrations pending" and does nothing.

Two ways to author one:

**Generate from entity changes (preferred).** Edit an `*.entity.ts`, then let TypeORM diff the entities against the live DB and write the `up()`/`down()` SQL for you:

```bash
# 1. change an entity
npm run build                                                   # generate diffs against compiled entities
npm run migration:generate -- src/database/migrations/AddIsVeganToDish
npm run build                                                   # compile the new migration into dist/
npm run migration                                              # apply it
```

Note the two builds: the first so the diff sees your entity change, the second so the generated `.ts` reaches `dist/` for the runner. `migration:generate` diffs against the DB in `.env.development`, so that DB must be up and already migrated to the current state.

Entities and migrations are reconciled — against a DB migrated to the current state, `migration:generate` produces a clean, empty diff, so a generated migration will contain only your actual change. If you ever see unrelated `ALTER`s creep into a generated file, an entity has drifted from the schema (missing column `length`, `default`, `unique`, or FK `onDelete`/`nullable`); fix the entity to match rather than committing the noise.

**Write one by hand.** For data backfills or changes the differ can't express, scaffold an empty migration and fill in `up()`/`down()` with the `QueryRunner` API (`addColumn`, `renameColumn`, `query('...')`, …) — see `1744190263562-UpdateUserTableWithPassword.ts`:

```bash
npm run migration:create -- src/database/migrations/BackfillDishSlugs
# edit up()/down(), then:
npm run build && npm run migration
```

Both `migration:create` and `migration:generate` take the target path as an argument after `--` (the scripts no longer hardcode a name). `migration:create` does not need the DB or a build to scaffold; `migration:generate` needs both.

## Critical gotchas

- **Build before migrating/running.** `database.config.ts` resolves `entities` and `migrations` from `dist/**` (compiled JS), not `src/`. TypeORM will see zero entities/migrations until you `npm run build`. The migration scripts do **not** build first — run `npm run build` yourself.
- **Env file is hardcoded to `.env.development`.** Both `ConfigModule` (`app.module.ts`) and `database.config.ts` load `.env.development` regardless of `NODE_ENV`. `.env.example` lists the required keys (`APP_PORT`, `DB_HOST/PORT/USER/PASSWORD/NAME`). Env is validated by a Joi schema (`src/config/env-validation.config.ts`); missing required vars fail startup.
- **`synchronize` is off.** Schema changes only apply through migrations.

## Architecture

NestJS 10 + TypeORM 0.3 + PostgreSQL. Two feature domains wired into `AppModule`:

- **`src/recipe/`** — `RecipeModule` groups three sub-features (products, dishes, ingredients), each with its own controller/service/entity/DTOs but all registered in the single `recipe.module.ts`.
- **`src/auth/`** — `AuthModule` (registration) delegating to `UserService`; exports `AuthService`/`UserService` for reuse.

Key domain model: **`Ingredient` is the join entity** between `Dish` and `Product` (many-to-one to each, plus an `amount`). Creating a dish (`DishService.create`) saves the dish, then fans out to `IngredientService.create` per ingredient, resolving each `productId` to a `Product`.

### Cross-cutting pieces

- **Global `ValidationPipe` + `DatabaseExceptionFilter`** are registered in `main.ts`. The filter (`src/filters/database.filter.ts`) catches TypeORM `QueryFailedError` and maps Postgres `UNIQUE_VIOLATION` -> HTTP 409 Conflict; other DB errors -> 400.
- **Custom `@Match` validator** (`src/decorators/match.decorator.ts`) — used in `CreateUserDto` so `confirmPassword` must equal `password`.
- **DTO inheritance**: `CreateUserDto` extends `UpdateUserDto` via `@nestjs/mapped-types` `OmitType`. Recipe DTOs follow the same create/update pairing.
- **Custom repository pattern**: `IngredientRepository` extends TypeORM `Repository` (constructs via `dataSource.createEntityManager()`) and is provided in `RecipeModule`. Other features inject the plain repository via `@InjectRepository`.

### Database config (two DataSources)

- `src/config/database.config.ts` — the app + migration DataSource. Exports `databaseConfig` (async options for `TypeOrmModule.forRootAsync`), `dataSourceOptions`, and a default `DataSource` for the CLI.
- `src/config/database.seed.config.ts` — a separate DataSource that spreads `dataSourceOptions` and adds `seeds`/`factories` (typeorm-extension). Seeders live in `src/database/seeds/` (numbered for order: user -> product -> dish -> ingredient) with matching factories in `src/database/factories/`.

## Conventions

- Tests are `*.spec.ts` colocated with source (jest `rootDir` is `src/`).
- `tsconfig.json` is loose: `strictNullChecks`, `noImplicitAny`, and `strictBindCallApply` are all off.
- `requests/*.http` are manual API request samples per feature.
