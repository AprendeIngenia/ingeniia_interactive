import Link from "next/link";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[var(--primary)] to-[var(--accent)]" />
          <span className="font-semibold tracking-tight">ingeniia</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm text-[var(--muted)]">
          <Link href="/mlp" className="hover:text-white">MLP</Link>
          <Link href="/cnn" className="hover:text-white">CNN</Link>
          <Link href="/rnn" className="hover:text-white">RNN/LSTM</Link>
          <Link href="/transformers" className="hover:text-white">Transformers</Link>
          <Link href="/diffusion" className="hover:text-white">Diffusion</Link>
        </nav>
      </div>
    </header>
  );
}
