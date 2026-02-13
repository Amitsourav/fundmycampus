"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Database, Share2, UserCheck, Lock, ExternalLink, Users, Globe, RefreshCw } from "lucide-react";
import { fadeInUp, staggerContainer, staggerItem } from "@/lib/animations";

const sections = [
  {
    id: "introduction",
    icon: Shield,
    title: "1. Introduction",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Welcome to FundMyCampus. We respect your privacy and are committed to protecting your personal data.
        This privacy policy explains how we collect, use, and safeguard your information when you use our
        website and services.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    icon: Database,
    title: "2. Information We Collect",
    content: (
      <div className="space-y-6">
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Personal Information</h4>
          <p className="text-gray-700 leading-relaxed mb-3">
            We may collect the following personal information when you interact with our services:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Name and contact information (email address, phone number)</li>
            <li>Academic qualifications and educational background</li>
            <li>Career interests and goals</li>
            <li>Documents uploaded for review (CV, SOP, transcripts)</li>
            <li>Payment information (processed securely through third-party payment processors)</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Non-Personal Information</h4>
          <p className="text-gray-700 leading-relaxed mb-3">
            We automatically collect certain non-personal information, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>IP address and device information</li>
            <li>Browser type and version</li>
            <li>Pages visited and time spent on our website</li>
            <li>Referral sources</li>
            <li>Usage patterns and preferences</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Cookies and Tracking Technologies</h4>
          <p className="text-gray-700 leading-relaxed">
            We use cookies and similar technologies to enhance your browsing experience, analyze website
            traffic, and personalize content. You can control cookie settings through your browser preferences.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "3. How We Use Your Information",
    content: (
      <div>
        <p className="text-gray-700 leading-relaxed mb-3">
          We use the collected information for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Provide academic counseling and consultation services</li>
          <li>Process applications and document reviews</li>
          <li>Communicate with you about our services and updates</li>
          <li>Improve our website functionality and user experience</li>
          <li>Conduct research and analytics to enhance our services</li>
          <li>Comply with legal obligations and prevent fraud</li>
          <li>Send marketing communications (with your consent)</li>
        </ul>
      </div>
    ),
  },
  {
    id: "information-sharing",
    icon: Share2,
    title: "4. Information Sharing and Disclosure",
    content: (
      <div>
        <p className="text-gray-700 leading-relaxed mb-3">
          We may share your information in the following circumstances:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li><span className="font-semibold text-gray-900">Service Providers:</span> With trusted third-party service providers who assist us in operating our business</li>
          <li><span className="font-semibold text-gray-900">Legal Requirements:</span> When required by law, court order, or government investigation</li>
          <li><span className="font-semibold text-gray-900">Business Transfers:</span> In connection with a merger, acquisition, or sale of assets</li>
          <li><span className="font-semibold text-gray-900">Consent:</span> With your explicit consent for specific purposes</li>
          <li><span className="font-semibold text-gray-900">Safety:</span> To protect the safety and security of our users and services</li>
        </ul>
      </div>
    ),
  },
  {
    id: "your-rights",
    icon: UserCheck,
    title: "5. Your Rights and Choices",
    content: (
      <div>
        <p className="text-gray-700 leading-relaxed mb-3">
          You have the following rights regarding your personal information:
        </p>
        <ul className="space-y-3 text-gray-700">
          <li><span className="font-semibold text-gray-900">Access:</span> Request access to your personal information</li>
          <li><span className="font-semibold text-gray-900">Correction:</span> Request correction of inaccurate or incomplete data</li>
          <li><span className="font-semibold text-gray-900">Deletion:</span> Request deletion of your personal information</li>
          <li><span className="font-semibold text-gray-900">Portability:</span> Request a copy of your data in a portable format</li>
          <li><span className="font-semibold text-gray-900">Opt-out:</span> Unsubscribe from marketing communications</li>
          <li><span className="font-semibold text-gray-900">Restriction:</span> Request restriction of processing in certain circumstances</li>
        </ul>
      </div>
    ),
  },
  {
    id: "data-security",
    icon: Lock,
    title: "6. Data Security",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We implement appropriate technical and organizational security measures to protect your personal
        information against unauthorized access, alteration, disclosure, or destruction. However, no method
        of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
      </p>
    ),
  },
  {
    id: "third-party-links",
    icon: ExternalLink,
    title: "7. Third-Party Links",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Our website may contain links to third-party websites. We are not responsible for the privacy
        practices or content of these external sites. We encourage you to review their privacy policies
        before providing any personal information.
      </p>
    ),
  },
  {
    id: "childrens-privacy",
    icon: Users,
    title: "8. Children's Privacy",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Our services are not intended for children under 13 years of age. We do not knowingly collect
        personal information from children under 13. If we become aware that we have collected such
        information, we will take steps to delete it promptly.
      </p>
    ),
  },
  {
    id: "international-transfers",
    icon: Globe,
    title: "9. International Data Transfers",
    content: (
      <p className="text-gray-700 leading-relaxed">
        Your information may be transferred to and processed in countries other than your own. We ensure
        appropriate safeguards are in place to protect your information in accordance with this privacy
        policy and applicable laws.
      </p>
    ),
  },
  {
    id: "changes",
    icon: RefreshCw,
    title: "10. Changes to This Privacy Policy",
    content: (
      <p className="text-gray-700 leading-relaxed">
        We may update this privacy policy from time to time to reflect changes in our practices or for
        legal, operational, or regulatory reasons. We will notify you of any material changes by posting
        the updated policy on our website and updating the &quot;Last Updated&quot; date.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
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
              Privacy Policy
            </h1>
            <p className="text-xl text-gray-800">
              Your privacy matters to us. Learn how FundMyCampus collects, uses, and protects your personal information.
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Last Updated: February 2026
            </p>
          </motion.div>
        </div>
      </section>

      {/* Policy Content */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto space-y-8"
          >
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.id}
                  variants={staggerItem}
                  className="bg-gray-50 rounded-2xl p-6 md:p-8"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-primary-100 rounded-lg flex-shrink-0">
                      <Icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-gray-900">
                      {section.title}
                    </h3>
                  </div>
                  {section.content}
                </motion.div>
              );
            })}

            {/* Agreement Notice */}
            <motion.div
              variants={staggerItem}
              className="bg-primary-50 border border-primary-200 rounded-2xl p-6 md:p-8 text-center"
            >
              <p className="text-gray-700 leading-relaxed">
                By using our website and services, you acknowledge that you have read and understood this
                privacy policy and agree to the collection, use, and disclosure of your information as
                described herein.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
