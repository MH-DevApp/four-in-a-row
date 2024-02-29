import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Four In A Row",
  description: "A simple game of Four In A Row",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
