import {
  ArrowBack,
  ArrowUp,
  Backspace,
  Chat,
  ChevronRight,
  Fingerprint,
  Leaf,
  Plus,
  PieChart,
  TabGoals,
  TabHome,
  TabTransactions,
  TrendDown,
  TrendUp,
  User,
  Wallet,
} from './icons';
import { SpendifyMark, SpendifyWordmark } from './Brand';

/*
 * Illustrative recreations of real Spendify screens (sample data), built
 * from the app's design tokens so they follow the site's light/dark theme:
 * an ember gradient hero panel on top, clean cards on the warm-grey page below.
 */

export function Phone({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[272px] shrink-0 rounded-[46px] border border-surface-container-highest bg-surface-container-highest p-2.5 shadow-phone ${className}`}>
      <div className="page-backdrop relative h-[560px] overflow-hidden rounded-[38px]">
        {/* Dynamic-island style notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/85" aria-hidden="true" />
        <div className="relative h-full" aria-hidden="true">
          {children}
        </div>
      </div>
    </figure>
  );
}

/** The light logo, as on the app's hero panels. */
function Logo() {
  return (
    <span className="flex items-center gap-1 text-white">
      <SpendifyMark className="h-5" onDark />
      <SpendifyWordmark className="h-[11px]" onDark />
    </span>
  );
}

/** Translucent-white control on the hero (the app's `heroChip`). */
const heroChip = 'border border-white/25 bg-white/15 text-white';

/** The app's HeroPanel: the brand gradient with rounded bottom corners and a soft highlight. */
function Hero({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`hero-gradient relative overflow-hidden rounded-b-[26px] px-4 pt-10 pb-4 ${className}`}>
      <div className="absolute -right-16 -top-12 h-44 w-44 rounded-full bg-[radial-gradient(circle,rgb(255_255_255/0.18),transparent_70%)]" />
      <div className="relative">{children}</div>
    </div>
  );
}

/** The app's floating icon-only tab pill: a dark circle marks the active tab. */
function TabBar() {
  const tabs = [TabHome, TabTransactions, TabGoals, User];
  return (
    <div className="glass-card absolute inset-x-0 bottom-3 mx-auto flex h-10 w-[184px] items-center justify-between rounded-full px-1.5">
      {tabs.map((Icon, i) => (
        <span
          key={i}
          className={`flex h-8 w-8 items-center justify-center rounded-full ${i === 0 ? 'bg-on-surface text-surface' : 'text-on-surface-variant'}`}>
          <Icon className="h-4 w-4" strokeWidth={i === 0 ? 2 : 1.5} />
        </span>
      ))}
    </div>
  );
}

/** Grey 15% tile with an ink icon — the app's IconBadge. */
function IconTile({ icon: Icon, className = '' }: { icon: typeof Wallet; className?: string }) {
  return (
    <span className={`flex items-center justify-center rounded-lg bg-outline/15 text-on-surface ${className}`}>
      <Icon className="h-3 w-3" strokeWidth={2} />
    </span>
  );
}

const DONUT = [
  { name: 'Food & Drinks', pct: 38, color: 'var(--primary)' },
  { name: 'Bills', pct: 24, color: 'var(--tertiary-container)' },
  { name: 'Transport', pct: 18, color: 'var(--secondary)' },
  { name: 'Groceries', pct: 20, color: 'var(--on-surface)' },
];

function Donut({ size = 56 }: { size?: number }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  let offset = 0;
  return (
    <svg viewBox="0 0 120 120" width={size} height={size} className="-rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-container-high)" strokeWidth="14" />
      {DONUT.map((s) => {
        const len = (s.pct / 100) * c;
        const el = <circle key={s.name} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="14" strokeDasharray={`${len - 3} ${c}`} strokeDashoffset={-offset} strokeLinecap="round" />;
        offset += len;
        return el;
      })}
    </svg>
  );
}

export function HomeScreenMock() {
  const flows = [
    { label: 'Income', value: '₱ 26,000.00', trend: '+8.4% vs last month', tone: 'text-success', tint: 'tint-income', icon: TrendUp },
    { label: 'Spent', value: '₱ 9,580.00', trend: '-3.1% vs last month', tone: 'text-secondary', tint: 'tint-expense', icon: TrendDown },
  ];
  return (
    <div className="relative h-full">
      <Hero className="pb-3">
        <div className="flex items-center justify-between">
          <Logo />
          <span className={`rounded-full px-2 py-0.5 text-[8px] font-medium ${heroChip}`}>September 2026</span>
        </div>
        <p className="mt-2 text-[14px] font-bold tracking-tight">Good afternoon, Ron 👋</p>
        {/* Ollie the Otter with his message, as on the app's Home. */}
        <div className="relative mt-1 flex items-end">
          <div className={`absolute inset-x-0 bottom-0 h-3/5 rounded-xl ${heroChip}`} />
          <img src="/ollie-happy.webp" alt="" width={64} height={66} className="relative h-[66px] w-16 object-contain" />
          <div className="glass-card relative mb-2 mr-2 flex-1 rounded-xl p-2 text-on-surface">
            <p className="text-[8px] font-bold text-primary">Ollie</p>
            <p className="mt-0.5 text-[7.5px] leading-[10px] text-on-surface-variant">You’re on track this week. Nice saving on food!</p>
            <p className="mt-1 flex items-center gap-0.5 text-[7.5px] font-semibold text-primary">
              <Chat className="h-2.5 w-2.5 text-on-surface" /> Chat with Ollie
            </p>
          </div>
        </div>
      </Hero>
      <div className="space-y-2.5 px-3.5 pt-3">
        <div className="glass-card relative overflow-hidden rounded-xl p-3">
          <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_70%)]" />
          <div className="relative flex items-center justify-between">
            <p className="text-[7px] font-semibold uppercase tracking-wider text-on-surface-variant">Total Balance</p>
            <IconTile icon={Wallet} className="h-6 w-6" />
          </div>
          <p className="relative mt-0.5 text-[20px] font-extrabold tracking-tight">₱ 48,250.00</p>
          <div className="relative mt-1.5 flex items-center justify-between">
            <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[7.5px] font-semibold text-success">
              <ArrowUp className="h-2.5 w-2.5 text-on-surface" /> +₱ 6,420.00 this month
            </span>
            <span className="text-[6.5px] text-on-surface-variant">Stored on device</span>
          </div>
        </div>

        <div className="flex gap-2">
          <span className="hero-button flex h-7 flex-1 items-center justify-center gap-1 rounded-full text-[8.5px] font-semibold text-white">
            <Plus className="h-3 w-3" /> Add
          </span>
          <span className="glass-card flex h-7 flex-1 items-center justify-center gap-1 rounded-full text-[8.5px] font-semibold">
            <PieChart className="h-3 w-3" /> Reports
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {flows.map(({ icon, ...c }) => (
            <div key={c.label} className={`glass-card ${c.tint} rounded-xl px-2.5 py-2`}>
              <div className="mb-1 flex items-center gap-1.5">
                <IconTile icon={icon} className="h-5 w-5" />
                <p className="text-[7.5px] font-medium text-on-surface-variant">{c.label}</p>
              </div>
              <p className="text-[11px] font-bold tracking-tight">{c.value}</p>
              <p className={`mt-0.5 flex items-center gap-0.5 text-[6.5px] font-semibold ${c.tone}`}>{c.trend}</p>
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
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-outline/15 text-on-surface">
            <Leaf className="h-4 w-4" strokeWidth={2} />
          </span>
          <div className="flex-1">
            <p className="text-[9px] font-bold">Keep it going!</p>
            <p className="text-[7.5px] text-on-surface-variant">
              You’re <span className="font-semibold text-primary">₱ 2,420</span> under your monthly budget.
            </p>
          </div>
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-outline/15 text-on-surface">
            <ChevronRight className="h-3 w-3" />
          </span>
        </div>
      </div>
      <TabBar />
    </div>
  );
}

export function UnlockScreenMock() {
  const letters: Record<string, string> = { 2: 'ABC', 3: 'DEF', 4: 'GHI', 5: 'JKL', 6: 'MNO', 7: 'PQRS', 8: 'TUV', 9: 'WXYZ' };
  const digit = (k: string) => (
    <span
      key={k}
      className="mx-auto flex h-11 w-11 flex-col items-center justify-center rounded-full border border-outline-variant/70 bg-surface-container">
      <span className="text-[15px] font-medium leading-none">{k}</span>
      {letters[k] && <span className="mt-0.5 text-[5.5px] font-semibold tracking-[1px] text-on-surface-variant">{letters[k]}</span>}
    </span>
  );
  // The app's PinScreen: brand mark + network badge, centred title and dots, keypad within thumb reach.
  return (
    <div className="relative flex h-full flex-col pt-10 pb-4">
      <div className="flex items-center justify-between px-4">
        <SpendifyMark className="h-5 text-[var(--brand-ink)]" />
        <span className="flex items-center gap-1 rounded-full bg-outline/15 px-2 py-0.5 text-[8px] font-semibold text-on-surface-variant">
          <span className="h-1.5 w-1.5 rounded-full bg-outline" /> Offline
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-6">
        <p className="text-[15px] font-bold tracking-tight">Welcome back, Ron</p>
        <p className="mt-1 text-[9.5px] text-on-surface-variant">Enter your 6-digit MPIN</p>
        <div className="mt-5 flex gap-3">
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={`h-2.5 w-2.5 rounded-full border-2 ${i < 4 ? 'border-primary bg-primary' : 'border-outline bg-surface-container-highest'}`}
            />
          ))}
        </div>
      </div>
      <div className="mx-auto grid w-[176px] grid-cols-3 gap-y-2.5">
        {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(digit)}
        <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full text-on-surface">
          <Fingerprint className="h-5 w-5" />
        </span>
        {digit('0')}
        <span className="mx-auto flex h-11 w-11 items-center justify-center text-on-surface">
          <Backspace className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 flex justify-between px-7 text-[9px]">
        <span className="font-semibold text-primary">Forgot MPIN?</span>
        <span className="font-medium text-on-surface-variant">Switch account</span>
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
    <div className="h-full pt-10">
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
            { l: 'Income', v: '₱26,000', t: 'text-success', tint: 'tint-income' },
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
                  <span className="w-2 rounded-sm bg-success" style={{ height: `${b.i}%` }} />
                  <span className="w-2 rounded-sm bg-primary" style={{ height: `${b.e}%` }} />
                </div>
                <span className="text-[7px]">{b.m}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="glass-card rounded-xl p-3">
          <p className="mb-2 flex items-center gap-1 text-[9px] font-bold">
            <PieChart className="h-3 w-3 text-on-surface" /> Spending by category
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
