"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Home, PhoneCall } from "lucide-react";
import Button from "./components/Reuse/button";
import Link from "next/link";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

type ApiResp = {
  success: boolean;
  message?: string;
  error?: string;
};

const NotFound: React.FC = () => {
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
        const message = data?.message ?? "Submission failed.";
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
    <main className="relative min-h-screen w-full bg-[var(--color-black)] text-[var(--color-white)] overflow-hidden">
      {/* background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,138,0,0.24),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(30,144,255,0.22),_transparent_55%)]" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/80 to-transparent" />
      </div>

      <section
        aria-label="Page not found - BlackOS Software"
        className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-20 lg:py-24 flex flex-col items-center"
      >
        {/* top breadcrumb / back */}
        <div className="mb-6 flex w-full max-w-2xl items-center justify-between text-xs sm:text-sm text-gray-400">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 hover:text-[var(--color-primary)] transition"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to home
          </Link>
          <span className="uppercase tracking-[0.18em] text-[var(--color-highlight)]">
            404 – Not found
          </span>
        </div>

        {/* main 404 content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-5 max-w-2xl"
        >
          <p className="text-sm font-semibold tracking-[0.2em] uppercase text-[var(--color-accent)]">
            BlackOS Software
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight">
            This page is{" "}
            <span className="bg-gradient-to-r from-[var(--color-primary)] via-[var(--color-highlight)] to-[var(--color-secondary)] text-transparent bg-clip-text">
              missing
            </span>
            , not your idea.
          </h1>

          <p className="text-sm sm:text-base text-gray-300">
            The URL you opened doesn&apos;t exist or is no longer available. If
            you were trying to learn about our services or start a project,
            you&apos;re still in the right place.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/">
              <Button className="px-7 py-3 flex items-center gap-2 text-sm sm:text-base">
                <Home className="h-4 w-4" />
                Go to homepage
              </Button>
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-600/80 bg-[var(--color-black)]/70 px-5 py-2.5 text-sm sm:text-base font-medium hover:border-[var(--color-primary)] hover:bg-[var(--color-primary)]/10 transition"
            >
              <PhoneCall className="h-4 w-4 text-[var(--color-primary)]" />
              Contact support
            </Link>
          </div>
        </motion.div>

        {/* enquiry card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10 w-full max-w-xl"
        >
          <div className="pointer-events-none absolute left-1/2 mt-2 h-40 w-64 -translate-x-1/2 rounded-[32px] bg-[radial-gradient(circle,_rgba(255,179,71,0.25),_transparent_60%)] blur-2xl" />
          <form
            onSubmit={handleSubmit}
            className="relative z-10 rounded-2xl border border-white/10 bg-[#050505]/95 backdrop-blur-xl p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.65)] space-y-4"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">
                  Send a quick enquiry
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-gray-400">
                  Tell us what you were looking for and we&apos;ll share the
                  right link or a solution.
                </p>
              </div>
              <span className="hidden sm:inline-block text-[10px] text-gray-400">
                Avg. reply{" "}
                <span className="text-[var(--color-success)] font-semibold">
                  &lt; 24 hrs
                </span>
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <div>
                <label
                  htmlFor="nf-name"
                  className="mb-1 block text-xs font-medium text-gray-300"
                >
                  Full name
                </label>
                <input
                  id="nf-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="nf-email"
                  className="mb-1 block text-xs font-medium text-gray-300"
                >
                  Email address
                </label>
                <input
                  id="nf-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="nf-phone"
                  className="mb-1 block text-xs font-medium text-gray-300"
                >
                  Phone number
                </label>
                <input
                  id="nf-phone"
                  type="tel"
                  required
                  value={phone}
                  maxLength={10}
                  onChange={(e) =>
                    setPhone(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="10-digit mobile number"
                  className="w-full rounded-xl border border-gray-700 bg-transparent px-4 py-2.5 text-sm outline-none transition placeholder:text-gray-500 focus:border-[var(--color-primary)]"
                />
              </div>

              <div>
                <label
                  htmlFor="nf-service"
                  className="mb-1 block text-xs font-medium text-gray-300"
                >
                  What were you trying to open?
                </label>
                <select
                  id="nf-service"
                  required
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="w-full rounded-xl border border-gray-700 bg-[var(--color-black)] px-4 py-2.5 text-sm text-[var(--color-white)] outline-none transition focus:border-[var(--color-primary)]"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option className="text-black" value="services">
                    Services or pricing
                  </option>
                  <option className="text-black" value="project">
                    Start a new project
                  </option>
                  <option className="text-black" value="support">
                    Product / technical support
                  </option>
                  <option className="text-black" value="trading">
                    Trading / automation tools
                  </option>
                  <option className="text-black" value="other">
                    Something else
                  </option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="mt-1 flex w-full items-center justify-center gap-2 py-3 text-sm font-semibold"
            >
              {loading ? "Submitting..." : "Submit enquiry"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </Button>

            <p className="pt-1 text-[10px] leading-relaxed text-gray-500">
              If you have a specific URL or idea, include it in your first
              message when we reply. We only use your details to follow up on
              this enquiry.
            </p>
          </form>
        </motion.div>
      </section>

      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className={`fixed left-1/2 top-6 z-50 w-[min(95%,520px)] max-w-lg -translate-x-1/2 rounded-lg p-4 text-white shadow-lg ${
            toast.type === "success"
              ? "bg-[var(--color-success)]/90"
              : "bg-red-600/90"
          }`}
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
    </main>
  );
};

export default NotFound;
