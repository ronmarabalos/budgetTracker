import {
  ArrowBack,
  ArrowUp,
  Backspace,
  BarChart,
  Chat,
  ChevronLeft,
  ChevronRight,
  Eye,
  Fingerprint,
  Plus,
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
 * Recreations of real Spendify screens (sample data), built from the app's own
 * layout code and design tokens so they follow the site's light/dark theme.
 * Each screen is drawn at the app's real size (a 390-wide phone, the same px
 * values as the app's components) and scaled down into the frame.
 */

const SCREEN_W = 252; // inner width of the frame below
const SCREEN_H = 530;
const APP_W = 390;
const SCALE = SCREEN_W / APP_W;
const APP_H = Math.round(SCREEN_H / SCALE);
const TOP = 44; // status-bar inset

export function Phone({ children, label, className = '' }: { children: React.ReactNode; label: string; className?: string }) {
  return (
    <figure
      role="img"
      aria-label={label}
      className={`relative w-[272px] shrink-0 rounded-[46px] border border-surface-container-highest bg-surface-container-highest p-2.5 shadow-phone ${className}`}>
      <div className="relative overflow-hidden rounded-[38px] bg-surface" style={{ height: SCREEN_H }}>
        <div
          className="absolute left-0 top-0 origin-top-left"
          style={{ width: APP_W, height: APP_H, transform: `scale(${SCALE})` }}
          aria-hidden="true">
          {children}
        </div>
        {/* Dynamic-island style notch */}
        <div className="absolute left-1/2 top-2.5 z-10 h-6 w-24 -translate-x-1/2 rounded-full bg-black/85" aria-hidden="true" />
      </div>
    </figure>
  );
}

// ── Shared pieces (mirroring the app's components) ─────────────────────────

/** SpendifyLogo: sprout mark plus wordmark, `height` tall (wordmark at the site logo's 22:36 ratio). */
function Logo({ height, onDark, wordmark = true }: { height: number; onDark?: boolean; wordmark?: boolean }) {
  return (
    <span className={`flex items-center gap-1.5 ${onDark ? 'text-white' : 'text-[var(--brand-ink)]'}`}>
      <span style={{ height }} className="flex">
        <SpendifyMark className="h-full" onDark={onDark} />
      </span>
      {wordmark && (
        <span style={{ height: Math.round((height * 22) / 36) }} className="flex">
          <SpendifyWordmark className="h-full" onDark={onDark} />
        </span>
      )}
    </span>
  );
}

/** Translucent-white control on the hero (the app's `heroChip`). */
const heroChip = 'border border-white/25 bg-white/15 text-white';

/** HeroPanel scenery: hills, leaf sprigs (tinted primary-fixed) and sparkles. */
function Scenery() {
  const tinted = (src: string, style: React.CSSProperties) => (
    <span
      className="absolute bottom-0 bg-primary-fixed"
      style={{ ...style, maskImage: `url(${src})`, WebkitMaskImage: `url(${src})`, maskSize: '100% 100%', WebkitMaskSize: '100% 100%' }}
    />
  );
  return (
    <>
      <img src="/scenery/hero-hill-back.png" alt="" className="absolute inset-x-0 bottom-0 h-[110px] w-full" />
      {tinted('/scenery/hero-hill-front.png', { left: 0, right: 0, height: 110 })}
      {tinted('/scenery/hero-sprigs-left.png', { left: 0, width: 120, height: 110 })}
      {tinted('/scenery/hero-sprig-right.png', { right: 0, width: 120, height: 110 })}
      <img src="/scenery/hero-sparkles.png" alt="" className="absolute right-[18px] top-10 h-[140px] w-[120px]" />
    </>
  );
}

/** TabScreen hero: gradient with a soft highlight and scenery, square bottom (the sheet curves over it). */
function Hero({ children }: { children: React.ReactNode }) {
  return (
    <div className="hero-gradient relative shrink-0 overflow-hidden px-5 pb-14" style={{ paddingTop: TOP }}>
      <div className="absolute -right-[120px] -top-20 h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle_180px_at_50%_50%,rgb(255_255_255/0.18),transparent)]" />
      <Scenery />
      <div className="relative">{children}</div>
    </div>
  );
}

/** HeroSheet: the cream sheet that curves up over the hero, carrying the page backdrop. */
function Sheet({ children }: { children: React.ReactNode }) {
  return <div className="page-backdrop relative -mt-8 flex-1 rounded-t-[32px] px-5 pt-6">{children}</div>;
}

/** IconBadge: grey 15% tile with a coloured icon. */
function Badge({ icon: Icon, size, color, round }: { icon: typeof Wallet; size: number; color: string; round?: boolean }) {
  return (
    <span
      className={`flex shrink-0 items-center justify-center bg-outline/15 ${round ? 'rounded-full' : 'rounded-[12px]'}`}
      style={{ width: size, height: size, color }}>
      <Icon style={{ width: size * 0.5, height: size * 0.5 }} strokeWidth={1.8} />
    </span>
  );
}

const card = 'glass-card overflow-hidden rounded-[24px]';

/** The floating pill tab bar, Home active (soft pill behind it). */
function TabBar() {
  const tabs = [
    [TabHome, 'Home'],
    [TabTransactions, 'Transactions'],
    [TabGoals, 'Goals'],
    [User, 'Profile'],
  ] as const;
  return (
    <div className="absolute inset-x-5 bottom-4 h-16 rounded-full border border-[var(--glass-edge)] bg-surface-container shadow-card">
      <div className="flex h-full items-center justify-around px-2">
        {tabs.map(([Icon, label], i) => (
          <span key={label} className="relative flex h-12 min-w-[56px] flex-col items-center justify-center">
            {i === 0 && <span className="absolute -inset-x-2.5 inset-y-0 rounded-full bg-primary/15" />}
            <Icon className={`relative h-[22px] w-[22px] ${i === 0 ? 'text-primary' : 'text-on-surface-variant'}`} strokeWidth={i === 0 ? 2 : 1.5} />
            <span className={`relative mt-0.5 text-[11px] leading-4 tracking-wide ${i === 0 ? 'font-semibold text-primary' : 'text-on-surface-variant'}`}>
              {label}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SLICES = [
  { name: 'Food & Drinks', pct: 38, amount: '3,640.40', color: 'var(--primary)' },
  { name: 'Bills', pct: 24, amount: '2,299.20', color: 'var(--tertiary-container)' },
  { name: 'Groceries', pct: 20, amount: '1,916.00', color: 'var(--on-surface)' },
  { name: 'Transport', pct: 18, amount: '1,724.40', color: 'var(--secondary)' },
];

/** SpendingDonut: 128px ring with the month's total in the centre. */
function Donut({ total }: { total: string }) {
  const r = 46;
  const c = 2 * Math.PI * r;
  let start = 0;
  return (
    <div className="relative flex h-32 w-32 shrink-0 items-center justify-center">
      <svg viewBox="0 0 120 120" className="absolute inset-0 -rotate-90">
        <circle cx="60" cy="60" r={r} fill="none" stroke="var(--surface-container-high)" strokeWidth="14" />
        {SLICES.map((s) => {
          const len = (s.pct / 100) * c;
          const el = <circle key={s.name} cx="60" cy="60" r={r} fill="none" stroke={s.color} strokeWidth="14" strokeLinecap="round" strokeDasharray={`${len} ${c}`} strokeDashoffset={-start} />;
          start += len;
          return el;
        })}
      </svg>
      <span className="relative text-center">
        <span className="block text-[17px] font-extrabold leading-[18px]">₱{total}</span>
        <span className="mt-1 block text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">spent</span>
      </span>
    </div>
  );
}

// ── Home ───────────────────────────────────────────────────────────────────

export function HomeScreenMock() {
  const flows = [
    { label: 'Income', value: '₱ 26,000.00', trend: '+8.4% vs last month', color: 'var(--success)', tint: 'tint-income', icon: TrendUp },
    { label: 'Spent', value: '₱ 9,580.00', trend: '-3.1% vs last month', color: 'var(--secondary)', tint: 'tint-expense', icon: TrendDown },
  ];
  return (
    <div className="relative flex h-full flex-col">
      <Hero>
        <div className="flex h-14 items-center justify-between">
          <Logo height={28} onDark />
          <span className={`rounded-full px-3 py-1.5 text-[12px] font-medium ${heroChip}`}>Nov 20</span>
        </div>
        <p className="mt-3 text-[22px] font-bold leading-7 tracking-tight text-white">Good afternoon, Ron 👋</p>
        {/* OllieCard */}
        <div className="relative mt-3 flex items-end">
          <div className={`absolute inset-x-0 bottom-0 h-3/5 rounded-[24px] ${heroChip}`} />
          <img src="/ollie-happy.webp" alt="" className="relative h-[150px] w-[120px] object-contain" />
          <div className={`${card} relative mb-4 mr-3 flex-1 p-3.5 text-on-surface`}>
            <p className="text-[13px] font-bold text-primary">Ollie</p>
            <p className="mt-0.5 text-[13px] leading-[19px] text-on-surface-variant">
              So far this looks like a <span className="font-semibold">Grocery run week</span>.
            </p>
            <p className="mt-2 flex items-center gap-1 text-[13px] font-semibold text-primary">
              <Chat className="h-4 w-4" /> Chat with Ollie
            </p>
          </div>
        </div>
      </Hero>

      <Sheet>
        {/* BalanceCard */}
        <div className={`${card} relative p-5 pb-8`}>
          <div className="absolute -right-[60px] -top-[60px] h-[220px] w-[220px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--primary)_16%,transparent),transparent_70%)]" />
          <svg viewBox="0 0 360 80" preserveAspectRatio="none" className="absolute inset-x-0 bottom-0 h-16 w-full opacity-75">
            <defs>
              <linearGradient id="mock-wave" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="var(--primary)" stopOpacity="0.28" />
                <stop offset="1" stopColor="var(--primary)" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0 64 C40 60 70 68 110 52 C150 36 185 48 230 30 C275 12 315 28 360 8 L360 80 L0 80 Z" fill="url(#mock-wave)" />
          </svg>
          <div className="relative flex items-center justify-between">
            <span className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-on-surface-variant">Total Balance</span>
              <Eye className="h-5 w-5 text-on-surface-variant" />
            </span>
            <Badge icon={Wallet} size={40} color="var(--primary)" />
          </div>
          <p className="relative mt-2 text-[34px] font-extrabold leading-10 tracking-tight">₱ 48,250.00</p>
          <div className="relative mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1.5 rounded-full bg-success/15 px-3 py-1 text-[12px] font-semibold text-success">
              <ArrowUp className="h-4 w-4" /> +₱ 6,420.00 this month
            </span>
            <span className="text-[11px] text-on-surface-variant">Stored on device</span>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <span className="hero-button flex h-12 flex-1 items-center justify-center gap-2 rounded-full text-[15px] font-semibold shadow-card">
            <Plus className="h-5 w-5" /> Add
          </span>
          <span className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-outline-variant bg-surface-container text-[15px] font-semibold">
            <BarChart className="h-5 w-5" /> Reports
          </span>
        </div>

        <div className="mt-4 flex gap-3.5">
          {flows.map(({ icon, ...f }) => (
            <div key={f.label} className={`${card} ${f.tint} flex-1 px-4 py-3`}>
              <div className="mb-1.5 flex items-center gap-2">
                <Badge icon={icon} size={32} color={f.color} />
                <span className="text-[12px] font-medium text-on-surface-variant">{f.label}</span>
              </div>
              <p className="text-[18px] font-bold leading-6 tracking-tight">{f.value}</p>
              <p className="mt-1 flex items-center gap-1 text-[11px] font-semibold" style={{ color: f.color }}>
                {icon === TrendUp ? <TrendUp className="h-4 w-4" /> : <TrendDown className="h-4 w-4" />}
                {f.trend}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[17px] font-bold">Spending Breakdown</p>
            <p className="flex items-center text-[13px] font-semibold text-primary">
              Reports <ChevronRight className="h-4 w-4" />
            </p>
          </div>
          <div className={`${card} flex items-center gap-3 p-4`}>
            <Donut total="9,580" />
            <div className="flex-1 space-y-2.5 pl-1">
              {SLICES.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <span className="flex items-center gap-2 text-[13px] font-medium">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                    {s.name}
                  </span>
                  <span className="text-[12px] font-bold">{s.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Sheet>
      <TabBar />
    </div>
  );
}

// ── Unlock (PinScreen) ─────────────────────────────────────────────────────

export function UnlockScreenMock() {
  const letters: Record<string, string> = { 2: 'ABC', 3: 'DEF', 4: 'GHI', 5: 'JKL', 6: 'MNO', 7: 'PQRS', 8: 'TUV', 9: 'WXYZ' };
  const KEY = 78; // keySize on a 390-wide phone
  const GAP = 33;
  const digit = (k: string) => (
    <span
      key={k}
      className="flex flex-col items-center justify-center rounded-full border border-outline-variant/70 bg-surface-container"
      style={{ width: KEY, height: KEY }}>
      <span className="font-medium leading-none" style={{ fontSize: KEY * 0.36 }}>{k}</span>
      {letters[k] && <span className="mt-0.5 text-[11px] font-semibold leading-4 tracking-[2px] text-on-surface-variant">{letters[k]}</span>}
    </span>
  );
  const plain = (children: React.ReactNode) => (
    <span className="flex items-center justify-center text-on-surface" style={{ width: KEY, height: KEY }}>
      {children}
    </span>
  );
  const row = (keys: React.ReactNode[], i: number) => (
    <div key={i} className="flex" style={{ columnGap: GAP }}>
      {keys}
    </div>
  );
  return (
    <div className="page-backdrop flex h-full flex-col" style={{ paddingTop: TOP + 8, paddingBottom: 16 }}>
      <div className="flex h-12 items-center justify-between px-5">
        <Logo height={30} />
        <span className="flex items-center gap-1.5 rounded-full bg-surface-container-high px-2.5 py-1 text-[11px] font-semibold text-on-surface-variant">
          <span className="h-2 w-2 rounded-full bg-outline" /> Offline
        </span>
      </div>
      <div className="flex flex-1 flex-col items-center justify-center px-8">
        <p className="text-center text-[22px] font-bold leading-7 tracking-tight">Welcome back, Ron</p>
        <p className="mt-1.5 text-center text-[15px] leading-5 text-on-surface-variant">Enter your 6-digit MPIN</p>
        <div className="mt-7 flex items-center" style={{ columnGap: 20 }}>
          {Array.from({ length: 6 }, (_, i) => (
            <span
              key={i}
              className={`h-4 w-4 rounded-full border-2 ${i < 4 ? 'border-primary bg-primary' : 'border-outline bg-surface-container-highest'}`}
            />
          ))}
        </div>
        <div className="mt-4 h-10" />
      </div>
      <div className="flex flex-col items-center" style={{ rowGap: Math.round(GAP * 0.55) }}>
        {[['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9']].map((r, i) => row(r.map(digit), i))}
        {row([plain(<Fingerprint key="f" className="h-8 w-8" />), digit('0'), plain(<Backspace key="b" className="h-7 w-7" />)], 3)}
      </div>
      <div className="mt-4 flex h-10 items-center justify-between px-8 text-[15px]">
        <span className="font-semibold text-primary">Forgot MPIN?</span>
        <span className="font-medium text-on-surface-variant">Switch account</span>
      </div>
    </div>
  );
}

// ── Reports (StackScreen) ──────────────────────────────────────────────────

export function ReportsScreenMock() {
  const bars = [
    { m: 'Jun', i: 70, e: 52 },
    { m: 'Jul', i: 66, e: 61 },
    { m: 'Aug', i: 74, e: 49 },
    { m: 'Sep', i: 62, e: 58 },
    { m: 'Oct', i: 78, e: 55 },
    { m: 'Nov', i: 100, e: 37, now: true },
  ];
  const H = 120;
  return (
    <div className="page-backdrop h-full" style={{ paddingTop: TOP }}>
      <div className="flex h-16 items-center gap-2 px-5">
        <span className="glass-raised flex h-11 w-11 items-center justify-center rounded-full">
          <ArrowBack className="h-6 w-6" />
        </span>
        <p className="ml-1 flex-1 text-[22px] font-semibold tracking-tight">Reports</p>
        <Logo height={30} wordmark={false} />
      </div>
      <div className="px-5 pt-4">
        <div className="mb-4 flex items-center justify-between rounded-[24px] border border-outline-variant/70 bg-surface-container p-2">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-outline/15">
            <ChevronLeft className="h-6 w-6" />
          </span>
          <span className="text-[17px] font-bold">November 2026</span>
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-outline/15 opacity-30">
            <ChevronRight className="h-6 w-6" />
          </span>
        </div>

        <div className="mb-4 flex gap-2">
          {[
            { l: 'Income', v: '₱26,000.00', c: 'text-success' },
            { l: 'Spent', v: '₱9,580.00', c: 'text-secondary' },
            { l: 'Net', v: '₱16,420.00', c: 'text-success' },
          ].map((s) => (
            <div key={s.l} className={`${card} flex-1 p-3`}>
              <p className="text-[11px] font-medium uppercase text-on-surface-variant">{s.l}</p>
              {/* The app shrinks these to fit (adjustsFontSizeToFit); 13px is what a 10-character amount fits at. */}
              <p className={`mt-1 whitespace-nowrap text-[13px] font-bold leading-[22px] tracking-tight ${s.c}`}>{s.v}</p>
            </div>
          ))}
        </div>

        <div className={`${card} mb-4 p-4`}>
          <p className="mb-3 text-[15px] font-bold">Last 6 months</p>
          <div className="flex items-end justify-between">
            {bars.map((b) => (
              <div key={b.m} className="flex flex-col items-center" style={{ opacity: b.now ? 1 : 0.45 }}>
                <div className="flex items-end gap-1" style={{ height: H }}>
                  <span className="w-2.5 rounded-[3px] bg-success" style={{ height: (b.i / 100) * H }} />
                  <span className="w-2.5 rounded-[3px] bg-secondary" style={{ height: (b.e / 100) * H }} />
                </div>
                <span className={`mt-1.5 text-[11px] ${b.now ? 'font-bold' : 'text-on-surface-variant'}`}>{b.m}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-center gap-4 text-[11px] text-on-surface-variant">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-primary" /> Income</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-secondary" /> Spent</span>
          </div>
        </div>

        <div className={`${card} p-4`}>
          <p className="mb-3 text-[15px] font-bold">Spending by category</p>
          <div className="mb-4 flex justify-center">
            <Donut total="9,580" />
          </div>
          <div className="space-y-3">
            {SLICES.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                <span className="flex-1 text-[13px] font-medium">{s.name}</span>
                <span className="text-[12px] text-on-surface-variant">{s.pct}%</span>
                <span className="w-[92px] text-right text-[13px] font-semibold">₱{s.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
