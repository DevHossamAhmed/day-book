import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Day Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <body>{children}</body>
    </html>
  );
}
