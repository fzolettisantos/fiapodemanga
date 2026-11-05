export function SkipLink({ label }: { label: string }) {
  return (
    <a
      href="#conteudo"
      className="sr-only z-[60] rounded-full bg-accent-fill px-5 py-3 font-medium text-ink focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
    >
      {label}
    </a>
  );
}
