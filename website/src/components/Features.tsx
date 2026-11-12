import type { ReactNode } from 'react';

import {
  Airplane,
  Bell,
  Chat,
  Check,
  Cloud,
  Csv,
  DatabaseBackup,
  Fingerprint,
  Lock,
  PieChart,
  PiggyBank,
  Share,
  ShieldCheck,
  Smartphone,
  Tag,
  TrendUp,
  Wallet,
  WifiOff,
} from './icons';

/**
 * Features as a bento grid: each tile pairs a short pitch with a tiny, static
 * “glimpse” of that feature drawn in HTML/SVG (sample data, decorative only).
 */

type TileProps = {
  icon: (p: { className?: string }) => ReactNode;
  title: string;
  body: string;
  visual: ReactNode;
  className?: string;
  /** The ember-gradient brand tile (used once, for the headline feature). */
  brand?: boolean;
};

function Tile({ icon: Icon, title, body, visual, className = '', brand }: TileProps) {
  return (
    <article
      className={`bento-tile group relative flex flex-col overflow-hidden rounded-[28px] border transition duration-300 hover:-translate-y-1 ${
        brand
          ? 'hero-gradient border-transparent'
          : 'glass-card hover:border-primary/30'
      } ${className}`}>
      <div className="relative flex min-h-44 flex-1 items-center justify-center px-6 pt-6" aria-hidden="true">
        {visual}
      </div>
      <div className="relative p-6 pt-5">
        <h3 className="flex items-center gap-2 text-lg font-bold">
          <Icon className={`h-5 w-5 shrink-0 ${brand ? 'text-[#FFB899]' : 'text-primary'}`} />
          {title}
        </h3>
        <p className={`mt-2 text-[15px] leading-relaxed ${brand ? 'text-white/85' : 'text-on-surface-variant'}`}>{body}</p>
      </div>
    </article>
  );
}

// ── Glimpses ────────────────────────────────────────────────────────────────

function OfflineGlimpse() {
  const rows = [
    { name: 'Groceries', amount: '−₱1,240' },
    { name: 'Jeepney fare', amount: '−₱26' },
    { name: 'Freelance pay', amount: '+₱8,500' },
  ];
  return (
    <div className="w-full max-w-md">
      <div className="mb-3 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold ring-1 ring-white/15">
          <Airplane className="h-3.5 w-3.5" /> Airplane mode
        </span>
        <span className="inline-flex items-center gap-1.5 text-xs text-white/75">
          <span className="h-1.5 w-1.5 rounded-full bg-[#F5B13D]" /> 3 changes waiting to sync
        </span>
      </div>
      <ul className="space-y-2">
        {rows.map((r, i) => (
          <li
            key={r.name}
            className="flex items-center justify-between rounded-2xl bg-white/[0.07] px-4 py-3 ring-1 ring-white/10 transition duration-500 group-hover:translate-x-1"
            style={{ transitionDelay: `${i * 60}ms` }}>
            <span className="text-sm font-semibold">{r.name}</span>
            <span className="flex items-center gap-3">
              <span className="hidden text-[11px] text-white/65 sm:inline">Saved on phone</span>
              <span className={`text-sm font-bold tabular-nums ${r.amount.startsWith('+') ? 'text-[#B8F0CB]' : ''}`}>{r.amount}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SyncGlimpse() {
  return (
    <div className="flex w-full max-w-60 items-center justify-between">
      <Node icon={<Smartphone className="h-6 w-6" />} label="Your phone" />
      <div className="relative mx-2 h-px flex-1 border-t-2 border-dashed border-primary/40">
        <span className="absolute -top-4 left-1/2 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full glass-raised ring-2 ring-primary/30">
          <Lock className="h-4 w-4 text-primary" />
        </span>
      </div>
      <Node icon={<Cloud className="h-6 w-6" />} label="Your cloud" muted />
    </div>
  );
}

function Node({ icon, label, muted }: { icon: ReactNode; label: string; muted?: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className={`flex h-14 w-14 items-center justify-center rounded-2xl ${
          muted ? 'border-2 border-dashed border-primary/35 text-primary' : 'hero-button'
        }`}>
        {icon}
      </span>
      <span className="text-xs font-semibold text-on-surface-variant">{label}</span>
    </div>
  );
}

function PinGlimpse() {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex gap-2.5">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`h-3.5 w-3.5 rounded-full ${i < 4 ? 'bg-primary' : 'border-2 border-outline/60'}`} />
        ))}
      </div>
      <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
        <span className="absolute inset-0 rounded-full ring-2 ring-primary/30 transition duration-700 group-hover:scale-125 group-hover:opacity-0" />
        <Fingerprint className="h-8 w-8" />
      </span>
    </div>
  );
}

function BudgetGlimpse() {
  const rows = [
    { name: 'Food', pct: 62, tone: 'bg-primary', note: '62%' },
    { name: 'Transport', pct: 84, tone: 'bg-tertiary', note: '84% · heads-up' },
    { name: 'Shopping', pct: 100, tone: 'bg-secondary', note: 'Over by ₱320' },
  ];
  return (
    <div className="w-full space-y-3.5">
      {rows.map((r) => (
        <div key={r.name}>
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="font-semibold">{r.name}</span>
            <span className={r.pct >= 100 ? 'font-semibold text-secondary' : r.pct >= 80 ? 'font-semibold text-tertiary' : 'text-on-surface-variant'}>
              {r.note}
            </span>
          </div>
          <div className="relative h-2 rounded-full bg-surface-container-high">
            <span className={`absolute inset-y-0 left-0 rounded-full ${r.tone}`} style={{ width: `${r.pct}%` }} />
            <span className="absolute inset-y-[-3px] left-[80%] w-px bg-on-surface/25" />
          </div>
        </div>
      ))}
    </div>
  );
}

function GoalGlimpse() {
  const pct = 68;
  const r = 38;
  const c = 2 * Math.PI * r;
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 96 96" className="h-24 w-24 -rotate-90">
        <circle cx="48" cy="48" r={r} fill="none" strokeWidth="10" className="stroke-surface-container-high" />
        <circle
          cx="48"
          cy="48"
          r={r}
          fill="none"
          strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - pct / 100)}
          className="stroke-primary"
        />
      </svg>
      <div>
        <p className="text-2xl font-extrabold tabular-nums">{pct}%</p>
        <p className="text-xs text-on-surface-variant">Emergency fund</p>
        <p className="mt-1.5 inline-flex items-center gap-1 rounded-full bg-primary/12 px-2 py-0.5 text-[11px] font-semibold text-primary">
          <Check className="h-3 w-3" /> On track
        </p>
      </div>
    </div>
  );
}

function ReportsGlimpse() {
  const months = [
    ['Apr', 70, 52],
    ['May', 64, 58],
    ['Jun', 78, 49],
    ['Jul', 72, 61],
    ['Aug', 86, 55],
    ['Sep', 92, 47],
  ] as const;
  return (
    <div className="w-full max-w-lg">
      <div className="mb-3 flex gap-4 text-xs text-on-surface-variant">
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-success" /> Income</span>
        <span className="flex items-center gap-1.5"><span className="h-2 w-2 rounded-full bg-primary" /> Spending</span>
      </div>
      <div className="flex h-32 items-end justify-between gap-3">
        {months.map(([m, inc, out], i) => (
          <div key={m} className="flex h-full flex-1 flex-col items-center gap-1.5">
            <div className="flex w-full flex-1 items-end justify-center gap-1">
              <span className="bento-bar w-full max-w-4 rounded-t-md bg-success" style={{ height: `${inc}%`, animationDelay: `${i * 40}ms` }} />
              <span className="bento-bar w-full max-w-4 rounded-t-md bg-primary/80" style={{ height: `${out}%`, animationDelay: `${i * 40 + 20}ms` }} />
            </div>
            <span className="text-[11px] text-on-surface-variant">{m}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WalletsGlimpse() {
  const cards = [
    { name: 'Bank', amount: '₱34,620', cls: 'hero-gradient' },
    { name: 'GCash', amount: '₱8,450', cls: 'bg-primary text-on-primary' },
    { name: 'Cash', amount: '₱3,200', cls: 'bg-surface-container-highest text-on-surface' },
  ];
  return (
    <div className="relative h-36 w-52">
      {cards.map((c, i) => (
        <div
          key={c.name}
          className={`absolute inset-x-0 flex h-20 flex-col justify-between rounded-2xl p-3.5 shadow-card transition duration-500 ${c.cls}`}
          style={{ top: `${i * 26}px`, transform: `rotate(${(i - 1) * -3}deg)`, zIndex: i }}>
          <span className="text-xs font-semibold opacity-80">{c.name}</span>
          <span className="text-lg font-bold tabular-nums">{c.amount}</span>
        </div>
      ))}
    </div>
  );
}

function CategoriesGlimpse() {
  const chips = [
    ['Food & Drinks', 'var(--primary)'],
    ['Bills', 'var(--tertiary-container)'],
    ['Transport', 'var(--secondary)'],
    ['Groceries', 'var(--success)'],
    ['Health', 'var(--on-surface)'],
  ];
  return (
    <div className="flex max-w-64 flex-wrap justify-center gap-2">
      {chips.map(([name, color]) => (
        <span key={name} className="glass-raised inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium">
          <span className="h-2 w-2 rounded-full" style={{ background: color }} />
          {name}
        </span>
      ))}
      <span className="inline-flex items-center rounded-full border border-dashed border-primary/50 px-3 py-1.5 text-xs font-semibold text-primary">
        + Your own
      </span>
    </div>
  );
}

function BackupGlimpse() {
  return (
    <div className="flex w-full max-w-md items-center gap-3">
      <div className="flex flex-1 flex-col gap-2">
        <FileChip icon={<Csv className="h-5 w-5" />} name="spendify_transactions.csv" meta="For spreadsheets" />
        <FileChip icon={<DatabaseBackup className="h-5 w-5" />} name="spendify-backup.json" meta="Full backup · new phone" />
      </div>
      <span className="h-px w-8 border-t-2 border-dashed border-primary/40" />
      <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container transition duration-300 group-hover:rotate-6">
        <Share className="h-6 w-6" />
      </span>
    </div>
  );
}

function FileChip({ icon, name, meta }: { icon: ReactNode; name: string; meta: string }) {
  return (
    <div className="glass-raised flex items-center gap-3 rounded-2xl px-3.5 py-2.5">
      <span className="text-primary">{icon}</span>
      <span className="min-w-0">
        <span className="block truncate text-xs font-semibold">{name}</span>
        <span className="block text-[11px] text-on-surface-variant">{meta}</span>
      </span>
    </div>
  );
}

// ── Ollie glimpses (sample data; wording matches the app's own messages) ───

function OllieBubble({ children, brand }: { children: ReactNode; brand?: boolean }) {
  return (
    <div className="flex max-w-sm items-end gap-2.5">
      <img src="/ollie-happy.webp" alt="" width={40} height={41} className="h-10 w-10 shrink-0 object-contain" />
      <p
        className={`rounded-2xl rounded-bl-md px-4 py-3 text-sm leading-snug ${
          brand ? 'bg-white/[0.1] ring-1 ring-white/15' : 'glass-raised'
        }`}>
        {children}
      </p>
    </div>
  );
}

function AskGlimpse() {
  return (
    <div className="flex w-full max-w-md flex-col gap-3">
      <p className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-white px-4 py-2.5 text-sm font-semibold text-[#8c170b] transition duration-500 group-hover:-translate-x-1">
        Magkano gastos ko this week?
      </p>
      <OllieBubble brand>
        You spent <strong className="tabular-nums">₱3,480</strong> this week (Nov 9–12).
      </OllieBubble>
      <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold ring-1 ring-white/15">
        <Lock className="h-3.5 w-3.5" /> Added up on your phone
      </span>
    </div>
  );
}

function SuggestGlimpse() {
  return (
    <div className="w-full max-w-60 space-y-2.5">
      <div className="glass-raised rounded-2xl px-4 py-3">
        <span className="block text-[11px] text-on-surface-variant">Description</span>
        <span className="text-sm font-semibold">JOLLIBEE*4821</span>
      </div>
      <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/12 px-3 py-1.5 text-xs font-semibold text-primary transition duration-300 group-hover:scale-105">
        <Check className="h-3.5 w-3.5" /> Food &amp; Drinks · tap to use
      </span>
    </div>
  );
}

function ForecastGlimpse() {
  return (
    <div className="w-full max-w-60">
      <div className="mb-1.5 flex justify-between text-xs">
        <span className="font-semibold">Food</span>
        <span className="font-semibold text-tertiary">₱14,200 by month end</span>
      </div>
      <div className="relative h-2 rounded-full bg-surface-container-high">
        <span className="absolute inset-y-0 left-0 w-[58%] rounded-full bg-primary" />
        <span className="absolute inset-y-0 left-[58%] w-[42%] rounded-r-full border-2 border-dashed border-tertiary/70" />
        <span className="absolute inset-y-[-4px] left-[85%] w-0.5 bg-on-surface/40" />
      </div>
      <p className="mt-2 text-[11px] text-on-surface-variant">Budget ₱12,000 · spent ₱7,000 so far</p>
    </div>
  );
}

function SmartGlimpse({ text }: { text: ReactNode }) {
  return <OllieBubble>{text}</OllieBubble>;
}

export function SmartFeatures() {
  return (
    <section id="ollie" aria-labelledby="ollie-title" className="relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Meet Ollie</p>
            <h2 id="ollie-title" className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
              A money buddy that notices things for you.
            </h2>
          </div>
          <p className="text-lg text-pretty text-on-surface-variant lg:pb-1.5">
            Smart features that send only what they need, never your name or your records, and nothing is kept on
            our server.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            brand
            className="md:col-span-2"
            icon={Chat}
            title="Ask Ollie about your money"
            body="“How much did I spend last month?” “Income this week?” Ask in English or Taglish, or ask for a money tip. Only your question is sent; your phone adds up the answer from your own records. Needs internet."
            visual={<AskGlimpse />}
          />
          <Tile
            icon={Tag}
            title="Smart category suggestions"
            body="Type a description and Spendify suggests the category in one tap. Only the description is sent, never the amount or account. You can turn it off."
            visual={<SuggestGlimpse />}
          />
          <Tile
            icon={TrendUp}
            title="Spending forecasts"
            body="See where each category is heading this month, and get a heads-up before a budget runs over. Offline, your phone estimates it."
            visual={<ForecastGlimpse />}
          />
          <Tile
            icon={Bell}
            title="Unusual spending alerts"
            body="Ollie points out purchases and weeks far above your usual, worked out on your phone."
            visual={<SmartGlimpse text="That ₱4,800 Shopping purchase is about 3× your usual. Was it planned?" />}
          />
          <Tile
            icon={PieChart}
            title="What kind of week was it?"
            body="Ollie tells you what kind of week it’s been, and Reports shows your recent weeks at a glance."
            visual={<SmartGlimpse text={<>So far this looks like a <strong>Grocery run week</strong>. Groceries made up a big part of the week.</>} />}
          />
        </div>
        <p className="mt-6 text-center text-sm text-on-surface-variant">
          Suggestions, forecasts, alerts and week types can each be switched off in Account; chat is only used when you
          ask. Shown with sample data.
        </p>
      </div>
    </section>
  );
}

// ── Section ─────────────────────────────────────────────────────────────────

export function Features() {
  return (
    <section id="features" aria-labelledby="features-title" className="features-bg relative overflow-hidden py-24">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">Track · Save · Grow</p>
            <h2 id="features-title" className="mt-3 text-3xl font-bold tracking-tight text-balance sm:text-5xl">
              Everything you need to stay on budget.
            </h2>
          </div>
          <p className="text-lg text-pretty text-on-surface-variant lg:pb-1.5">
            A complete money tracker that never asks for your bank login and never needs a signal.
          </p>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Tile
            brand
            className="md:col-span-2"
            icon={WifiOff}
            title="Works fully offline"
            body="Add expenses, check budgets and view reports with no connection at all. Changes sync automatically when you’re back online."
            visual={<OfflineGlimpse />}
          />
          <Tile
            icon={ShieldCheck}
            title="Private, with optional sync"
            body="Records live in an encrypted database on your phone. Sign in with Google to back them up to your own private cloud — or keep them on-device only."
            visual={<SyncGlimpse />}
          />
          <Tile
            icon={Fingerprint}
            title="MPIN, Face ID & fingerprint"
            body="Lock the app with an optional 6-digit MPIN and unlock with biometrics. It auto-locks when you leave it in the background."
            visual={<PinGlimpse />}
          />
          <Tile
            icon={Bell}
            title="Budgets that warn you"
            body="Set a monthly budget or limits per category. Get a heads-up at 80% and when you go over."
            visual={<BudgetGlimpse />}
          />
          <Tile
            icon={PiggyBank}
            title="Savings goals"
            body="Track an emergency fund, a trip or a new laptop, and see at a glance if you’re on track."
            visual={<GoalGlimpse />}
          />
          <Tile
            className="md:col-span-2"
            icon={PieChart}
            title="Reports & charts"
            body="Spending by category, income vs. spending over six months and month-by-month totals — all computed on your device."
            visual={<ReportsGlimpse />}
          />
          <Tile
            icon={Wallet}
            title="Cash, e-wallets & banks"
            body="Separate balances for cash, GCash, Maya and bank accounts. Every transaction updates the right one."
            visual={<WalletsGlimpse />}
          />
          <Tile
            icon={Tag}
            title="Your categories"
            body="Start with sensible defaults, then add, rename or remove categories with your own icons."
            visual={<CategoriesGlimpse />}
          />
          <Tile
            className="md:col-span-2"
            icon={DatabaseBackup}
            title="Backup & export"
            body="Export to CSV for spreadsheets, or create a full backup file to move to a new phone. You choose where it goes."
            visual={<BackupGlimpse />}
          />
        </div>
      </div>
    </section>
  );
}
