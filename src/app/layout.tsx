import Head from "next/head";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="mdl-js">
      <Head>
        <title>Day Book</title>
      </Head>
      <body>{children}</body>
    </html>
  );
}
