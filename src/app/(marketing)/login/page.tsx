import { AuthForm } from "@/components/forms/auth-form";

export default function LoginPage() {
  return (
    <section className="mx-auto flex min-h-[80vh] w-full max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
      <AuthForm mode="login" />
    </section>
  );
}
