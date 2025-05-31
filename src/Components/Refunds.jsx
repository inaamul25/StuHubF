import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";

function Refunds() {
  return (
    <div>
      <Helmet>
        <title>Refund Policy | StuHub LMS</title>
        <meta name="description" content="Learn about the refund and cancellation policies of StuHub LMS." />
        <link rel="canonical" href="https://stu-hub-front-end.vercel.app/refunds" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebPage",
              "name": "Refund Policy",
              "url": "https://stu-hub-front-end.vercel.app/refunds",
              "description": "Refunds are available within 7 days of purchase. Email us at support@stu-hub.com.",
              "publisher": {
                "@type": "Organization",
                "name": "StuHub LMS"
              }
            }
          `}
        </script>
      </Helmet>
      <Navbar page="refunds" />
      <div className="policy-page">
        <h2>Cancellations and Refunds</h2>
        <p>Refunds are available within 7 days of purchase, provided no course progress has been made.</p>
        <p>To request a refund, email us at <a href="mailto:support@stu-hub.com">support@stu-hub.com</a>.</p>
        <p>Processing time: 5–7 business days. No refunds once course access has been utilized.</p>
      </div>
      <Footer />
    </div>
  );
}

export default Refunds;