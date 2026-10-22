import { downloads, type Platform } from '../config';
import { AndroidLogo, AppleLogo, Download, PlayStoreLogo } from './icons';

type BadgeProps = {
  href: string | null;
  logo: React.ReactNode;
  overline: string;
  title: string;
  /** Shown instead of the store name while no link is configured. */
  pendingLabel: string;
};

/** Store badge. With no link it renders a non-interactive “Coming soon” badge, never a dead link. */
function StoreBadge({ href, logo, overline, title, pendingLabel }: BadgeProps) {
  const base =
    'inline-flex h-14 min-w-[190px] items-center gap-3 rounded-xl border px-4 text-left transition';
  const content = (
    <>
      {logo}
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] opacity-80">{href ? overline : pendingLabel}</span>
        <span className="text-[18px] font-semibold tracking-tight">{title}</span>
      </span>
    </>
  );
  if (!href) {
    return (
      <span
        className={`${base} glass-raised cursor-default text-on-surface-variant`}
        aria-label={`${title} — ${pendingLabel.toLowerCase()}`}>
        {content}
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`${base} border-white/15 bg-black text-white shadow-card hover:-translate-y-0.5 hover:bg-neutral-900`}>
      {content}
    </a>
  );
}

export function AppStoreBadge() {
  const { appStore, testFlight } = downloads.ios;
  if (!appStore && testFlight) {
    return <StoreBadge href={testFlight} logo={<AppleLogo className="h-7 w-7" />} overline="Join the beta on" title="TestFlight" pendingLabel="" />;
  }
  return <StoreBadge href={appStore} logo={<AppleLogo className="h-7 w-7" />} overline="Download on the" title="App Store" pendingLabel="Coming soon to the" />;
}

export function PlayStoreBadge() {
  return (
    <StoreBadge href={downloads.android.playStore} logo={<PlayStoreLogo className="h-6 w-6" />} overline="Get it on" title="Google Play" pendingLabel="Coming soon to" />
  );
}

/** Primary button for installing the Android APK directly (outside Google Play), with version and size. */
export function ApkButton({ className = '' }: { className?: string }) {
  const { apk, apkSize } = downloads.android;
  if (!apk) return null;
  const details = [downloads.version && `Version ${downloads.version}`, apkSize, 'APK'].filter(Boolean).join(' · ');
  return (
    <a
      href={apk}
      className={`group inline-flex h-14 items-center gap-3 rounded-xl bg-primary-container px-5 text-on-primary-container shadow-card transition hover:-translate-y-0.5 hover:brightness-110 ${className}`}>
      <AndroidLogo className="h-6 w-6" />
      <span className="flex flex-col text-left leading-tight">
        <span className="text-[16px] font-bold tracking-tight">Download for Android</span>
        <span className="text-[11px] opacity-80">{details}</span>
      </span>
      <Download className="ml-1 h-5 w-5 transition group-hover:translate-y-0.5" />
    </a>
  );
}

/** Both badges, with the visitor's platform first. */
export function StoreButtons({ platform, className = '' }: { platform: Platform; className?: string }) {
  const badges = platform === 'android' ? [<PlayStoreBadge key="p" />, <AppStoreBadge key="a" />] : [<AppStoreBadge key="a" />, <PlayStoreBadge key="p" />];
  return <div className={`flex flex-wrap gap-3 ${className}`}>{badges}</div>;
}
