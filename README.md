# Galaxy AI - SaaS Platform

A production-ready Next.js 14 TypeScript SaaS application scaffold with App Router, Clerk authentication, Prisma ORM, and modern UI tools.

## 🚀 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS
- **Authentication**: Clerk
- **Database**: Prisma + PostgreSQL
- **State Management**: Zustand
- **Validation**: Zod
- **Flow Canvas**: React Flow
- **Icons**: Lucide React
- **Code Quality**: ESLint + Prettier

## 📁 Project Structure

```
.
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (dashboard)/        # Dashboard route group
│   │   │   ├── layout.tsx      # Dashboard layout
│   │   │   └── page.tsx        # Dashboard page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Home page
│   │   └── globals.css         # Global styles
│   ├── components/             # React components
│   │   └── layout/             # Layout components
│   │       ├── DashboardLayout.tsx
│   │       ├── LeftSidebar.tsx
│   │       ├── CanvasArea.tsx
│   │       └── RightSidebar.tsx
│   ├── stores/                 # Zustand stores
│   ├── lib/                    # Utility functions
│   └── types/                  # TypeScript types
├── prisma/
│   └── schema.prisma           # Database schema
├── trigger/                    # Trigger.dev workflows
└── public/                     # Static assets
```

## 🛠️ Setup Instructions

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- Clerk account (for authentication)

### Installation

1. **Clone and install dependencies**:
```bash
npm install
```

2. **Set up environment variables**:
```bash
cp .env.example .env
```

Edit `.env` and add your credentials:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Your Clerk publishable key
- `CLERK_SECRET_KEY`: Your Clerk secret key
- `DATABASE_URL`: Your PostgreSQL connection string

3. **Initialize the database**:
```bash
npm run prisma:generate
npm run prisma:push
```

4. **Run the development server**:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your application.

## 📜 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:push` - Push schema changes to database

## 🎨 Dashboard Layout

The application features a 3-column dashboard layout:

- **Left Sidebar**: Navigation menu
- **Center Canvas**: React Flow canvas for visual workflows
- **Right Sidebar**: Properties panel and settings

## 🔐 Authentication

Clerk authentication is scaffolded but requires API keys to function. Add your Clerk credentials to `.env` to enable authentication.

## 🗄️ Database

The project uses Prisma with PostgreSQL. The schema includes a basic User model. Customize `prisma/schema.prisma` to fit your needs.

## 🧰 State Management

Zustand is configured for state management. See `src/stores/index.ts` for an example store implementation.

## 📝 Type Safety

TypeScript strict mode is enabled. Common types are defined in `src/types/index.ts`.

## 🎯 Next Steps

1. Add your Clerk and database credentials to `.env`
2. Customize the Prisma schema for your data models
3. Build out your application features
4. Add Trigger.dev workflows in the `trigger/` directory
5. Implement business logic and API routes

## 📄 License

MIT

---

Built with ❤️ using Next.js 14
