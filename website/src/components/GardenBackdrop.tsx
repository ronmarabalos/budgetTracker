/** The app's leaf shape (stem bottom-left, tip top-right) in a 120×120 box — see mobile CornerLeaves. */
export const LEAF_PATH = 'M6 114 C 10 52, 54 10, 114 6 C 116 66, 72 112, 6 114 Z';

/** Soft out-of-focus leaves, positioned in a 400×860 portrait box. */
export function GardenLeaves({ blur = true }: { blur?: boolean }) {
  const cls = `garden-leaf ${blur ? 'garden-leaf-blur' : ''}`;
  return (
    <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 860" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className={cls} d={LEAF_PATH} transform="translate(318 190) rotate(-20) scale(1.25)" />
      <path className={cls} d={LEAF_PATH} transform="translate(-40 660) rotate(-8) scale(1.5)" />
      <path className={cls} d={LEAF_PATH} transform="translate(-30 740) rotate(28) scale(1.1)" />
    </svg>
  );
}

/**
 * Fixed page background matching the app: a blurred garden (sage and cream in
 * light mode, a deep forest glow in dark) that the glass cards float over.
 */
export function GardenBackdrop() {
  return (
    <div className="garden pointer-events-none fixed inset-0 -z-10" aria-hidden="true">
      <GardenLeaves />
    </div>
  );
}
