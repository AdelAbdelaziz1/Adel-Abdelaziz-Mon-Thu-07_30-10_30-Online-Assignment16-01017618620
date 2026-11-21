"use client"
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { registerSchema, registerSchemaType } from '@/lib/schemas/auth.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { SignupUser } from '@/services/auth.services'

function getPasswordStrength(password: string) {
  let score = 0
  if (password.length >= 8) score++
  if (/[0-9]/.test(password)) score++
  if (/[^A-Za-z0-9]/.test(password)) score++
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++

  if (score <= 1) return { label: 'Weak', width: password ? 25 : 0, color: 'bg-red-500' }
  if (score === 2) return { label: 'Fair', width: 50, color: 'bg-orange-500' }
  if (score === 3) return { label: 'Good', width: 75, color: 'bg-yellow-500' }
  return { label: 'Strong', width: 100, color: 'bg-green-500' }
}

const GoogleIcon = () => (
  <svg className="size-5" viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z" />
    <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.5 5.8c4.4-4.1 7.1-10.1 7.1-17.5z" />
    <path fill="#FBBC05" d="M10.5 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.9-6.1C.9 16.4 0 20.1 0 24s.9 7.6 2.6 10.8l7.9-6.1z" />
    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.5-5.8c-2.1 1.4-4.8 2.3-8.4 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z" />
  </svg>
)

const FacebookIcon = () => (
  <svg className="size-5 text-[#1877F2]" viewBox="0 0 512 512" aria-hidden="true">
    <path
      fill="currentColor"
      d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z"
    />
  </svg>
)

const inputClass =
  'h-[48px] w-full rounded-lg border border-gray-300 bg-white px-4 text-base text-gray-800 placeholder:text-gray-400 shadow-none focus-visible:border-green-600 focus-visible:ring-2 focus-visible:ring-green-600/10'

const labelClass = 'text-base font-medium text-slate-700'

const socialBtnClass =
  'flex h-[48px] grow items-center justify-center gap-3 rounded-lg border border-gray-300 text-base font-semibold text-slate-800 transition-colors hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50'

export default function Register() {
  const router = useRouter()
  const {
    handleSubmit,
    control,
    watch,
    trigger,
    formState: { isSubmitting },
  } = useForm<registerSchemaType>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '', email: '', password: '', rePassword: '', phone: '', terms: false,
    },
  })

  const passwordValue = watch('password')
  const strength = getPasswordStrength(passwordValue)

  async function handleUserRegister(values: registerSchemaType) {
    try {
      const response = await SignupUser(values)
      if (response.message === 'success') {
        toast.success('Registration successful!')
        router.push('/login')
      } else {
        toast.error(response.message || 'Registration failed. Please try again.')
      }
    } catch (error) {
      console.error('Error registering user:', error)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <div className="rounded-2xl bg-white px-6 py-10 shadow-lg">
      <h2 className="mb-2 text-center text-3xl font-semibold text-slate-800">Create Your Account</h2>
      <p className="text-center text-lg text-slate-700">Start your fresh journey with us today</p>

      <div className="my-10 flex gap-3">
        <button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/login" })}
          className={`${socialBtnClass} bg-white`}
          aria-label="Sign up with Google"
        >
          <GoogleIcon />
          <span>Google</span>
        </button>

        <button
          type="button"
          onClick={() => signIn("facebook", { callbackUrl: "/login" })}
          className={`${socialBtnClass} bg-white`}
          aria-label="Sign up with Facebook"
        >
          <FacebookIcon />
          <span>Facebook</span>
        </button>
      </div>

      <div className="relative my-6 flex items-center" aria-hidden="true">
        <div className="h-0.5 grow bg-gray-200/70" />
        <span className="px-4 text-base text-slate-700">or</span>
        <div className="h-0.5 grow bg-gray-200/70" />
      </div>

      <form onSubmit={handleSubmit(handleUserRegister)} className="space-y-7" noValidate>
        {/* Name */}
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Name<span className="text-slate-500">*</span>
              </FieldLabel>
              <Input {...field} id={field.name} type="text" className={inputClass} aria-invalid={fieldState.invalid} placeholder="Ali" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Email */}
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Email<span className="text-slate-500">*</span>
              </FieldLabel>
              <Input {...field} id={field.name} type="email" className={inputClass} aria-invalid={fieldState.invalid} placeholder="ali@example.com" autoComplete="email" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Password */}
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Password<span className="text-slate-500">*</span>
              </FieldLabel>
              <Input
                {...field}
                onChange={(e) => { field.onChange(e); trigger('rePassword') }}
                id={field.name}
                type="password"
                className={inputClass}
                aria-invalid={fieldState.invalid}
                placeholder="create a strong password"
                autoComplete="new-password"
              />

              <div className="password-requirements">
                <div className="flex items-center gap-2">
                  <div className="bar h-1 grow overflow-hidden rounded-md bg-gray-200">
                    <div className={`progress ${strength.color} h-full transition-all duration-300 ease-out`} style={{ width: `${strength.width}%` }} />
                  </div>
                  <span className="min-w-[50px] text-sm font-medium">{strength.label}</span>
                </div>
              </div>

              <p className="-mt-1 text-xs text-gray-500">Must be at least 8 characters with numbers and symbols</p>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Confirm Password */}
        <Controller
          name="rePassword"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Confirm Password<span className="text-slate-500">*</span>
              </FieldLabel>
              <Input {...field} id={field.name} type="password" className={inputClass} aria-invalid={fieldState.invalid} placeholder="confirm your password" autoComplete="new-password" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid} className="flex flex-col gap-3">
              <FieldLabel htmlFor={field.name} className={labelClass}>
                Phone Number<span className="text-slate-500">*</span>
              </FieldLabel>
              <Input {...field} id={field.name} type="tel" className={inputClass} aria-invalid={fieldState.invalid} placeholder="+1 234 567 8900" autoComplete="tel" />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* Terms */}
        <Controller
          name="terms"
          control={control}
          render={({ field, fieldState }) => (
            <div>
              <div className="flex items-center gap-2">
                <input
                  id="terms"
                  type="checkbox"
                  className="size-4 accent-primary-600"
                  name={field.name}
                  checked={!!field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                  onBlur={field.onBlur}
                  ref={field.ref}
                  aria-invalid={fieldState.invalid}
                />
                <label htmlFor="terms" className="ms-2 text-slate-700">
                  I agree to the{' '}
                  <Link className="text-primary-600 hover:underline" href="/terms">Terms of Service</Link>{' '}
                  and{' '}
                  <Link className="text-primary-600 hover:underline" href="/privacy-policy">Privacy Policy</Link>{' '}*
                </label>
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex h-[52px] w-full items-center justify-center rounded-lg bg-green-600 text-base font-semibold text-white transition-colors hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? <Spinner /> : <span>Create My Account</span>}
        </button>
      </form>

      <p className="my-4 border-t border-gray-300/30 pt-10 text-center text-slate-700">
        Already have an account?{' '}
        <Link className="font-medium text-primary-600 hover:underline" href="/login">Sign In</Link>
      </p>
    </div>
  )
}