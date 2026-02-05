import { Poppins } from "next/font/google"; 
import "./globals.css";
import Footer from "./Components/Layouts/Footer";
import Navbar from "./Components/Navbar";
import Head from "next/head";

const poppins = Poppins(
  {
    weight:["100", "200", "400", "500", "600", "800"],
  }
)

export const metadata = {
  title: {
    default: "Care.xyz | Trusted Baby Sitting & Elderly Care Service",
    template: "%s | Care.xyz",
  },

  description:
    "Care.xyz is a trusted platform for baby sitting, elderly care, and home care services. Book verified caretakers easily and securely.",

  keywords: [
    "baby sitting service",
    "elderly care service",
    "home care service",
    "caretaker service Bangladesh",
    "Care.xyz",
    "child care",
    "senior care",
  ],

  authors: [{ name: "Care.xyz Team" }],
  creator: "Care.xyz",
  publisher: "Care.xyz",

  metadataBase: new URL("https://care-nxzc5cm2h-tahmeed-hasans-projects.vercel.app"),

  icons: {
    icon: "https://i.ibb.co.com/WptKJVRy/logo.png",
    shortcut: "https://i.ibb.co.com/WptKJVRy/logo.png",
    apple: "https://i.ibb.co.com/WptKJVRy/logo.png",
  },

  openGraph: {
    title: "Care.xyz | Trusted Baby Sitting & Elderly Care Service",
    description:
      "Find reliable baby sitters, elderly caregivers, and home care professionals with Care.xyz.",
    url: "https://care-nxzc5cm2h-tahmeed-hasans-projects.vercel.app",
    siteName: "Care.xyz",
    images: [
      {
        url: "https://i.ibb.co.com/Tx5LJHBs/bannerofcare.jpg",
        width: 1200,
        height: 630,
        alt: "Care.xyz Home Page Preview",
      },
      {
        url: "https://i.ibb.co.com/kVnTNSWx/tr6u.jpg",
        width: 1200,
        height: 630,
        alt: "Care.xyz Service Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Care.xyz | Trusted Care Services",
    description:
      "Book baby sitting and elderly care services from trusted professionals using Care.xyz.",
    images: ["https://i.ibb.co.com/Tx5LJHBs/bannerofcare.jpg"],
    creator: "@carexyz",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>

      <Head>
        <title>Care.xyz | Trusted Baby Sitting & Elderly Care Service</title>
        <meta name="description" content="Care.xyz is a trusted platform for baby sitting, elderly care, and home care services. Book verified caretakers easily and securely." />
        <meta property="og:title" content="Care.xyz | Trusted Baby Sitting & Elderly Care Service" />
        <meta property="og:image" content="https://i.ibb.co.com/Tx5LJHBs/bannerofcare.jpg" />
        <meta property="og:url" content="https://care-nxzc5cm2h-tahmeed-hasans-projects.vercel.app" />
      </Head>
      <body className={`${poppins.className} antialiased bg-[#f1f2f6]`}>
        <header>
          <Navbar />
        </header>

        {children}

        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  );
}
