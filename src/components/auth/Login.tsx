"use client";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";
import { loginSchema, loginSchemaType } from "@/lib/schemas/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import {
  FaGoogle, FaFacebook, FaEnvelope, FaLock, FaEye, FaEyeSlash,
  FaUsers, FaStar,
} from "react-icons/fa6";
import { toast } from "sonner";
import Link from "next/link";

export default function Login() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<loginSchemaType>({
    mode: "all",
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  async function handleUserLogin(values: loginSchemaType) {
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    if (response?.ok) {
      toast.success("Login successful!");
      router.push("/products");
      router.refresh();
    } else {
      toast.error(response?.error || "Login failed. Please try again.");
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <span className="text-3xl font-bold text-primary-600">
            Fresh<span className="text-gray-800">Cart</span>
          </span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
        <p className="text-gray-600">Sign in to continue your fresh shopping experience</p>
      </div>

      <div className="space-y-3 mb-6">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/products" })}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
        >
          <FaGoogle className="text-red-500 text-lg" aria-hidden="true" />
          <span className="font-medium text-gray-700">Continue with Google</span>
        </button>
        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/products" })}
          className="w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-gray-200 rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-200"
        >
          <FaFacebook className="text-blue-600 text-lg" aria-hidden="true" />
          <span className="font-medium text-gray-700">Continue with Facebook</span>
        </button>
      </div>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-gray-500 font-medium">
            OR CONTINUE WITH EMAIL
          </span>
        </div>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleUserLogin)} noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="w-full px-4 py-3 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
          </div>
          {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Password
            </label>
            <Link
              className="text-sm text-primary-600 hover:text-primary-700 cursor-pointer font-medium"
              href="/forgot-password"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              {...register("password")}
              className="w-full px-4 py-3 pl-12 pr-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-100 transition-all"
            />
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden="true" />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 text-primary-600 accent-primary-600 border-2 border-gray-300 rounded focus:ring-primary-500"
            />
            <span className="ml-3 text-sm text-gray-700">Keep me signed in</span>
          </label>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center text-white py-3 px-4 rounded-xl bg-green-600 hover:bg-green-700 transition-all duration-200 font-semibold text-lg shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? <Spinner /> : "Sign In"}
        </button>
      </form>

      <div className="text-center mt-8 pt-6 border-t border-gray-100">
        <p className="text-gray-600">
          New to FreshCart?
          <Link
            className="text-primary-600 hover:text-primary-700 ms-2 font-semibold cursor-pointer"
            href="/register"
          >
            Create an account
          </Link>
        </p>
      </div>

      <div className="flex items-center justify-center space-x-6 mt-6 text-xs text-gray-500">
        <div className="flex items-center">
          <FaLock className="mr-1" aria-hidden="true" />
          SSL Secured
        </div>
        <div className="flex items-center">
          <FaUsers className="mr-1" aria-hidden="true" />
          50K+ Users
        </div>
        <div className="flex items-center">
          <FaStar className="mr-1" aria-hidden="true" />
          4.9 Rating
        </div>
      </div>
    </div>
  );
}