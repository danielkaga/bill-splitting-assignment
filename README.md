# Bill Splitting App

## Overview

This app helps friends split bills easily and accurately by allowing customized splits and tracking payments. For more details, see the [Project Plan](./PROJECT_PLAN.md).

## Getting Started

1. **Environment Setup**: Copy the example environment file:

```bash
  cp .env.example .env
```

2. **Install Dependencies**:

```bash
  pnpm install
```

3. **Run DB migrations**: If it's your first time setting up, migrate and seed the database:

```bash
  pnpm run prisma:migrate-dev
  pmpm run prisma:seed
```

4. **Start the Application**: Run the app in dev mode:

```bash
  pnpm run dev
```

## Database Management

To explore and manage the sqlite database, you can use Prisma Studio:

```bash
  pnpm prisma:studio
```