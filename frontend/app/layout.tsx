import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";
import "./projects/projects.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Full-Stack Web Developer & Graphic Designer | Portfolio",
  description: "Professional portfolio showcasing full-stack web development and graphic design expertise. Building scalable solutions and beautiful interfaces.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google Maps */}
        <Script
          src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDwY0cI5S2N9u9Yv3Kwg5ywJkr_J1234567"
          strategy="afterInteractive"
        />
        {/* Removed external CSS that may conflict with Tailwind */}
        {/* <link href="/assets/vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/vendor/bootstrap-icons/bootstrap-icons.css" rel="stylesheet" /> */}
        {/* <link href="/assets/vendor/aos/aos.css" rel="stylesheet" /> */}
        {/* <link href="/assets/vendor/glightbox/css/glightbox.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/vendor/swiper/swiper-bundle.min.css" rel="stylesheet" /> */}
        {/* <link href="/assets/css/main.css" rel="stylesheet" /> */}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>{children}</Providers>

        {/* Removed vanilla JS scripts that conflict with React */}
        {/* <Script src="/assets/vendor/bootstrap/js/bootstrap.bundle.min.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/php-email-form/validate.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/aos/aos.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/typed.js/typed.umd.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/purecounter/purecounter_vanilla.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/waypoints/noframework.waypoints.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/glightbox/js/glightbox.min.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/imagesloaded/imagesloaded.pkgd.min.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/isotope-layout/isotope.pkgd.min.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/vendor/swiper/swiper-bundle.min.js" strategy="afterInteractive" /> */}
        {/* <Script src="/assets/js/main.js" strategy="afterInteractive" /> */}
      </body>
    </html>
  );
}
