import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";

function Privacy() {
  return (
    <div>
      <Helmet>
        <title>Privacy Policy | StuHub LMS</title>
        <meta name="description" content="This Privacy Policy explains how StuHub LMS collects, uses, and protects your personal information." />
        <link rel="canonical" href="https://stu-hub-front-end.vercel.app/privacy" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "url": "https://stu-hub-front-end.vercel.app/privacy",
            "description": "This Privacy Policy explains how StuHub LMS collects, uses, and protects your personal information.",
            "publisher": {
              "@type": "Organization",
              "name": "StuHub LMS"
            }
          }
          `}
        </script>
      </Helmet>
      <Navbar page="privacy" />
      <div className="policy-page">
        <h2>Privacy Policy</h2>
        <p>Last updated: April 21, 2025</p>
        <p>We collect your name, email, and payment details to process transactions and improve our platform. All personal information is stored securely and never shared with third parties without your consent, except as required by law.</p>
        <p>You have the right to access, modify, or delete your data anytime. Contact us at <a href="mailto:support@stu-hub.com">support@stu-hub.com</a>.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Privacy;