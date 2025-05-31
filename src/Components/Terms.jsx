import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";

function Terms() {
  return (
    <div>
      <Helmet>
        <title>Terms and Conditions | StuHub LMS</title>
        <meta name="description" content="Read the terms and conditions for using StuHub LMS." />
        <link rel="canonical" href="https://stu-hub-front-end.vercel.app/terms" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Terms and Conditions",
              "url": "https://stu-hub-front-end.vercel.app/terms",
              "description": "Terms and conditions for using StuHub LMS platform.",
              "publisher": {
                "@type": "Organization",
                "name": "StuHub LMS"
              }
            }
          `}
        </script>
      </Helmet>
      <Navbar page="terms" />
      <div className="policy-page">
        <h2>Terms and Conditions</h2>
        <p>Last updated: April 21, 2025</p>
        <p>By using StuHub LMS, you agree to our terms of service. Enrollment in any course implies agreement to our payment and refund policies.</p>
        <p>No refunds are offered after 7 days or after course access begins. For the full policy, please contact us at <a href="mailto:support@stu-hub.com">support@stu-hub.com</a>.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Terms;