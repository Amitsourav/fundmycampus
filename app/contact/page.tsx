"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { FAQ } from "@/components/ui/FAQ";
import { fadeInUp } from "@/lib/animations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "abroad",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";
      const res = await fetch(`${API_URL}/api/v1/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          loan_type: formData.loanType,
        }),
      });
      if (!res.ok) throw new Error("Submission failed. Please try again.");
      setSuccess(true);
      setFormData({ name: "", email: "", phone: "", loanType: "abroad", message: "" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 78272 25354"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["contact@fundmycampus.com"],
    },
    {
      icon: MapPin,
      title: "Address",
      details: ["123, Financial District", "Mumbai, Maharashtra 400001"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Monday - Friday: 9:00 AM - 7:00 PM", "Saturday: 10:00 AM - 5:00 PM"],
    },
  ];

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-4xl md:text-5xl font-display font-bold text-gray-900 mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-gray-800">
              Have questions about education loans? Our expert team is here to help you 
              navigate your financing options.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <Card padding="lg">
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-5">
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
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
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                        placeholder="+91 78272 25354"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Type
                    </label>
                    <select
                      name="loanType"
                      value={formData.loanType}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition"
                    >
                      <option value="abroad">Study Abroad Loan</option>
                      <option value="india">Study in India Loan</option>
                      <option value="both">Not Sure / Need Guidance</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition resize-none"
                      placeholder="Tell us about your education plans and loan requirements..."
                    />
                  </div>

                  <Button type="submit" variant="primary" size="lg" fullWidth disabled={loading || success}>
                    {loading ? "Sending..." : success ? "Message Sent!" : "Send Message"}
                    {!loading && !success && <Send className="ml-2 h-5 w-5" />}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-gray-800 mb-8">
                  Reach out to us through any of the following channels. 
                  Our team typically responds within 24 hours.
                </p>
              </div>

              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <Card key={index} padding="md">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary-100 rounded-lg flex-shrink-0">
                        <Icon className="h-6 w-6 text-primary-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-gray-800 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}

            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQ
        title="Contact & Support FAQs"
        subtitle="Common questions about getting help with your education loan"
        faqs={[
          {
            question: "How quickly will I get a response to my inquiry?",
            answer: "We aim to respond to all inquiries within 24 hours on business days. For urgent loan-related queries, you can call our helpline for immediate assistance. Email responses are typically sent within 4-6 hours during business hours."
          },
          {
            question: "What information should I include in my inquiry?",
            answer: "Please include your full name, contact number, the course and college you're interested in, approximate loan amount needed, and any specific questions. This helps us provide accurate and relevant information quickly."
          },
          {
            question: "Can I visit your office for in-person consultation?",
            answer: "Yes, we welcome in-person consultations. Please schedule an appointment through our contact form or phone to ensure a counselor is available. Walk-ins are also accepted during business hours but may involve waiting."
          },
          {
            question: "Do you charge for consultation services?",
            answer: "No, our consultation services are completely free. We help you understand your loan options, compare lenders, and guide you through the application process at no cost. We're compensated by partner lenders upon successful disbursement."
          },
          {
            question: "Can you help if I'm having issues with my existing loan?",
            answer: "While we primarily help with new loan applications, we can provide guidance on issues like EMI restructuring, prepayment, and documentation problems. Contact us with your specific concern, and we'll try to assist or direct you appropriately."
          },
          {
            question: "What are your support hours?",
            answer: "Our support team is available Monday to Saturday, 9:00 AM to 7:00 PM IST. For urgent queries outside these hours, you can email us and we'll respond first thing the next business day."
          }
        ]}
      />
    </div>
  );
}