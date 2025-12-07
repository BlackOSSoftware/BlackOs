"use client";

import React from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Image from "next/image";

import "swiper/css";
import "swiper/css/pagination";
import Button from "../Reuse/button";

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            className="relative max-w-7xl mx-auto bg-[var(--color-black)] text-[var(--color-white)] py-24"
        >
            <div className="container mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

                {/* LEFT CONTENT */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="space-y-6"
                >
                    <h2 className="text-3xl md:text-5xl font-extrabold leading-tight">
                        About{" "}
                        <span className="text-[var(--color-primary)]">BlackOS</span>
                    </h2>

                    <p className="text-lg md:text-xl leading-relaxed text-gray-300">
                        At BlackOS Software Solution, we empower brands and businesses
                        with{" "}
                        <span className="text-[var(--color-primary)] font-semibold">
                            innovative digital products
                        </span>{" "}
                        and{" "}
                        <span className="text-[var(--color-accent)] font-semibold">
                            modern technology solutions
                        </span>
                        .  
                        We build scalable, secure, and future-ready systems that accelerate 
                        growth and create meaningful digital impact.
                    </p>

                    <Button className="px-8 py-4 text-[16px]">
                        Learn More ↗
                    </Button>
                </motion.div>

                {/* RIGHT IMAGE SLIDER */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="
                        relative w-full rounded-3xl overflow-hidden shadow-2xl 
                        border border-gray-800 
                        bg-gradient-to-br from-[#1a1a1a] to-[#0e0e0e]
                        hover:border-[var(--color-primary)] 
                        transition duration-300
                    "
                >
                    {/* Gradient Border Glow */}
                    <div className="absolute inset-0 rounded-3xl border border-transparent hover:border-[var(--color-primary)]/40 transition duration-300"></div>

                    <Swiper
                        modules={[Autoplay, Pagination]}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        pagination={{ clickable: true }}
                        loop
                        className="w-full h-[330px] md:h-[420px] lg:h-[460px]"
                    >
                        {/* HIGH-QUALITY PROFESSIONAL UNSPLASH IMAGES */}

                        <SwiperSlide>
                            <Image
                                src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Modern Tech Workspace"
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                                priority
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <Image
                                src="https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Team Collaboration"
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <Image
                                src="https://images.unsplash.com/photo-1521790361543-f645cf042ec4?q=80&w=1920&auto=format&fit=crop"
                                alt="Digital Innovation"
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>

                        <SwiperSlide>
                            <Image
                                src="https://images.unsplash.com/photo-1649521712353-e3661b4d42f4?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                alt="Software Engineering"
                                width={800}
                                height={500}
                                className="w-full h-full object-cover"
                            />
                        </SwiperSlide>
                    </Swiper>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutSection;
