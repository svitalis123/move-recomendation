// import { auth } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";

export default async function Home() {
  const { userId } = await auth();

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to MovieRec
      </h1>
      
      {!userId ? (
        <div className="space-y-4">
          <p className="text-xl">
            Please sign in to access movie recommendations
          </p>
          <div className="space-x-4">
            <Link
              href="/sign-in"
              className="bg-primary text-white px-4 py-2 rounded"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="bg-secondary text-white px-4 py-2 rounded"
            >
              Sign Up
            </Link>
          </div>
        </div>
      ) : (
        <Link
          href="/movies"
          className="bg-primary text-white px-4 py-2 rounded inline-block"
        >
          Browse Movies
        </Link>
      )}
    </main>
  );
}