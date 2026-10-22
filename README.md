<div align="center">

# 💰 BudgetTrack

**A modern, cross-platform personal finance and budget tracking ecosystem.**  
Monitor cash flow, track net worth, manage multi-currency accounts, and reach savings goals with a seamless **Web** and **Mobile (iOS & Android)** experience.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Expo](https://img.shields.io/badge/Expo-SDK_57-000020?logo=expo&logoColor=white)](https://expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.86-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_/_NativeWind_v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Zustand](https://img.shields.io/badge/State-Zustand_5-443e38)](https://github.com/pmndrs/zustand)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

</div>

---

## 📖 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Architecture & Workspace Structure](#-architecture--workspace-structure)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Web Application Setup](#1-web-application-root)
  - [Mobile Application Setup (Expo)](#2-mobile-application-mobile)
- [Environment Configuration](#-environment-configuration)
- [Available Scripts](#-available-scripts)
- [Mobile Deep Dive & Native Features](#-mobile-deep-dive--native-features)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🌟 Overview

**BudgetTrack** is engineered to make personal finance management intuitive, beautiful, and secure. Built with performance and privacy at its core, it operates **offline-first** with zero friction—persisting your data securely on-device while providing rich visual insights into your financial health.

Whether you're tracking daily expenses on the go with the native mobile app or analyzing your long-term wealth trajectory on the web dashboard, BudgetTrack keeps everything in sync.

---

## ✨ Key Features

### 📊 Smart Financial Dashboard
- **Net Worth & Liquid Cash Overview:** Real-time balances with privacy toggle to hide/show amounts.
- **Cash Flow Analytics:** Visual monthly income vs. expense tracking and budget burn rate calculations.
- **Category Breakdown:** Interactive visual breakdown of spending across custom categories (Food, Utilities, Entertainment, Housing, etc.).

### 💳 Multi-Account & Wallet Support
- Link multiple payment methods: **Cash, Bank Accounts, and E-Wallets** (GCash, Maya, PayPal, etc.).
- Real-time balance adjustment on transactions.
- Set primary accounts and customize masked account numbers.

### 💸 Transaction Management
- **Fast Logging:** Add expenses and income with category tags, custom notes, timestamps, and account selectors.
- **Search & Filters:** Instant search, type filtering (Income/Expense), date range scoping, and category sorting.
- **Data Export:** Generate and export transaction history directly to **CSV** format (with native mobile share sheet integration).

### 🎯 Savings Goals & Automation
- **Target Tracking:** Set visual savings targets with deadlines, target amounts, and monthly contribution tracking.
- **Milestone Progress:** Visual status indicators (`On Track`, `Behind`, `Completed`) with automated projection schedules.
- **Smart Allocation:** Set automated monthly allocations from designated funding accounts.

### 🎨 Premium UI & Theming
- **Dual Theming:** Built-in Light and Dark modes with smooth transitions.
- **Modern Design:** Glassmorphism, fluid micro-interactions, responsive bottom navigation, and clean typography.
- **Device Frame Preview:** Interactive mobile mockup switcher on the desktop web app.

### 🔒 Privacy & Offline First
- 100% offline capability with client-side persistence (`localStorage` for Web, `AsyncStorage` / SQLite for Mobile).
- Biometric lock & secure storage integration ready.

---

## 🏗 Architecture & Workspace Structure

> 📖 **Full Engineering Master Document:** For complete end-to-end system topology, technology matrix, database ERD, offline sync protocol, and cryptographic specifications, read [**`docs/SYSTEM_ARCHITECTURE_AND_TECH_STACK.md`**](docs/SYSTEM_ARCHITECTURE_AND_TECH_STACK.md).

The repository is structured as a multi-client monorepo containing the Vite web client, the Expo React Native mobile client, and the landing/distribution portal:

```text
budgettracker/
├── docs/                      # 📚 MASTER DOCUMENTATION
│   ├── SYSTEM_ARCHITECTURE_AND_TECH_STACK.md # Master Architecture & Tech Stack
│   └── README.md              # Engineering documentation index
│
├── index.html                 # Web app entry HTML
├── src/                       # 🌐 WEB APPLICATION (React 19 + Vite)
│   ├── components/            # UI components & views
│   │   ├── modals/            # Transaction, Goal, Account, AI Insights Modals
│   │   ├── screens/           # HomeScreen, TransactionsScreen, GoalsScreen, AccountScreen
│   │   ├── BottomNav.tsx      # Mobile-style navigation bar
│   │   └── Header.tsx         # Top app bar with balances & actions
│   ├── data/                  # Initial seed data
│   ├── types.ts               # Shared TypeScript schemas
│   ├── App.tsx                # Main Web App state machine & router
│   └── main.tsx               # Web bootstrap
│
├── mobile/                    # 📱 MOBILE APPLICATION (Expo SDK 57 + React Native)
│   ├── src/
│   │   ├── app/               # Expo Router file-based routes
│   │   │   ├── (tabs)/        # Tab navigation (Home, Transactions, Goals, Profile)
│   │   │   ├── transaction/   # Transaction modals & sheets
│   │   │   ├── goal/          # Goal creation & automation sheets
│   │   │   └── account/       # Profile, budget limits & help routes
│   │   ├── features/          # Domain-driven screens & logic (home, transactions, goals, account)
│   │   ├── components/        # Design system UI primitives & layout chrome
│   │   ├── store/             # Zustand state stores (persisted to AsyncStorage & SQLite)
│   │   ├── theme/             # Light & Dark color tokens & NativeWind config
│   │   └── lib/               # Utility functions (CSV builder, formatting, dates)
│   ├── docs/
│   │   ├── ARCHITECTURE.md    # In-depth mobile architecture & guidelines
│   │   └── BRAND.md           # Brand identity and visual design rules
│   └── app.json               # Expo configuration & plugins
│
├── website/                   # 🚀 LANDING & DISTRIBUTION PORTAL (Vite + SSG)
│   ├── src/                   # Marketing UI, store buttons & QR handoff
│   └── scripts/prerender.mjs  # Static site generator for SEO & crawlers
│
├── package.json               # Root Web workspace configuration
└── README.md                  # Project documentation
```

---

## 🛠 Tech Stack

### 🌐 Web Client
| Layer | Technology |
|---|---|
| **Framework** | [React 19](https://react.dev/) + [Vite 8](https://vitejs.dev/) |
| **Language** | [TypeScript](https://www.typescriptlang.org/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Animations** | [Motion](https://motion.dev/) |
| **Icons** | [Lucide React](https://lucide.dev/) |
| **AI Integration** | [@google/genai](https://www.npmjs.com/package/@google/genai) |

### 📱 Mobile Client
| Layer | Technology |
|---|---|
| **Framework** | [Expo SDK 57](https://expo.dev/) + [React Native 0.86](https://reactnative.dev/) |
| **Navigation** | [Expo Router](https://docs.expo.dev/router/introduction/) (File-based) |
| **Styling** | [NativeWind v4](https://www.nativewind.dev/) (Tailwind CSS 3) |
| **State Management** | [Zustand 5](https://github.com/pmndrs/zustand) + `persist` |
| **Storage** | [@react-native-async-storage/async-storage](https://react-native-async-storage.github.io/async-storage/) |
| **Animations** | [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/) |
| **Native APIs** | `expo-blur`, `expo-linear-gradient`, `expo-sharing`, `expo-file-system`, `expo-local-authentication` |

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **bun**
- *(Optional for Mobile Testing)*: **Expo Go** on your physical iOS/Android device or Xcode / Android Studio simulator.

---

### 1. Web Application (Root)

Clone the repository and install dependencies:

```bash
git clone https://github.com/Ronmar11/budgetTracker.git
cd budgetTracker

# Install root dependencies
npm install

# Start the Vite development server
npm run dev
```

Open your browser at `http://localhost:3000` to view the web application.

---

### 2. Mobile Application (`mobile/`)

Navigate to the `mobile` directory:

```bash
cd mobile

# Install mobile dependencies
npm install

# Start the Expo development server
npm run start
```

#### Run on specific platforms:
- **Android Emulator / Device:**
  ```bash
  npm run android
  ```
- **iOS Simulator (macOS required):**
  ```bash
  npm run ios
  ```
- **Web preview for Expo:**
  ```bash
  npm run web
  ```
- **Physical Device:** Scan the QR code displayed in the terminal with the **Expo Go** app (Android) or the default Camera app (iOS).

---

## ⚙️ Environment Configuration

For optional AI insights and server features, create a `.env` or `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Populate the required credentials:
```env
# Gemini API Key (for automated financial insights & AI assistant features)
GEMINI_API_KEY="your-gemini-api-key-here"

# App URL (optional for cloud hosting)
APP_URL="http://localhost:3000"
```

---

## 📜 Available Scripts

### Root Workspace (Web)
| Command | Description |
|---|---|
| `npm run dev` | Starts the local Vite development server on port 3000 |
| `npm run build` | Compiles and optimizes the web application for production |
| `npm run preview` | Previews the production build locally |
| `npm run lint` | Runs TypeScript type checking |
| `npm run clean` | Cleans up the `dist` build directory |

### Mobile Workspace (`mobile/`)
| Command | Description |
|---|---|
| `npm run start` | Launches the Expo Metro bundler |
| `npm run android` | Starts Metro and boots the connected Android emulator/device |
| `npm run ios` | Starts Metro and launches iOS simulator |
| `npm run web` | Runs the mobile app codebase in browser mode |
| `npm run typecheck` | Validates TypeScript types across the mobile app |
| `npm run lint` | Lints mobile codebase using Expo ESLint |
| `npm run icons:generate`| Re-generates SVG icon components from Material Symbols |

---

## 📱 Mobile Deep Dive & Native Features

- **File-based Navigation:** Powered by Expo Router with typed routes (`src/app/`).
- **Dynamic Bottom Sheets & Modals:** Native-feel presentation with swipe-to-dismiss and keyboard avoidance.
- **CSV Sharing:** One-tap export that compiles your records and summons the native system share sheet.
- **Theme Engine:** CSS-variable powered theming with instantaneous light/dark toggle.
- **For architecture specifics, review [`mobile/docs/ARCHITECTURE.md`](mobile/docs/ARCHITECTURE.md).**

---

## 🗺 Roadmap

- [ ] Cloud sync & multi-device backup via Supabase / Firebase.
- [ ] Receipt OCR scanning with Gemini Multimodal AI.
- [ ] Push notifications & recurring bill reminders.
- [ ] Multi-currency conversion via real-time exchange rates.
- [ ] Interactive PDF financial health reports.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the **Apache-2.0** License. See [`LICENSE`](mobile/LICENSE) for more details.

---

<div align="center">
Made with ❤️ by <a href="https://github.com/Ronmar11">Ronmar11</a>
</div>