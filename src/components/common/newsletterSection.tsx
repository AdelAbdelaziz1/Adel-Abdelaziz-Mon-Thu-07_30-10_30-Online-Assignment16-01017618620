"use client";

import { useState, type FormEvent } from "react";
import { ArrowRight, Leaf, Mail, Smartphone, Tag, Truck } from "lucide-react";


const perks = [
  { label: "Fresh Picks Weekly", Icon: Leaf },
  { label: "Free Delivery Codes", Icon: Truck },
  { label: "Members-Only Deals", Icon: Tag },
];

function AppleIcon() {
  return (
    <svg viewBox="0 0 384 512" className="h-5 w-[17px] fill-white" aria-hidden="true">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg viewBox="0 0 512 512" className="h-5 w-5 fill-white" aria-hidden="true">
      <path d="M325.3 234.3 104.6 13l280.8 161.2-60.1 60.1zM47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0zm425.2 225.6-58.9-34.1-65.7 64.5 65.7 64.5 60.1-34.1c18-14.3 18-46.5-1.2-60.8zM104.6 499l280.8-161.2-60.1-60.1L104.6 499z" />
    </svg>
  );
}

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    await new Promise((r) => setTimeout(r, 600));
    setStatus("done");
    setEmail("");
  };

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-4 py-16 font-sans md:px-8 min-[1280px]:px-56">
      <div className="relative isolate mx-auto max-w-[1472px] overflow-hidden rounded-[40px] border border-emerald-100/50 bg-gradient-to-br from-gray-100 via-white to-red-50 shadow-2xl shadow-emerald-500/10">
        {/* decorative blurs */}
        <div className="pointer-events-none absolute -right-20 -top-40 -z-10 h-80 w-80 rounded-full bg-gradient-to-br from-emerald-200/40 to-emerald-200/0 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-16 -z-10 h-64 w-64 rounded-full bg-gradient-to-tr from-teal-200/30 to-teal-200/0 blur-2xl" />

        <div className="relative flex flex-col gap-8 p-8 md:flex-row md:justify-center md:p-14">
          {/* ───── Newsletter ───── */}
          <div className="flex flex-1 flex-col gap-[23px]">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/30">
                <Mail className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-emerald-600">
                  Newsletter
                </h3>
                <p className="text-xs font-medium text-gray-500">50,000+ subscribers</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <h2 className="text-3xl font-bold leading-[1.38] text-gray-900 md:text-4xl">
                Get the Freshest Updates{" "}
                <span className="text-emerald-600">Delivered Free</span>
              </h2>
              <p className="text-lg font-medium text-gray-500">
                Weekly recipes, seasonal offers &amp; exclusive member perks.
              </p>
            </div>

            <ul className="flex flex-wrap gap-x-3 gap-y-3 pt-px">
              {perks.map(({ label, Icon }) => (
                <li
                  key={label}
                  className="flex items-center gap-2.5 rounded-full border border-emerald-100 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                >
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-100">
                    <Icon className="h-3 w-3 text-emerald-600" />
                  </span>
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </li>
              ))}
            </ul>

            <form onSubmit={onSubmit} className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="h-[60px] w-full flex-1 rounded-2xl border-2 border-gray-200 bg-white px-5 font-medium text-gray-900 shadow-sm outline-none transition placeholder:text-gray-400 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex h-14 items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-emerald-500 px-8 font-semibold text-white shadow-lg shadow-emerald-500/30 transition hover:shadow-xl disabled:opacity-70 sm:h-[60px] sm:shrink-0"
                >
                  <span>{status === "done" ? "Subscribed" : "Subscribe"}</span>
                  <ArrowRight className="h-3.5 w-[17px] transition-transform group-hover:translate-x-1" />
                </button>
              </div>
              <p className="pl-1 text-xs font-medium text-gray-400">
                ✨ Unsubscribe anytime. No spam, ever.
              </p>
            </form>
          </div>

          {/* ───── Mobile app card ───── */}
          <div className="flex md:w-[319px] md:shrink-0 md:items-center md:border-l md:border-gray-200/70 md:pl-8 min-[1280px]:w-[524px]">
            <div className="relative isolate w-full overflow-hidden rounded-3xl bg-gradient-to-br from-gray-900 to-gray-800 p-8">
              <div className="absolute right-0 top-0 -z-10 h-32 w-32 rounded-full bg-emerald-500/20 blur-xl" />
              <div className="absolute bottom-0 left-0 -z-10 h-24 w-24 rounded-full bg-teal-500/20 blur-xl" />

              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/20 px-3 py-1.5 text-xs font-semibold text-emerald-400">
                <Smartphone className="h-3 w-3" />
                MOBILE APP
              </span>

              <h3 className="mt-5 text-2xl font-bold leading-[30px] text-white">
                Shop Faster on Our App
              </h3>
              <p className="mt-4 text-sm leading-[23px] text-gray-400">
                Get app-exclusive deals &amp; 15% off your first order.
              </p>

              <div className="mt-5 flex flex-col gap-3">
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition hover:bg-white/15"
                >
                  <AppleIcon />
                  <div className="text-left">
                    <div className="-my-0.5 text-[10px] font-medium uppercase leading-[15px] tracking-wider text-gray-400">
                      Download on
                    </div>
                    <div className="text-sm font-semibold text-white">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur-sm transition hover:bg-white/15"
                >
                  <PlayIcon />
                  <div className="text-left">
                    <div className="-my-0.5 text-[10px] font-medium uppercase leading-[15px] tracking-wider text-gray-400">
                      Get it on
                    </div>
                    <div className="text-sm font-semibold text-white">Google Play</div>
                  </div>
                </a>
              </div>

              <div className="mt-5 flex items-center gap-2 text-sm font-medium">
                <span className="text-yellow-400">★★★★★</span>
                <span className="text-gray-400">4.9 • 100K+ downloads</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}