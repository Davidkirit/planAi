"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import NavBar from "../components/nav";

export default function Home() {
  const [theme, setTheme] = useState("light");
  const isDark = theme === "dark";
  const router = useRouter();

  const handleGetstarted = () => {
    router.push("/welcome");
  };

  // Sync theme with local storage to persist across reloads
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={`transition-all duration-500 ${
        theme === "dark"
          ? "bg-gray-900 text-gray-200"
          : "bg-white text-gray-900"
      } min-h-screen`}
    >
      <NavBar theme={theme} setTheme={setTheme} />

      {/* Hero Section */}
      <header
        className={`flex flex-col items-center justify-center text-center p-20 mt-16 transition-all duration-500 ${
          isDark ? "bg-gray-800 text-gray-300" : "bg-white text-gray-900"
        }`}
      >
        <h2 className="text-4xl font-bold mb-4">Plan Your Future</h2>
        <p className="text-lg max-w-2xl">
          Start writing and organizing your plans effectively. Our tool helps
          you structure your thoughts and goals easily.
        </p>
        <button
          onClick={handleGetstarted}
          className={`mt-6 px-6 py-3 rounded-lg shadow-md transition-all duration-300 ${
            isDark
              ? "bg-blue-600 text-gray-200 hover:bg-blue-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          Get Started
        </button>
      </header>

      {/* About Section */}
      <section
        id="about"
        className={`py-20 px-8 text-center transition-all duration-500 ${
          isDark ? "text-gray-300" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6 tracking-wide">
            About Us
          </h2>
          <p className="text-lg leading-relaxed">
            PlanAi is the ultimate digital journal designed to help you set and
            achieve your goals efficiently. Whether you're organizing your
            thoughts, tracking progress, or planning for the future, our
            AI-powered platform provides structured assistance tailored to your
            needs.
          </p>
        </div>

        {/* Decorative Element */}
        <div className="mt-10 flex justify-center">
          <div className="w-24 h-1 bg-blue-600 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className={`py-20 px-8 text-center transition-all duration-500 ${
          isDark ? "bg-gray-800" : "bg-white text-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6 tracking-wide">
            What You Can Expect
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            PlanAi is designed to help you streamline your thoughts, set clear
            goals, and stay organized with AI-powered assistance. Here’s what
            you’ll experience:
          </p>

          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">📝</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Smart Planning
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Create, edit, and organize your notes effortlessly with an
                  intuitive interface.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">📅</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  AI-Powered Reminders
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Get intelligent notifications to keep track of your goals and
                  deadlines.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">📊</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Progress Tracking
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Monitor your achievements over time with insightful analytics.
                </p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">🔒</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Privacy & Security
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Your data is encrypted and secure, ensuring your thoughts
                  remain private.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className={`py-20 px-8 text-center transition-all duration-500 ${
          isDark ? "text-gray-300" : "bg-gray-100 text-gray-900"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-extrabold text-blue-600 mb-6 tracking-wide">
            Get in Touch
          </h2>
          <p className="text-lg leading-relaxed mb-8">
            We’d love to hear from you! Whether you have questions, feedback, or
            need assistance, our team is here to help.
          </p>

          {/* Contact Details */}
          <div className="grid md:grid-cols-2 gap-8 text-left">
            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">📧</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Email Support
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Send us an email anytime and we’ll get back to you within 24
                  hours.
                </p>
                <a
                  href="mailto:davidbabs016@gmail.com"
                  className="text-blue-500 underline mt-2 block"
                >
                  davidbabs016@gmail.com
                </a>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">📞</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Call or Text
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Need urgent help? Reach out to our team directly.
                </p>
                <p className="text-blue-500 mt-2">+(234) 704-561-5525</p>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">💬</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Live Chat
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Chat with us in real time for quick support.
                </p>
                <button className="text-blue-500 underline mt-2">
                  Start Chat
                </button>
              </div>
            </div>

            <div className="p-6 bg-white dark:bg-gray-900 rounded-xl shadow-md flex items-start space-x-4">
              <span className="text-blue-600 text-2xl">🌍</span>
              <div>
                <h3 className="font-semibold text-xl text-gray-900 dark:text-gray-100">
                  Follow Us
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Stay updated on our latest features and updates.
                </p>
                <div className="flex space-x-4 mt-2">
                  <a
                    href="https://x.com/Kirito_on_X"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Twitter
                  </a>
                  <a
                    href="https://www.linkedin.com/in/david-babalola-096510258?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://t.me/KiritoRebirth"
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    Telegram
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
