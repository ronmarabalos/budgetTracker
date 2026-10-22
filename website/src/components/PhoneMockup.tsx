import {
  ArrowBack,
  ArrowExpense,
  ArrowIncome,
  ArrowUp,
  Backspace,
  ChevronRight,
  Fingerprint,
  Leaf,
  PieChart,
  TabGoals,
  TabHome,
  TabTransactions,
  User,
  Wallet,
} from './icons';
import { SpendifyMark, SpendifyWordmark } from './Brand';
import { GardenLeaves, LEAF_PATH } from './GardenBackdrop';

/*
 * Illustrative recreations of real Spendify screens (sample data), built
 * from the app's design tokens so they follow the site's light/dark theme:
 * frosted-glass cards floating over the blurred-garden backdrop.
 */

export function Phone({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[272px] shrink-0 rounded-[46px] border border-surface-container-highest bg-surface-container-highest p-2.5 shadow-phone ${className}`}>
      <div className="garden relative h-[560px] overflow-hidden rounded-[38px]">
        <GardenLeaves blur={false} />
        {/* Dynamic-island style notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/85" aria-hidden="true" />
        <div className="relative h-full pt-10" aria-hidden="true">
          {children}
        </div>
      </div>
    </figure>
  );
}

function Logo() {
  return (
    <span className="flex items-center gap-1 text-[var(--brand-ink)]">
      <SpendifyMark className="h-5" />
      <SpendifyWordmark className="h-[11px]" />
    </span>
  );
}

function StatusPill({ offline = false }: { offline?: boolean }) {
  return (
    <span className="glass-raised flex items-center gap-1 rounded-full px-2 py-0.5 text-[8px] font-semibold">
      <span className={`h-1.5 w-1.5 rounded-full ${offline ? 'bg-outline' : 'bg-primary'}`} />
      <span className={offline ? 'text-on-surface-variant' : 'text-primary'}>{offline ? 'Offline' : 'Online'}</span>
    </span>
  );
}

function TabBar() {
  const tabs = [
    { icon: TabHome, label: 'Home', active: true },
    { icon: TabTransactions, label: 'Transactions' },
    { icon: TabGoals, label: 'Goals' },
    { icon: User, label: 'Profile' },
  ];
  return (
    <div className="glass-card absolute inset-x-3 bottom-3 flex h-12 items-center justify-around rounded-full">
      {tabs.map(({ icon: Icon, label, active }) => (
        <span key={label} className={`flex flex-col items-center gap-0.5 ${active ? 'text-primary' : 'text-on-surface-variant'}`}>
          <Icon className="h-3.5 w-3.5" strokeWidth={active ? 2.2 : 1.5} />
          <span className={`text-[7px] ${active ? 'font-semibold' : ''}`}>{label}</span>
        </span>
      ))}
    </div>
  );
}

const DONUT = [
  { name: 'Food & Drinks', pct: 38, color: 'var(--secondary)' },
  { name: 'Bills', pct: 24, color: 'var(--secondary-container)' },
  { name: 'Transport', pct: 18, color: 'var(--tertiary)' },
  { name: 'Groceries', pct: 20, color: 'var(--primary)' },
];

function Donut({ size = 56 }: { size?: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="-rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--glass-edge)" strokeWidth="14" />
      {DONUT.map((s) => {
        const len = (s.pct / 100) * c;
        const el = <circle key={s.name} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="14" strokeDasharray={`${len - 3} ${c}`} strokeDashoffset={-offset} strokeLinecap="round" />;
        offset += len;
        return el;
      })}
    </svg>
  );
}

/** The soft filled hill along the bottom of the balance card. */
function BalanceHill() {
  return (
    <svg viewBox="0 0 360 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-10 w-full opacity-75">
      <defs>
        <linearGradient id="mockHill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--primary)" stopOpacity="0.28" />
          <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 64 C40 60 70 68 110 52 C150 36 185 48 230 30 C275 12 315 28 360 8 L360 80 L0 80 Z" fill="url(#mockHill)" />
    </svg>
  );
}

export function HomeScreenMock() {
  const flows = [
    { label: 'Income this month', value: '₱ 26,000', trend: '+8.4% vs last month', tone: 'text-primary', tint: 'tint-income', badge: 'bg-primary/15', icon: ArrowIncome },
    { label: 'Spent this month', value: '₱ 9,580', trend: '-3.1% vs last month', tone: 'text-secondary', tint: 'tint-expense', badge: 'bg-secondary-container/20', icon: ArrowExpense },
  ];
  return (
    <div className="relative h-full">
      <div className="flex items-center justify-between px-4 pb-2">
        <Logo />
        <span className="glass-raised rounded-full px-2 py-0.5 text-[8px] font-medium text-primary">September 2026</span>
      </div>
      <div className="space-y-2.5 px-3.5">
        <div className="px-0.5">
          <p className="text-[13px] font-bold tracking-tight">Good afternoon, Ron 👋</p>
          <p className="text-[8px] text-on-surface-variant">Here’s your financial overview for this month.</p>
        </div>

        <div className="glass-card relative overflow-hidden rounded-2xl p-3 pb-4">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/15 blur-2xl" />
          <BalanceHill />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="text-[7px] font-semibold uppercase tracking-wider text-on-surface-variant">Total Balance</p>
              <p className="mt-0.5 text-[20px] font-extrabold tracking-tight">₱ 48,250.00</p>
            </div>
            <span className="glass-raised flex h-6 w-6 items-center justify-center rounded-lg text-primary">
              <Wallet className="h-3 w-3" />
            </span>
          </div>
          <div className="relative mt-1.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-primary/15 px-2 py-0.5 text-[8px] font-semibold text-primary">
              <ArrowUp className="h-2.5 w-2.5" /> +₱ 6,420 this month
            </span>
            <span className="text-[7px] text-on-surface-variant">Stored on device</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {flows.map(({ icon: Icon, ...c }) => (
            <div key={c.label} className={`glass-card ${c.tint} rounded-xl p-2.5`}>
              <span className={`mb-1.5 flex h-5 w-5 items-center justify-center rounded-full ${c.badge}`}>
                <Icon className={`h-3 w-3 ${c.tone}`} />
              </span>
              <p className="text-[7px] text-on-surface-variant">{c.label}</p>
              <p className="text-[11px] font-bold">{c.value}</p>
              <p className={`text-[7px] font-semibold ${c.tone}`}>{c.trend}</p>
            </div>
          ))}
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between px-0.5">
            <p className="text-[9px] font-bold">Spending Breakdown</p>
            <p className="flex items-center text-[7.5px] font-semibold text-primary">
              Reports <ChevronRight className="h-2.5 w-2.5" />
            </p>
          </div>
          <div className="glass-card flex items-center gap-3 rounded-xl p-2.5">
            <Donut />
            <div className="flex-1 space-y-1">
              {DONUT.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-[8px]">
                  <span className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="font-bold">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="glass-card flex items-center gap-2.5 rounded-xl p-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--glass-accent-badge)] text-[var(--glass-accent)]">
            <Leaf className="h-4 w-4" strokeWidth={2.2} />
          </span>
          <div className="flex-1">
            <p className="text-[9px] font-bold">Keep it going!</p>
            <p className="text-[7.5px] text-on-surface-variant">
              You’re <span className="font-semibold text-primary">₱ 2,420</span> under your monthly budget.
            </p>
          </div>
          <span className="glass-raised flex h-5 w-5 items-center justify-center rounded-full text-primary">
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

/** The unlock screen's faint leaves in its upper-left and lower-left corners. */
function CornerLeaves() {
  // Each leaf pivots at its stem: LEAF_PATH's stem is at (6,114) and its tip points up-right.
  const leaf = (transform: string) => <path d={LEAF_PATH} transform={`${transform} translate(-6 -114)`} />;
  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 252 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g fill="var(--primary)" fillOpacity="0.12">
        {leaf('translate(-12 44) rotate(80) scale(0.85)')}
        {leaf('translate(-10 530) rotate(-4) scale(0.95)')}
      </g>
      <g fill="var(--glass-accent)" fillOpacity="0.16">
        {leaf('translate(-4 150) rotate(55) scale(0.4)')}
        {leaf('translate(-4 430) rotate(-30) scale(0.45)')}
      </g>
    </svg>
  );
}

export function UnlockScreenMock() {
  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
  return (
    <div className="relative flex h-full flex-col">
      <CornerLeaves />
      <div className="relative flex items-center justify-between px-4 pb-2">
        <Logo />
        <StatusPill offline />
      </div>
      <div className="relative px-5 pt-6 text-center">
        <p className="text-[17px] font-bold tracking-tight">Welcome back, Ron</p>
        <p className="mt-1 text-[10px] text-on-surface-variant">Enter your 6-digit MPIN</p>
      </div>
      <div className="relative mt-8 flex justify-center gap-3">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i} className={`h-2.5 w-2.5 rounded-full border-2 ${i < 4 ? 'border-primary bg-primary' : 'border-outline'}`} />
        ))}
      </div>
      <div className="relative mx-auto mt-8 grid w-[200px] grid-cols-3 gap-y-3 text-center">
        {keys.map((k) => (
          <span key={k} className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-[17px] font-medium">
            {k}
          </span>
        ))}
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-primary">
          <Fingerprint className="h-5 w-5" />
        </span>
        <span className="mx-auto flex h-11 w-11 items-center justify-center text-[17px] font-medium">0</span>
        <span className="mx-auto flex h-11 w-11 items-center justify-center text-on-surface-variant">
          <Backspace className="h-4 w-4" />
        </span>
      </div>
      <div className="relative mt-auto mb-6 flex justify-between px-7 text-[9px]">
        <span className="font-semibold text-primary">Forgot MPIN?</span>
        <span className="text-on-surface-variant">Switch account</span>
      </div>
    </div>
  );
}

export function ReportsScreenMock() {
  const bars = [
    { m: 'Apr', i: 60, e: 45 },
    { m: 'May', i: 62, e: 58 },
    { m: 'Jun', i: 70, e: 52 },
    { m: 'Jul', i: 66, e: 61 },
    { m: 'Aug', i: 74, e: 49 },
    { m: 'Sep', i: 80, e: 42, now: true },
  ];
  return (
    <div className="h-full">
      {/* Full-screen page bar: back, mark, title — like the app's FormScreen. */}
      <div className="flex items-center gap-1.5 border-b border-[var(--glass-edge)] px-3.5 pb-2">
        <ArrowBack className="h-4 w-4" />
        <SpendifyMark className="h-4 text-[var(--brand-ink)]" />
        <p className="text-[12px] font-semibold tracking-tight">Reports</p>
      </div>
      <div className="space-y-2.5 px-3.5 pt-3">
        <div className="glass-card flex items-center justify-between rounded-xl px-3 py-2 text-[10px] font-bold">
          <span className="text-on-surface-variant">‹</span>September 2026<span className="text-on-surface-variant">›</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5">
          {[
            { l: 'Income', v: '₱26,000', t: 'text-primary', tint: 'tint-income' },
            { l: 'Spent', v: '₱9,580', t: 'text-secondary', tint: 'tint-expense' },
            { l: 'Net', v: '₱16,420', t: 'text-primary', tint: '' },
          ].map((s) => (
            <div key={s.l} className={`glass-card ${s.tint} rounded-lg p-2`}>
              <p className="text-[6.5px] font-medium uppercase text-on-surface-variant">{s.l}</p>
              <p className={`text-[9.5px] font-bold ${s.t}`}>{s.v}</p>
            </div>
          ))}
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="mb-2 text-[9px] font-bold">Last 6 months</p>
          <div className="flex h-24 items-end justify-between">
            {bars.map((b) => (
              <div key={b.m} className={`flex flex-col items-center gap-1 ${b.now ? '' : 'opacity-50'}`}>
                <div className="flex h-20 items-end gap-0.5">
                  <span className="w-2 rounded-sm bg-primary" style={{ height: `${b.i}%` }} />
                  <span className="w-2 rounded-sm bg-secondary" style={{ height: `${b.e}%` }} />
                </div>
                <span className="text-[7px]">{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="mb-2 flex items-center gap-1 text-[9px] font-bold">
            <PieChart className="h-3 w-3 text-primary" /> Spending by category
          </p>
          {DONUT.map((s) => (
            <div key={s.name} className="mb-1.5 flex items-center gap-1.5 text-[8px]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: s.color }} />
              <span className="flex-1">{s.name}</span>
              <span className="text-on-surface-variant">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
