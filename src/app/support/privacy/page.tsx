import React from "react";
import "./privacy.css";
const PrivacyPage = () => {
  return (
    <div className="privacy-page font-eudoxus">
      <h1>Privacy Policy for MESA Connect</h1>
      <p>
        <strong>Effective Date:</strong> 30th April 2025
      </p>

      <p>
        MESA Connect (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) values
        your privacy. This Privacy Policy explains how we collect, use, and
        protect your personal information when you use our website and services.
      </p>

      <h2>1. Information We Collect</h2>
      <ul>
        <li>
          <strong>Personal Information:</strong> Name, email, phone number, and
          school-related information that you choose to submit.
        </li>
        <li>
          <strong>Device & Usage Data:</strong> IP address, browser type, device
          details, and usage patterns collected via Vercel Analytics.
        </li>
        <li>
          <strong>Authentication Data:</strong> Information from third-party
          login providers like Apple and Google.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <ul>
        <li>To provide and maintain our services</li>
        <li>To authenticate users and manage accounts</li>
        <li>To analyze user behavior for improvements</li>
        <li>To send communications via email (Resend)</li>
        <li>To respond to support inquiries</li>
      </ul>

      <h2>3. Third-Party Services</h2>
      <p>
        We use the following third-party services, which may process your data
        under their own privacy terms:
      </p>
      <ul>
        <li>Supabase (backend and authentication)</li>
        <li>Notion API (content management)</li>
        <li>Resend (email delivery)</li>
        <li>Vercel Analytics (site usage tracking)</li>
        <li>Apple and Google login services (authentication)</li>
      </ul>

      <h2>4. Sharing of Information</h2>
      <p>
        We do not sell or rent your personal information. We may share your data
        with service providers or if required by law.
      </p>

      <h2>5. Cookies and Tracking</h2>
      <p>
        We use cookies and similar technologies for performance and analytics.
        You may manage cookie preferences through your browser settings.
      </p>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable safeguards to protect your data, but no method
        of transmission over the internet is entirely secure.
      </p>

      <h2>7. Data Retention</h2>
      <p>
        We retain personal data as long as necessary to fulfill the purposes
        outlined or comply with legal obligations.
      </p>

      <h2>8. Children’s Privacy</h2>
      <p>
        MESA Connect is not intended for children under 13. We do not knowingly
        collect data from children without parental consent.
      </p>

      <h2>9. Your Rights</h2>
      <p>
        You may have the right to access, correct, delete, or restrict the use
        of your data. To exercise these rights, contact us at{" "}
        <a href="mailto:joshrashtian1@gmail.com">joshrashtian1@gmail.com</a>.
      </p>

      <h2>10. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy periodically. The latest version will
        always be available on this page.
      </p>

      <h2>11. Contact Us</h2>
      <p>
        If you have questions or concerns about this Privacy Policy, please
        contact us:
      </p>
      <p>
        Email:{" "}
        <a href="mailto:joshrashtian1@gmail.com">joshrashtian1@gmail.com</a>
      </p>
    </div>
  );
};

export default PrivacyPage;
