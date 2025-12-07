"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Button from "../Reuse/button";
import Image from "next/image";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

type ApiResp = { success: boolean; message?: string; error?: string };

const HeroSection: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [toast, setToast] = useState<{ show: boolean; text: string; type: "success" | "error" }>({
    show: false,
    text: "",
    type: "success",
  });

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToast({ show: true, text, type });
    window.setTimeout(() => setToast({ show: false, text: "", type }), 3000);
  };

  const validate = (): string | null => {
    if (name.trim().length < 2) return "Please enter your full name (at least 2 characters).";
    if (!emailRegex.test(email.trim())) return "Please enter a valid email address.";
    if (!phoneRegex.test(phone.trim())) return "Please enter a valid 10-digit phone number starting with 6/7/8/9.";
    if (!service) return "Please select a service.";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    const vErr = validate();
    if (vErr) {
      showToast(vErr, "error");
      return;
    }

    setLoading(true);

    try {
      const payload = { name: name.trim(), email: email.trim(), phone: phone.trim(), service };

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      let data: ApiResp | null = null;
      try {
        data = await res.json();
      } catch (err) {
        console.log(err)
        // non-json response
      }

      if (!res.ok) {
        const msg = data?.message ?? data?.error ?? `Request failed with status ${res.status}`;
        showToast(msg, "error");
        setLoading(false);
        return;
      }

      if (data && data.success) {
        showToast(
          (data.message ?? "Inquiry submitted successfully.") +
            " We will reach you within 24 business hours, or call +91 7869600155.",
          "success"
        );
        // reset
        setName("");
        setEmail("");
        setPhone("");
        setService("");
      } else {
        const msg = data?.message ?? data?.error ?? "Submission failed.";
        showToast(msg, "error");
      }
    } catch (err) {
      console.log(err)
      showToast("Network error. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full min-h-screen bg-[var(--color-black)] text-[var(--color-white)] overflow-hidden flex items-center py-16 lg:py-0">
      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative w-full h-[500px] md:h-[500px] lg:h-[520px] rounded-3xl overflow-hidden shadow-2xl"
        >
          <Image
            src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?q=80&w=1170&auto=format&fit=crop"
            alt="Hero"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-black/40" />

          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 space-y-5">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              Build Your Digital Success With{' '}
              <span className="bg-gradient-to-r from-orange-400 to-yellow-400 text-transparent bg-clip-text">BlackOS Software</span>
            </h1>

            <p className="text-gray-300 text-lg md:text-xl max-w-lg">
              Transform ideas into powerful products. We craft scalable, high-performance digital solutions.
            </p>

            <div className="flex items-center gap-4">
              <Button className="px-8 py-3">Explore Services</Button>

              <button
                aria-label="Learn more"
                className="px-8 py-3 border border-gray-600 rounded-xl hover:border-[var(--color-primary)] transition"
                type="button"
              >
                Learn More
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <form
            onSubmit={handleSubmit}
            className="relative z-10 bg-[#111111]/80 border border-gray-700/40 backdrop-blur-xl rounded-3xl p-8 shadow-xl space-y-6"
          >
            <h3 className="text-2xl font-bold">Send Us Your Inquiry</h3>

            <div>
              <label className="text-sm mb-1 block">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl focus:border-[var(--color-primary)] outline-none"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl focus:border-[var(--color-primary)] outline-none"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Phone Number</label>
              <input
                type="tel"
                required
                value={phone}
                maxLength={10}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                placeholder="10-digit number"
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl focus:border-[var(--color-primary)] outline-none"
              />
            </div>

            <div>
              <label className="text-sm mb-1 block">Select Service</label>
              <select
                required
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3 bg-transparent border border-gray-700 rounded-xl text-white outline-none focus:border-[var(--color-primary)]"
              >
                <option value="" disabled>Select Service</option>
                <option className="text-black" value="website">Website Development</option>
                <option className="text-black" value="app">App Development</option>
                <option className="text-black" value="trading">Trading System</option>
                <option className="text-black" value="branding">Branding / UI UX</option>
              </select>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full py-3 flex items-center justify-center gap-2"
            >
              {loading ? 'Submitting...' : 'Submit Inquiry'}
              <ArrowRight className="w-5 h-5" />
            </Button>
          </form>
        </motion.div>
      </div>

      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25 }}
          className={`fixed left-1/2 top-6 -translate-x-1/2 z-50 w-[min(95%,520px)] max-w-lg rounded-lg p-4 ${
            toast.type === 'success' ? 'bg-green-600/90' : 'bg-red-600/90'
          } text-white shadow-lg`}
        >
          <div className="flex items-start gap-3">
            <div className="flex-1 text-sm leading-tight">{toast.text}</div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setToast({ show: false, text: "", type: toast.type })}
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
