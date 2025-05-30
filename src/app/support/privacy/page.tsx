"use server";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12 text-gray-800">
      <h1 className="mb-6 text-3xl font-bold">Privacy Policy</h1>
      <p className="mb-8 text-sm text-gray-500">Effective Date: May 27, 2025</p>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">1. Scope</h2>
        <p>
          This Privacy Policy applies to both the{" "}
          <strong>MESA Connect Website</strong> and the{" "}
          <strong>MESAMobile App</strong>. Both platforms use the same backend
          systems and follow the same data handling practices.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">
          2. Information We Collect
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Personal Information:</strong> Name, email, phone number,
            school-related data.
          </li>
          <li>
            <strong>Authentication Information:</strong> Google or Apple login
            credentials (via OAuth).
          </li>
          <li>
            <strong>Device & Technical Info:</strong> Device type, OS, IP
            address, usage data.
          </li>
          <li>
            <strong>Communication Data:</strong> Messages, feedback, and support
            communications.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">
          3. How We Use Your Information
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To provide and improve services</li>
          <li>To authenticate and manage user sessions</li>
          <li>To personalize the user experience</li>
          <li>To analyze usage and performance with Vercel Analytics</li>
          <li>To communicate via email using Resend</li>
          <li>To support safety and verify academic affiliations</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">4. Information Sharing</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>
            <strong>Service Providers:</strong> We use Supabase, Notion API,
            Vercel Analytics, and Resend.
          </li>
          <li>
            <strong>Partnered Colleges:</strong> We may share data with
            registered institutions upon verified request for safety and
            verification purposes.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may share data if required
            by law or for security.
          </li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">5. Data Security</h2>
        <p>
          We implement industry-standard measures to protect your information.
          However, no method of transmission over the internet is completely
          secure.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">6. Your Rights</h2>
        <p>
          You may have rights to access, update, delete, or restrict use of your
          personal data. Please contact us at{" "}
          <a
            href="mailto:joshrashtian1@gmail.com"
            className="text-blue-600 underline"
          >
            joshrashtian1@gmail.com
          </a>
          .
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">7. Cookies and Tracking</h2>
        <p>
          We use cookies and similar technologies for session management,
          analytics, and improving your experience. You can modify settings in
          your browser or device.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">8. Children’s Privacy</h2>
        <p>
          MESA is not intended for children under 13. We do not knowingly
          collect information from children without parental consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">
          9. Changes to This Policy
        </h2>
        <p>
          We may update this Privacy Policy from time to time. Changes will be
          reflected by the &quot;Effective Date&quot; and may be communicated
          via the app or website.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-2 text-2xl font-semibold">10. Contact Us</h2>
        <p>
          If you have any questions or concerns, please contact: <br />
          <strong>Josh Rashtian</strong> <br />
          📧{" "}
          <a
            href="mailto:joshrashtian1@gmail.com"
            className="text-blue-600 underline"
          >
            joshrashtian1@gmail.com
          </a>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
