import type { Metadata } from "next";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const fira_code = Fira_Code({
  subsets: ["latin"],
  variable: "--font-pt-serif",
});

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://scaffold.alhameen.xyz";

export const metadata: Metadata = {
  title: "Scaffold - Share Code Samples & Templates",
  description:
    "A simple tool for quickly sharing code samples and project templates with proper context. Create file trees, add code snippets, and share with a link.",
  metadataBase: new URL(BASE_URL),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Scaffold - Share Code Samples & Templates",
    description:
      "A simple tool for quickly sharing code samples and project templates with proper context.",
    type: "website",
    url: BASE_URL,
    siteName: "Scaffold",
    locale: "en_US",
    images: [
      {
        url: `${BASE_URL}/og.png`,
        width: 1200,
        height: 630,
        alt: "Scaffold - Share code samples and templates",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Scaffold - Share Code Samples & Templates",
    description: "Quickly share code samples and project templates with proper context",
    images: [`${BASE_URL}/og.png`],
    creator: "@xylogeist_",
  },
  keywords: [
    "code sharing",
    "scaffold",
    "code templates",
    "file tree",
    "code snippets",
    "project structure",
    "developer tools",
    "boilerplate",
    "code context",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${fira_code.className} dark  antialiased`}>
        {children} <Toaster />
      </body>
    </html>
  );
}
