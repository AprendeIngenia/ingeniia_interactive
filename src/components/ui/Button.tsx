"use client";
import * as React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
};

export default function Button({ variant="primary", size="md", className, ...props }: Props) {
  const base = "rounded-xl font-medium transition shadow-soft focus:outline-none focus:ring-2";
  const sizes = {
    sm: "text-sm px-3 py-2",
    md: "text-sm px-4 py-2.5",
    lg: "text-base px-5 py-3"
  };
  const variants = {
    primary: "bg-[var(--primary)] text-white hover:opacity-95 focus:ring-[var(--ring)]",
    ghost: "bg-transparent text-[var(--fg)] hover:bg-white/5 focus:ring-[var(--ring)]",
    outline: "bg-transparent border border-white/20 text-[var(--fg)] hover:bg-white/5 focus:ring-[var(--ring)]"
  };

  return (
    <button
      className={clsx(base, sizes[size], variants[variant], className)}
      {...props}
    />
  );
}
