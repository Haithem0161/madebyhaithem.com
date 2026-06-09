"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-svh bg-background text-foreground flex flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
        <p className="max-w-md text-muted-foreground">
          An unexpected error occurred. Please try again.
        </p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted"
        >
          Retry
        </button>
      </body>
    </html>
  );
}
