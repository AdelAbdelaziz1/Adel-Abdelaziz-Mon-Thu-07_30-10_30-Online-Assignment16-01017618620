import type { Metadata } from "next";
import { Geist, Geist_Mono, Roboto, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

import ProviderComponent from "@/components/providerComponent/provider-component";
import { getAllCategories } from "@/services/category.service";

const ibmPlexSansHeading = IBM_Plex_Sans({
  subsets: ["latin"],
  variable: "--font-heading",
});

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "FreshCart",
    template: "%s | FreshCart",
  },
  description: "FreshCart - your one-stop online grocery store",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  let categories: { _id: string; name: string }[] = [];
  try {
    categories = await getAllCategories();
  } catch {
    categories = [];
  }

  return (
    <html
      lang="en"
      className={cn(
        "h-full",
        "antialiased",
        geistSans.variable,
        geistMono.variable,
        "font-sans",
        roboto.variable,
        ibmPlexSansHeading.variable
      )}
    >
      <body suppressHydrationWarning>
        <ProviderComponent categories={categories}>{children}</ProviderComponent>
      </body>
    </html>
  );
}