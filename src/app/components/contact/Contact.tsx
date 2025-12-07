"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import Button from "../Reuse/button";

const contacts = [
  {
    icon: <Mail className="w-6 h-6 text-white" />,
    title: "Email",
    value: "blackossoftware.contact@gmail.com",
    bg: "bg-gray-700", // white icon, dark bg
  },
  {
    icon: <Globe className="w-6 h-6 text-blue-500" />,
    title: "Website",
    value: "BlackOSSoftware.com",
    bg: "bg-blue-100/10", // subtle blue bg
  },
  {
    icon: <Phone className="w-6 h-6 text-red-500" />,
    title: "Phone",
    value: "+91 7869600155",
    bg: "bg-red-100/10", // subtle red bg
  },
  {
    icon: <MapPin className="w-6 h-6 text-purple-500" />,
    title: "Location",
    value: "Indore, India",
    bg: "bg-purple-100/10", // purple accent
  },
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;

const ContactForm: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const resetForm = (): void => {
    setName("");
    setEmail("");
    setPhone("");
    setService("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Client-side validation
    if (name.trim().length < 2) {
      setError("Please enter your full name (at least 2 characters).");
      return;
    }

    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number starting with 6/7/8/9.");
      return;
    }

    if (!service) {
      setError("Please select a service.");
      return;
    }

    setLoading(true);

    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, service, message }),
      });

      const data = await resp.json();

      if (!resp.ok) {
        // backend returns helpful error message
        setError(typeof data?.error === "string" ? data.error : "Submission failed. Try again.");
        setLoading(false);
        return;
      }

      setSuccess(
        "Thank you — your inquiry was submitted successfully. We will contact you within 24 business hours."
      );
      resetForm();
    } catch (err) {
      // use console for debugging; avoids unused variable lint
      // eslint-disable-next-line no-console
      console.error(err);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 px-6 bg-[var(--color-black)] text-[var(--color-white)]">
      <div className="container max-w-6xl mx-auto mt-4">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <Button
            className="px-4 py-2 rounded-full border border-[var(--color-highlight)] text-sm mb-4"
            type="button"
          >
            Let&apos;s Talk
          </Button>

          <h2 className="text-4xl md:text-5xl font-bold mt-2">We&apos;re Here To Help</h2>
          <p className="text-gray-400 mt-4">Our team is ready to support you with expert advice &amp; solutions.</p>
        </div>

        {/* Status messages */}
        <div className="max-w-3xl mx-auto mb-6">
          {error && (
            <div className="rounded-md bg-red-900/60 border border-red-700 text-red-100 px-4 py-3">
              {error}
            </div>
          )}
          {success && (
            <div className="rounded-md bg-green-900/60 border border-green-700 text-green-100 px-4 py-3">
              {success}
            </div>
          )}
        </div>

        {/* Swiper wrapper for animated fields */}
        <Swiper spaceBetween={20} slidesPerView={1} className="mb-16">
          <SwiperSlide>
            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="bg-[var(--color-black)]/70 border border-[var(--color-white)]/10 rounded-2xl p-8 space-y-6 shadow-xl backdrop-blur-md"
            >
              {/* Row 1: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label htmlFor="contact_fullName" className="block text-left text-sm font-medium mb-2">
                    Full Name <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    id="contact_fullName"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-white)]/20 text-[var(--color-white)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none hover:border-[var(--color-primary)] transition"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact_email" className="block text-left text-sm font-medium mb-2">
                    Email Address <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    id="contact_email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-white)]/20 text-[var(--color-white)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none hover:border-[var(--color-primary)] transition"
                  />
                </div>
              </div>

              {/* Row 2: Phone + Select Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label htmlFor="contact_phone" className="block text-left text-sm font-medium mb-2">
                    Phone Number <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <input
                    id="contact_phone"
                    name="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))} // only digits
                    required
                    placeholder="Enter 10-digit phone number"
                    pattern="^[6-9]\d{9}$"
                    maxLength={10}
                    inputMode="tel"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-white)]/20 text-[var(--color-white)] placeholder-gray-400 focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none hover:border-[var(--color-primary)] transition"
                  />
                </div>

                {/* Select Service */}
                <div>
                  <label htmlFor="contact_service" className="block text-left text-sm font-medium mb-2">
                    Select Service <span className="text-[var(--color-primary)]">*</span>
                  </label>
                  <select
                    id="contact_service"
                    name="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    required
                    aria-label="Select the service you want"
                    className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-white)]/20 text-[var(--color-white)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none hover:border-[var(--color-primary)] transition"
                  >
                    <option value="" disabled>
                      Select Your Service
                    </option>
                    <option className="text-black" value="website">
                      Website Development
                    </option>
                    <option className="text-black" value="app">
                      App Development
                    </option>
                    <option className="text-black" value="trading">
                      Trading System
                    </option>
                    <option className="text-black" value="ecommerce">
                      E-Commerce
                    </option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message full width */}
              <div>
                <label htmlFor="contact_message" className="block text-left text-sm font-medium mb-2">
                  Project Details
                </label>
                <textarea
                  id="contact_message"
                  name="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                  placeholder="Tell us more about your project"
                  className="w-full px-4 py-3 rounded-lg bg-transparent border border-[var(--color-white)]/20 text-[var(--color-white)] focus:ring-2 focus:ring-[var(--color-primary)] focus:outline-none resize-none hover:border-[var(--color-primary)] transition"
                />
              </div>

              {/* Row 4: Submit */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Button
                  type="submit"
                  disabled={loading}
                  aria-busy={loading}
                  className={`w-full md:w-auto inline-flex items-center justify-center px-8 py-3 rounded-lg font-medium transition disabled:opacity-60 ${
                    loading ? "bg-gray-600" : "bg-[var(--color-primary)] hover:scale-[1.01]"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit"}
                </Button>

                <p className="text-gray-400 text-sm text-center md:text-left">
                  We will contact you within 24 business hours.
                </p>
              </div>
            </motion.form>
          </SwiperSlide>
        </Swiper>

        {/* Contact Cards - Swiper on Mobile */}
        <Swiper
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
        >
          {contacts.map((item, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-[#0f0f10] border border-gray-800 rounded-2xl p-6 flex flex-col items-center justify-center shadow-lg cursor-pointer hover:border-[var(--color-primary)] transition-all"
              >
                <div className={`w-12 h-12 flex items-center justify-center rounded-lg ${item.bg} mb-4`}>
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.value}</p>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ContactForm;
