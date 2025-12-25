import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { ToasterProvider } from "@/lib/providers/ToasterProvider";
import { SessionProviderWrapper } from "@/lib/providers/SessionProviderWrapper";
import { ThemeProvider } from "@/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Day Book",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js" suppressHydrationWarning>
      <head>
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const theme = localStorage.getItem('theme');
                  const html = document.documentElement;
                  
                  if (!theme || (theme !== 'light' && theme !== 'dark')) {
                    localStorage.setItem('theme', 'light');
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                  } else if (theme === 'dark') {
                    html.classList.add('dark');
                    html.style.colorScheme = 'dark';
                  } else {
                    html.classList.remove('dark');
                    html.style.colorScheme = 'light';
                  }
                } catch (e) {
                  const html = document.documentElement;
                  html.classList.remove('dark');
                  html.style.colorScheme = 'light';
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        {/** set providers */}
        <ThemeProvider>
          <SessionProviderWrapper>
            <ToasterProvider />
            {children}
          </SessionProviderWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
