import type { Metadata } from "next";
import { Fira_Code, Nunito, PT_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const pt_serif = Fira_Code({
  subsets: ["latin"],
  // weight: ["400", "700"],
  variable: "--font-pt-serif",
});

export const metadata: Metadata = {
  title: "CodeContext",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${pt_serif.className} dark  antialiased`}>{children}     <Toaster/></body>
  
    </html>
  );
}
