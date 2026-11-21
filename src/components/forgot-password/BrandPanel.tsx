import { MailCheck, ShieldCheck, Lock } from "lucide-react";

export default function BrandPanel() {
  return (
    <section className="w-full lg:w-1/2 flex flex-col gap-6">
      {/* Illustration Card */}
      <div className="relative w-full h-[320px] sm:h-[360px] rounded-2xl overflow-hidden bg-gradient-to-br from-[#F0FDF4] via-[#F0FDF4] to-[#F3F4F6] shadow-lg">
        {/* Decorative Circles */}
        <span className="absolute w-24 h-24 rounded-full bg-[#DCFCE7]/50 left-8 top-8" />
        <span className="absolute w-32 h-32 rounded-full bg-[#DCFCE7]/50 right-10 bottom-12" />
        <span className="absolute w-16 h-16 rounded-full bg-[#D0FAE5]/50 right-20 top-20" />

        {/* Center Composition */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
          <div className="relative">
            {/* Main Lock Card */}
            <div className="w-28 h-28 rounded-3xl bg-white shadow-xl flex items-center justify-center rotate-3">
              <div className="w-20 h-20 rounded-2xl bg-[#DCFCE7] flex items-center justify-center rotate-3">
                <Lock className="w-10 h-10 text-[#16A34A] rotate-3" strokeWidth={2.5} />
              </div>
            </div>

            {/* Left Mail Card */}
            <div className="absolute -left-16 top-3 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center -rotate-12">
              <MailCheck className="w-6 h-6 text-[#22C55E]" strokeWidth={2.5} />
            </div>

            {/* Right Shield Card */}
            <div className="absolute -right-14 top-7 w-14 h-14 rounded-xl bg-white shadow-lg flex items-center justify-center rotate-12">
              <ShieldCheck className="w-6 h-6 text-[#00C950]" strokeWidth={2.5} />
            </div>
          </div>

          {/* Dots */}
          <div className="flex gap-3">
            <span className="w-3 h-3 rounded-full bg-[#4ADE80]" />
            <span className="w-3 h-3 rounded-full bg-[#22C55E]" />
            <span className="w-3 h-3 rounded-full bg-[#16A34A]" />
          </div>
        </div>
      </div>

      {/* Text Content */}
      <div className="flex flex-col items-center gap-4 text-center">
        <h2 className="text-3xl font-bold text-[#1E2939]">Reset Your Password</h2>
        <p className="text-lg text-[#4A5565] max-w-lg">
          Don&apos;t worry, it happens to the best of us. We&apos;ll help you get
          back into your account in no time.
        </p>

        {/* Features */}
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-2">
          <li className="flex items-center gap-2 text-sm text-[#6A7282]">
            <MailCheck className="w-4 h-4 text-[#16A34A]" />
            Email Verification
          </li>
          <li className="flex items-center gap-2 text-sm text-[#6A7282]">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            Secure Reset
          </li>
          <li className="flex items-center gap-2 text-sm text-[#6A7282]">
            <Lock className="w-4 h-4 text-[#16A34A]" />
            Encrypted
          </li>
        </ul>
      </div>
    </section>
  );
}