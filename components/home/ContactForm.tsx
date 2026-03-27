"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Send, Instagram, MessageCircle, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";

const socialLinks = [
  {
    icon: Instagram,
    label: "Instagram",
    description: "Follow us for tips & updates",
    href: "https://instagram.com/fundmycampus",
    color: "bg-gradient-to-br from-pink-500 to-purple-600",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp Community",
    description: "Join 5,000+ students",
    href: "https://chat.whatsapp.com/Ex1huVZeeGR8NWbeHrVGYP",
    color: "bg-green-500",
  },
  {
    icon: Send,
    label: "Telegram Community",
    description: "Get instant loan updates",
    href: "https://t.me/fundmycampus",
    color: "bg-blue-500",
  },
];

const contactDetails = [
  {
    icon: Phone,
    label: "+91 78272 25354",
    href: "tel:+917827225354",
  },
  {
    icon: Mail,
    label: "contact@fundmycampus.com",
    href: "mailto:contact@fundmycampus.com",
  },
  {
    icon: MapPin,
    label: "Delhi, India",
    href: "#",
  },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const res = await fetch(`${API_URL}/api/v1/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="py-10 md:py-12 bg-gradient-to-br from-gray-50 via-white to-teal-50/30">
      <div className="max-w-screen-xl mx-auto px-6 md:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
            Get Started Today
          </h2>
          <p className="text-gray-800 max-w-2xl mx-auto">
            Fill in your details and our education loan experts will get back to you within 24 hours
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Left - Form */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5">
              {success && (
                <div className="p-4 bg-teal-50 border border-teal-200 rounded-xl text-sm text-teal-800 font-medium">
                  ✅ Thank you! Our team will get back to you within 24 hours.
                </div>
              )}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-700">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                  placeholder="Enter your full name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    placeholder="+91 78272 25354"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-gray-400">(Optional)</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                  placeholder="Tell us about your education plans..."
                />
              </div>

              <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading || success}>
                {loading ? "Submitting..." : success ? "Submitted!" : "Submit Enquiry"}
                {!loading && !success && <Send className="ml-2 h-5 w-5" />}
              </Button>
            </form>
          </motion.div>

          {/* Right - Social Links & Contact */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="space-y-6"
          >
            {/* Social Communities */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Join Our Community</h3>
              <div className="space-y-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 bg-white rounded-xl border border-gray-100 shadow-sm p-4 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
                    >
                      <div className={`${social.color} p-3 rounded-xl flex-shrink-0`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-black">{social.label}</p>
                        <p className="text-sm text-gray-500">{social.description}</p>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-semibold text-black mb-4">Contact Us Directly</h3>
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-5 space-y-4">
                {contactDetails.map((detail, index) => {
                  const Icon = detail.icon;
                  return (
                    <a
                      key={index}
                      href={detail.href}
                      className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition-colors"
                    >
                      <Icon className="h-5 w-5 text-teal-500 flex-shrink-0" />
                      <span className="text-sm">{detail.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Note */}
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-5">
              <p className="text-sm text-teal-800 leading-relaxed">
                <span className="font-semibold">Free Consultation</span> — Our education loan experts provide completely free guidance. No hidden charges, no obligations. We help you find the best loan for your profile.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
