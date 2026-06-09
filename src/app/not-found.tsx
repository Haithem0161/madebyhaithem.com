import Link from "next/link";

export default function NotFound() {
  return (
    <html lang="en">
      <body className="min-h-svh bg-background text-foreground flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-7xl font-semibold tracking-tight">404</p>
        <p className="max-w-md text-muted-foreground">
          We couldn’t find the page you were looking for.
        </p>
        <Link href="/" className="underline underline-offset-4">
          Back to home
        </Link>
      </body>
    </html>
  );
}
