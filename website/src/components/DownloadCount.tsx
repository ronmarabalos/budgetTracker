import { useEffect, useState } from 'react';

import { downloads } from '../config';
import { Download } from './icons';

/** `owner/repo` when the APK is a GitHub Release asset, else null (no count available). */
const GITHUB_REPO = downloads.android.apk?.match(/^https:\/\/github\.com\/([^/]+\/[^/]+)\/releases\//)?.[1] ?? null;
const CACHE_KEY = 'spendify-apk-downloads';
const CACHE_MS = 10 * 60 * 1000;

/**
 * Total APK downloads across every GitHub Release. Fetched in the browser (the
 * site is static) and cached for a few minutes, since GitHub's public API
 * allows 60 requests an hour per visitor.
 */
async function fetchDownloadCount(repo: string): Promise<number | null> {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? 'null') as { count: number; at: number } | null;
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.count;
  } catch {
    // Storage unavailable (private mode, blocked): just fetch.
  }
  const res = await fetch(`https://api.github.com/repos/${repo}/releases?per_page=100`, {
    headers: { Accept: 'application/vnd.github+json' },
  });
  if (!res.ok) return null;
  const releases = (await res.json()) as { assets: { name: string; download_count: number }[] }[];
  const count = releases
    .flatMap((r) => r.assets)
    .filter((a) => a.name.toLowerCase().endsWith('.apk'))
    .reduce((sum, a) => sum + a.download_count, 0);
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ count, at: Date.now() }));
  } catch {
    // Ignore: the count still shows, it just isn't cached.
  }
  return count;
}

export function useDownloadCount() {
  const [count, setCount] = useState<number | null>(null);
  useEffect(() => {
    if (!GITHUB_REPO) return;
    let cancelled = false;
    fetchDownloadCount(GITHUB_REPO)
      .then((n) => {
        if (!cancelled) setCount(n);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);
  return count;
}

/** “1,234 downloads” — hidden until the count loads, and if it can't be fetched or is zero. */
export function DownloadCount({ className = '' }: { className?: string }) {
  const count = useDownloadCount();
  if (!count) return null;
  return (
    <p className={`inline-flex items-center gap-1.5 text-sm text-on-surface-variant ${className}`}>
      <Download className="h-4 w-4 text-primary" aria-hidden="true" />
      <span>
        <span className="font-semibold text-on-surface">{new Intl.NumberFormat('en-US').format(count)}</span>{' '}
        {count === 1 ? 'download' : 'downloads'}
      </span>
    </p>
  );
}
