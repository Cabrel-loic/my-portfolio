"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormStatus {
  type: "success" | "error" | "loading" | null;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<FormStatus>({ type: null, message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch(
        "http://localhost:8000/api/contacts/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setStatus({
          type: "success",
          message: "✨ Thank you! Your message has been sent successfully.",
        });
        setFormData({ name: "", email: "", subject: "", message: "" });

        // Clear success message after 5 seconds
        setTimeout(() => {
          setStatus({ type: null, message: "" });
        }, 5000);
      } else {
        const errorData = await response.json();
        setStatus({
          type: "error",
          message:
            errorData.detail || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to send message. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-12">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          <span className="gradient-text">Get In Touch</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Have a project in mind? Let's collaborate and create something extraordinary together.
        </p>
      </div>

      {/* Contact Container */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Side - Contact Info & Map */}
        <div className="space-y-8">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            {/* Address */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 group-hover:shadow-lg transition-shadow">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Address
                </h3>
                <p className="text-gray-600">
                  <a
                    href="https://maps.app.goo.gl/J7XVCfuRAar8PMcYA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    View location on Google Maps
                  </a>
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 group-hover:shadow-lg transition-shadow">
                  <Phone className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Call Us
                </h3>
                <p className="text-gray-600">+1 5589 55488 55</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 group">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 group-hover:shadow-lg transition-shadow">
                  <Mail className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  Email Us
                </h3>
                <p className="text-gray-600">loickemloung@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-lg h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.8234456789!2d-74.2234567!3d40.7456789!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25a22b8c8c8c9%3A0x5c5c5c5c5c5c5c5c!2sNew%20York%2C%20NY!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            />
            {/* Clickable overlay to open Google Maps in new tab */}
            <a
              href="https://maps.app.goo.gl/J7XVCfuRAar8PMcYA"
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 cursor-pointer z-10 hover:bg-black/5 transition-colors duration-200 flex items-center justify-center group"
              title="Click to open location in Google Maps"
            >
              <div className="bg-white/90 px-4 py-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-sm font-medium text-gray-700 flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Open in Google Maps
              </div>
            </a>
          </div>
        </div>

        {/* Right Side - Contact Form */}
        <div>
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Success/Error Message */}
              {status.type && (
                <div
                  className={`p-4 rounded-xl flex gap-3 animate-fade-in ${
                    status.type === "success"
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                  )}
                  <p
                    className={
                      status.type === "success"
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    {status.message}
                  </p>
                </div>
              )}

              {/* Name Input */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Email Input */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Subject Input */}
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Project Inquiry"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Message Input */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold text-gray-900 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project..."
                  rows={5}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none text-gray-900 placeholder-gray-400"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-5 w-5" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-center text-sm text-gray-500">
                We'll respond within 24 hours
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
