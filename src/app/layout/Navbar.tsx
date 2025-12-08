"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Reuse/button";
import { useRouter, usePathname } from "next/navigation";

const NAV_ITEMS = [
  { label: "About", href: "#about", id: "about" },
  { label: "Why Us", href: "#why-us", id: "why-us" },
  { label: "Mission", href: "#mission", id: "mission" },
  { label: "Works", href: "#works", id: "works" },
  { label: "Services", href: "/services", id: "services-page" },
  { label: "Pages", href: "#", id: "pages" },
];

const PAGES_DROPDOWN_LINKS = [
  { label: "Contact Us", href: "/contact" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Our Pricing", href: "/pricing" },
  { label: "About Us", href: "/about" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [active, setActive] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLLIElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      if (pathname === "/") {
        const id = href.replace("#", "");
        const section = document.getElementById(id);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push("/" + href);
      }
    } else {
      router.push(href);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (pathname === "/") {
      const handleScroll = () => {
        let current = "";
        NAV_ITEMS.forEach((item) => {
          if (item.href.startsWith("#")) {
            const section = document.getElementById(item.id);
            if (section) {
              const rect = section.getBoundingClientRect();
              if (
                rect.top <= window.innerHeight / 2 &&
                rect.bottom >= window.innerHeight / 2
              ) {
                current = item.label;
              }
            }
          }
        });
        if (current) {
          setActive(current);
        } else {
          setActive("");
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }

    if (pathname === "/services") {
      setActive("Services");
    } else if (PAGES_DROPDOWN_LINKS.some((link) => link.href === pathname)) {
      setActive("Pages");
    } else {
      setActive("");
    }
  }, [pathname]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="fixed top-4 left-1/2 z-50 w-[90%] md:w-[85%] -translate-x-1/2 backdrop-blur-md"
      >
        <nav
          aria-label="Main navigation"
          className="flex items-center justify-between rounded-full border border-white/10 bg-[var(--color-black)]/75 px-6 py-3 shadow-lg"
        >
          {/* Logo + text */}
          <Link
            href="/"
            scroll
            className="group flex cursor-pointer items-center gap-2 text-xl font-bold"
          >
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-white/5">
              {/* yahan src ko apne actual logo path se change kar lena */}
              <Image
                src="/logo/logo.png"
                alt="BlackOS Software logo"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>
            <span className="text-white transition-colors duration-300 group-hover:text-[var(--color-primary)]">
              BlackOS
            </span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden items-center gap-8 text-sm font-medium md:flex">
            {NAV_ITEMS.map((item) =>
              item.label === "Pages" ? (
                <li
                  key={item.label}
                  ref={dropdownRef}
                  className="relative group"
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  onMouseLeave={() => setIsDropdownOpen(false)}
                >
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isDropdownOpen}
                    className={`flex items-center gap-1 cursor-pointer transition-colors duration-300 group-hover:text-[var(--color-primary)] ${
                      active === item.label
                        ? "text-[var(--color-primary)]"
                        : "text-white"
                    }`}
                    onClick={() => setIsDropdownOpen((prev) => !prev)}
                  >
                    <span className="relative">
                      {item.label}
                      <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-[var(--color-primary)] transition-all duration-300 group-hover:w-full" />
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.ul
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full mt-2 w-52 rounded-xl border border-white/10 bg-[var(--color-black)]/90 py-3 shadow-lg backdrop-blur-md"
                      >
                        {PAGES_DROPDOWN_LINKS.map((link) => (
                          <li key={link.label}>
                            <Link
                              href={link.href}
                              className="block px-4 py-2 text-sm text-white transition-colors hover:bg-[var(--color-primary)]/15 hover:text-[var(--color-primary)]"
                              onClick={() => setIsDropdownOpen(false)}
                            >
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.label} className="relative group">
                  <button
                    type="button"
                    onClick={() => handleNavClick(item.href)}
                    className={`cursor-pointer transition-colors duration-300 group-hover:text-[var(--color-primary)] ${
                      active === item.label
                        ? "text-[var(--color-primary)]"
                        : "text-white"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      <span
                        className={`absolute -bottom-1 left-0 h-[2px] bg-[var(--color-primary)] transition-all duration-300 ${
                          active === item.label
                            ? "w-full"
                            : "w-0 group-hover:w-full"
                        }`}
                      />
                    </span>
                  </button>
                </li>
              )
            )}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button onClick={() => router.push("/contact")}>
              Let&apos;s Talk ↗
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="text-white transition-colors duration-300 hover:text-[var(--color-primary)] md:hidden"
            onClick={() => setIsOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.aside
              className="fixed top-0 right-0 z-50 flex h-full w-[75%] flex-col justify-between bg-[var(--color-black)]/80 p-6 backdrop-blur-md"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35 }}
              aria-label="Mobile navigation"
            >
              <div>
                <button
                  type="button"
                  className="mb-8 self-end text-white transition-colors duration-300 hover:text-[var(--color-primary)]"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-7 w-7" />
                </button>

                <ul className="flex flex-col gap-6 text-lg font-medium">
                  {NAV_ITEMS.map((item) =>
                    item.label === "Pages" ? (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() =>
                            setIsMobileDropdownOpen((prev) => !prev)
                          }
                          className={`flex w-full items-center justify-between transition-colors ${
                            active === item.label
                              ? "text-[var(--color-primary)]"
                              : "text-white hover:text-[var(--color-primary)]"
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform ${
                              isMobileDropdownOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isMobileDropdownOpen && (
                            <motion.ul
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.25 }}
                              className="mt-2 ml-4 flex flex-col gap-3 border-l border-white/20 pl-4 text-base"
                            >
                              {PAGES_DROPDOWN_LINKS.map((link) => (
                                <li key={link.label}>
                                  <Link
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block text-white transition-colors hover:text-[var(--color-primary)]"
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </li>
                    ) : (
                      <li key={item.label}>
                        <button
                          type="button"
                          onClick={() => {
                            setIsOpen(false);
                            handleNavClick(item.href);
                          }}
                          className={`w-full text-left transition-colors duration-300 ${
                            active === item.label
                              ? "text-[var(--color-primary)]"
                              : "text-white hover:text-[var(--color-primary)]"
                          }`}
                        >
                          {item.label}
                        </button>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <Button
                onClick={() => {
                  setIsOpen(false);
                  router.push("/contact");
                }}
                className="mt-6 w-full"
              >
                Let&apos;s Talk ↗
              </Button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
