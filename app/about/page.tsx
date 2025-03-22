import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-900 to-red-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <header className="mb-12 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold">
            Vomy Chat
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link href="/about" className="font-medium hover:text-purple-300">
              About
            </Link>
            <Link href="/features" className="font-medium hover:text-purple-300">
              Features
            </Link>
            <Link href="/pricing" className="font-medium hover:text-purple-300">
              Pricing
            </Link>
            <Link href="/contact" className="font-medium hover:text-purple-300">
              Contact
            </Link>
          </nav>
          <Button asChild variant="outline" className="border-white text-white hover:bg-white/10">
            <Link href="/dashboard">Dashboard</Link>
          </Button>
        </header>

        <main className="py-12">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-6xl">About Vomy Chat</h1>
            <p className="mb-8 text-xl leading-relaxed text-white/80">
              Vomy Chat is a modern Linktree alternative designed to help creators, influencers, and businesses connect
              with their audience through a beautiful, customizable link page.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                  <path d="m2 12 3-3 3 3" />
                  <path d="m18 12 3 3-3 3" />
                  <path d="m7 17 5-10 5 10" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-bold">Our Mission</h2>
              <p className="text-white/80">
                We're on a mission to simplify online presence management for creators and businesses, making it easier
                to connect with audiences across platforms.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-bold">Our Story</h2>
              <p className="text-white/80">
                Founded in 2023, Vomy Chat was born from the need for a more versatile and customizable link-in-bio
                solution that puts creators first.
              </p>
            </div>

            <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </div>
              <h2 className="mb-2 text-xl font-bold">Our Vision</h2>
              <p className="text-white/80">
                We envision a world where creators can effortlessly manage their digital presence and monetize their
                content through a single, powerful platform.
              </p>
            </div>
          </div>

          <div className="mt-20 rounded-xl bg-white/10 p-8 backdrop-blur-sm md:p-12">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h2 className="mb-4 text-3xl font-bold">Join thousands of creators using Vomy Chat</h2>
                <p className="mb-6 text-lg text-white/80">
                  Whether you're a content creator, influencer, artist, or business owner, Vomy Chat provides the tools
                  you need to thrive online.
                </p>
                <Button asChild size="lg" className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/dashboard">Get Started for Free</Link>
                </Button>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-64 w-64">
                  <div className="absolute left-0 top-0 h-full w-full animate-pulse rounded-full bg-purple-500/30 blur-xl"></div>
                  <div className="absolute left-1/2 top-1/2 h-48 w-48 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-gradient-to-br from-purple-500 to-red-500"></div>
                  <div className="absolute left-1/2 top-1/2 flex h-40 w-40 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-white/10 text-4xl font-bold backdrop-blur-sm">
                    VC
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

