// src/app/auth/callback/page.tsx
import { Suspense } from 'react';
import { AuthCallback } from '@/components/auth/AuthCallback';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function CallbackPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <AuthCallback />
    </Suspense>
  );
}