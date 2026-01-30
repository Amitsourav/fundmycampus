"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { fadeInUp } from "@/lib/animations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    loanType: "abroad",
    message: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: ["+91 98765 43210", "+91 98765 43211"],
    },
    {
      icon: Mail,
      title: "Email",
      details: ["info@fundmycampus.com", "support@fundmycampus.com"],
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
            <p className="text-xl text-gray-600">
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
                        placeholder="+91 98765 43210"
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

                  <Button type="submit" variant="primary" size="lg" fullWidth>
                    Send Message
                    <Send className="ml-2 h-5 w-5" />
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
                <p className="text-gray-600 mb-8">
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
                          <p key={idx} className="text-gray-600 text-sm">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </div>
                  </Card>
                );
              })}

              {/* FAQ Link */}
              <Card padding="md" className="bg-gradient-to-br from-primary-50 to-white border-primary-200">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Frequently Asked Questions
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Find quick answers to common questions about education loans.
                </p>
                <Button variant="ghost" size="sm">
                  View FAQs
                </Button>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}