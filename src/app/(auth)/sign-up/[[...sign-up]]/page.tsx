import { SignUp } from "@clerk/nextjs";
 
export default function SignUpPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <SignUp
        appearance={{
          elements: {
            card: "bg-white shadow-lg rounded-lg",
            formButtonPrimary: 
              "bg-primary hover:bg-primary/90 text-white",
            footerActionLink: 
              "text-primary hover:text-primary/90",
          },
        }}
        afterSignUpUrl="/auth/callback"
        signInUrl="/sign-in"
      />
    </div>
  );
}