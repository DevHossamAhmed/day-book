import type { Metadata } from "next";
import "./globals.css";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { SessionProviderWrapper } from "@/lib/providers/SessionProviderWrapper";

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
      <body>
        {/** set providers */}
        <SessionProviderWrapper>
          <ToasterProvider />
          {children}
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
