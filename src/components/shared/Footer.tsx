export default function Footer() {
    return (
      <footer className="mt-16 border-t border-white/10">
        <div className="container py-10 text-sm text-[var(--muted)]">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} ingeniia — educación gratuita en deep learning.</p>
            <p>
              Hecho con rigor, café y early-stopping. {/* humor leve */}
            </p>
          </div>
        </div>
      </footer>
    );
  }
  