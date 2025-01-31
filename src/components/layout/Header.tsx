'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Search, Film, BookmarkCheck } from 'lucide-react';

const navLinks = [
  { href: '/movies', label: 'Movies', icon: Film },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/watchlist', label: 'Watchlist', icon: BookmarkCheck },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-bold">
            MovieRec
          </Link>

          <nav className="flex items-center space-x-8">
            {navLinks.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className={`flex items-center space-x-1 hover:text-primary ${
                  pathname === href ? 'text-primary' : 'text-gray-600'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div>
            <SignedIn>
              <UserButton 
                afterSignOutUrl="/"
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8"
                  }
                }}
              />
            </SignedIn>
            <SignedOut>
              <Link 
                href="/sign-in"
                className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-primary/90"
              >
                Sign In
              </Link>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}