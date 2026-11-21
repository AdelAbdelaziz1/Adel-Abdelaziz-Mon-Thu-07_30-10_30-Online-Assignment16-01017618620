import Login from "@/components/auth/Login";

export const metadata = {
  title: "Login | FreshCart",
  description: "Sign in to your FreshCart account",
};

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Login />
      </div>
    </main>
  );
}