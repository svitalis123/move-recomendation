'use client'
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Search, Film, BookmarkCheck, Menu } from 'lucide-react';

const navLinks = [
  { href: '/movies', label: 'Movies', icon: Film },
  { href: '/search', label: 'Search', icon: Search },
  { href: '/watchlist', label: 'Watchlist', icon: BookmarkCheck },
];

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-xl font-bold">
            MovieRec
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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

          {/* Right Section with Auth and Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop Auth Button */}
            <div className="hidden md:block">
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
                  className="rounded-lg bg-[#000] px-4 py-2 text-white hover:bg-primary/90"
                >
                  Sign In
                </Link>
              </SignedOut>
            </div>

            {/* Hamburger Menu Button */}
            <div className="relative md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <Menu className="h-6 w-6" />
              </button>

              {/* Mobile Dropdown Menu */}
              {isMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                  {navLinks.map(({ href, label, icon: Icon }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 ${
                        pathname === href ? 'text-primary' : 'text-gray-600'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{label}</span>
                    </Link>
                  ))}
                  <div className="border-t my-2">
                    <SignedIn>
                      <div className="px-4 py-2">
                        <UserButton 
                          afterSignOutUrl="/"
                          appearance={{
                            elements: {
                              avatarBox: "h-8 w-8"
                            }
                          }}
                        />
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <Link 
                        href="/sign-in"
                        onClick={() => setIsMenuOpen(false)}
                        className="block px-4 py-2 text-gray-600 hover:bg-gray-50"
                      >
                        Sign In
                      </Link>
                    </SignedOut>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}