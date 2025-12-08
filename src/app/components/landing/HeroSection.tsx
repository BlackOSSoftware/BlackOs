"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, PhoneCall } from "lucide-react";
import Button from "../Reuse/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

type ApiResp = { success: boolean; message?: string; error?: string };

const HeroSection: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{
    show: boolean;
    text: string;
    type: "success" | "error";
  }>({
    show: false,
    text: "",
    type: "success",
  });

  const router = useRouter();

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ show: true, text, type });
    window.setTimeout(() => setToast({ show: false, text: "", type }), 3000);
  };

  const validate = (): string | null => {
    if (name.trim().length < 2) {
      return "Please enter your full name (at least 2 characters).";
    }
    if (!emailRegex.test(email.trim())) {
      return "Please enter a valid email address.";
    }
    if (!phoneRegex.test(phone.trim())) {
      return "Please enter a valid 10-digit phone number starting with 6/7/8/9.";
    }
    if (!service) {
      return "Please select a service.";
    }
    return null;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      showToast(validationError, "error");
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service,
      };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: ApiResp | null = null;
      try {
        data = await res.json();
      } catch (error) {
        console.log(error);
      }

      if (!res.ok) {
        const message =
          data?.message ??
          data?.error ??
          `Request failed with status ${res.status}`;
        showToast(message, "error");
        setLoading(false);
        return;
      }

      if (data && data.success) {
        showToast(
          (data.message ?? "Inquiry submitted successfully.") +
            " We will reach you within 24 business hours, or call +91 7869600155.",
          "success"
        );
        setName("");
        setEmail("");
        setPhone("");
        setService("");
      } else {
        const message = data?.message ?? data?.error ?? "Submission failed.";
        showToast(message, "error");
      }
    } catch (error) {
      console.log(error);
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="hero"
      aria-label="BlackOS Software company hero section with enquiry form"
      className="relative w-full min-h-screen bg-[var(--color-black)] text-[var(--color-white)] overflow-hidden"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,138,0,0.22),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(30,144,255,0.18),_transparent_55%)]" />
        <div className="absolute inset-y-0 right-0 w-[40%] bg-gradient-to-l from-[var(--color-primary)]/10 via-transparent to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl xl:max-w-7xl mx-auto px-6 lg:px-8 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] gap-14 lg:gap-20 items-center">
          {/* Left: Content */}
          <motion.header
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="space-y-7"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--color-primary)]/40 bg-[var(--color-black)]/70 px-3 py-1 text-xs sm:text-sm font-medium tracking-wide">
              <span className="h-2 w-2 rounded-full bg-[var(--color-success)] shadow-[0_0_0_4px_rgba(16,185,129,0.35)]" />
              <span className="uppercase text-[var(--color-highlight)]">
                Trusted Technology Partner
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight">
              Build reliable{" "}
              <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-highlight)] to-[var(--color-accent)] text-transparent bg-clip-text">
                digital products
              </span>{" "}
              with BlackOS Software.
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-xl">
              We design and develop high-performance websites, mobile apps,
              trading systems, and brand experiences tailored for modern
              businesses that want results, not experiments.
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                <span>Custom web and app development for your business goals.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                <span>Trading and automation systems with real-world stability.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                <span>Branding, UI/UX and product strategy in one place.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 text-[var(--color-success)]" />
                <span>End-to-end delivery with ongoing support and improvements.</span>
              </li>
            </ul>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Button
                className="px-7 py-3 flex items-center gap-2 text-sm sm:text-base"
                onClick={() => router.push("/services")}
              >
                View services
                <ArrowRight className="h-4 w-4" />
              </Button>

              <button
                type="button"
                onClick={() => router.push("/contact")}
                className="inline-flex items-center gap-2 rounded-xl border border-gray-600/80 bg-[var(--color-black)]/60 px-5 py-2.5 text-sm sm:text-base font-medium hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition"
              >
                <PhoneCall className="h-4 w-4 text-[var(--color-primary)]" />
                Book a quick call
              </button>
            </div>

            <div className="flex flex-wrap gap-6 pt-4 text-xs sm:text-sm text-gray-400">
              <div>
                <p className="font-semibold text-[var(--color-accent)]">
                  30+ projects delivered
                </p>
                <p>For startups, traders and agencies.</p>
              </div>
              <div>
                <p className="font-semibold text-[var(--color-secondary)]">
                  India based, global clients
                </p>
                <p>Fast response, clear communication.</p>
              </div>
            </div>
          </motion.header>

          {/* Right: Enquiry card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.05 }}
            className="relative"
          >
            <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-[radial-gradient(circle_at_top,_rgba(255,183,0,0.2),_transparent_55%)] blur-xl" />
            <form
              onSubmit={handleSubmit}
              className="relative z-10 rounded-[28px] border border-white/10 bg-[#050505]/90 backdrop-blur-xl p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.65)] space-y-5"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Get a project estimate
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-400">
                    Share a few details and we&apos;ll respond within one business day.
                  </p>
                </div>
                <div className="hidden sm:flex flex-col items-end text-[10px] text-gray-400">
                  <span className="uppercase tracking-wide">Response time</span>
                  <span className="text-[var(--color-success)] font-semibold">
                    &lt; 24 hours
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="hero-name"
                    className="text-xs font-medium text-gray-300 mb-1 block"
                  >
                    Full name
                  </label>
                  <input
                    id="hero-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-email"
                    className="text-xs font-medium text-gray-300 mb-1 block"
                  >
                    Email address
                  </label>
                  <input
                    id="hero-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-phone"
                    className="text-xs font-medium text-gray-300 mb-1 block"
                  >
                    Phone number
                  </label>
                  <input
                    id="hero-phone"
                    type="tel"
                    required
                    value={phone}
                    maxLength={10}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    placeholder="10-digit mobile number"
                    className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none ring-0 transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="hero-service"
                    className="text-xs font-medium text-gray-300 mb-1 block"
                  >
                    Service you are interested in
                  </label>
                  <select
                    id="hero-service"
                    required
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full rounded-xl border border-gray-700 bg-[var(--color-black)] px-4 py-2.5 text-sm text-[var(--color-white)] outline-none ring-0 transition focus:border-[var(--color-primary)]"
                  >
                    <option value="" disabled>
                      Select service
                    </option>
                    <option className="text-black" value="website">
                      Website development
                    </option>
                    <option className="text-black" value="app">
                      Mobile or web app development
                    </option>
                    <option className="text-black" value="trading">
                      Trading or automation system
                    </option>
                    <option className="text-black" value="branding">
                      Branding, UI/UX and product design
                    </option>
                  </select>
                </div>
              </div>

              <Button
                type="submit"
                disabled={loading}
                className="mt-1 w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold"
              >
                {loading ? "Submitting..." : "Submit enquiry"}
                {!loading && <ArrowRight className="h-4 w-4" />}
              </Button>

              <p className="text-[10px] leading-relaxed text-gray-500 pt-1">
                By submitting this form you agree to be contacted by BlackOS
                Software for this enquiry. We do not share your details with
                third parties.
              </p>
            </form>

            {/* Side visual for larger screens (optional, subtle) */}
            <div className="pointer-events-none absolute -left-32 top-1/2 hidden -translate-y-1/2 lg:block">
              <div className="relative h-40 w-40 rotate-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=600&auto=format&fit=crop"
                  alt="Team working at BlackOS Software office"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className={`fixed left-1/2 top-6 -translate-x-1/2 z-50 w-[min(95%,520px)] max-w-lg rounded-lg p-4 ${
            toast.type === "success"
              ? "bg-[var(--color-success)]/90"
              : "bg-red-600/90"
          } text-white shadow-lg`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1 text-sm leading-tight">{toast.text}</div>
            <button
              type="button"
              aria-label="Close notification"
              onClick={() =>
                setToast({ show: false, text: "", type: toast.type })
              }
              className="text-white/80 hover:text-white"
            >
              ×
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default HeroSection;
