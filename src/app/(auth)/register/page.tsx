import Register from "@/components/auth/Register";

export const metadata = {
  title: "Register | FreshCart",
  description: "Create your FreshCart account",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#F9FAFB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <Register />
      </div>
    </main>
  );
}