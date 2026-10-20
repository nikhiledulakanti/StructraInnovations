export function Arrow({ className = "btn-arrow" }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M16 2 28 9v14l-12 7L4 23V9z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M16 9.5 22 13v6l-6 3.5-6-3.5v-6z" fill="#b9a6ff" />
    </svg>
  );
}
