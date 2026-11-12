/** Fixed page background matching the app's GlassBackdrop: a warm-grey wash with a faint ember glow. */
export function PageBackdrop() {
  return <div className="page-backdrop pointer-events-none fixed inset-0 -z-10" aria-hidden="true" />;
}
