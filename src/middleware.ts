import { clerkMiddleware, ClerkMiddlewareOptions } from '@clerk/nextjs/server'

const options: ClerkMiddlewareOptions = {
  publicRoutes: ["/", "/sign-in", "/sign-up"],
};

export default clerkMiddleware((auth, req) => {
  // Handle auth state
  if (!auth.userId && !auth.isPublicRoute) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return Response.redirect(signInUrl);
  }
}, options);

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};