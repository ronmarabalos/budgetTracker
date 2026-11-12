import { APP_NAME } from '../config';
import { WORDMARK } from './wordmark';

/**
 * The Spendify “S” sprout mark. Two image files (full colour / cream) swap with
 * the theme via CSS (`.brand-on-light` / `.brand-on-dark` in styles.css). Images
 * rather than inline SVG, so their gradient ids can't collide on the page.
 */
export function SpendifyMark({ className = 'h-9', onDark }: { className?: string; /** Always the cream mark (on the hero gradient). */ onDark?: boolean }) {
  return (
    <span className={`inline-flex shrink-0 ${className}`} aria-hidden="true">
      {onDark ? (
        <img src="/brand/mark-dark.svg" alt="" className="h-full w-auto" />
      ) : (
        <>
          <img src="/brand/mark.svg" alt="" className="brand-on-light h-full w-auto" />
          <img src="/brand/mark-dark.svg" alt="" className="brand-on-dark h-full w-auto" />
        </>
      )}
    </span>
  );
}

/** “Spendify” wordmark with the leaf-dotted i; the letters follow the text colour. */
export function SpendifyWordmark({ className = 'h-6', onDark }: { className?: string; onDark?: boolean }) {
  return (
    <svg viewBox={WORDMARK.viewBox} className={`w-auto ${className}`} aria-hidden="true">
      <path d={WORDMARK.text} fill="currentColor" />
      <path d={WORDMARK.leaf} className={onDark ? 'fill-[#FFB899]' : 'fill-primary'} />
    </svg>
  );
}

export function Logo({ href = '/' }: { href?: string }) {
  return (
    <a href={href} className="flex items-center gap-2 text-[var(--brand-ink)]" aria-label={`${APP_NAME} home`}>
      <SpendifyMark />
      <SpendifyWordmark className="h-[22px]" />
    </a>
  );
}
