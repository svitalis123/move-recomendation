'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { LoadingSpinner } from '../common/LoadingSpinner';

export function AuthCallback() {
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect_url');

  useEffect(() => {
    if (isLoaded && isSignedIn) {
      router.push(redirectUrl || '/movies');
    }
  }, [isLoaded, isSignedIn, router, redirectUrl]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}