import React from "react";
import { Helmet } from "react-helmet";
import Navbar from "./Navbar";
import Footer from "./header and footer/Footer";

const ContactUs = () => {
  return (
    <div>
      <Helmet>
        <title>Contact Us | StuHub LMS</title>
        <meta
          name="description"
          content="Get in touch with StuHub LMS for any queries, feedback, or support."
        />
        <link
          rel="canonical"
          href="https://stu-hub-front-end.vercel.app/contact-us"
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              "name": "Contact Us",
              "url": "https://stu-hub-front-end.vercel.app/contact-us",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-9876543210",
                "contactType": "Customer Service",
                "email": "support@stu-hub.com",
                "areaServed": "IN",
                "availableLanguage": ["English", "Hindi"]
              },
              "publisher": {
                "@type": "Organization",
                "name": "StuHub LMS"
              }
            }
          `}
        </script>
      </Helmet>
      <Navbar page="contact-us" />
      <div className="policy-page">
        <h2>Contact Us</h2>
        <p>Feel free to reach out to us with your queries, feedback, or suggestions.</p>
        <div className="contact-details">
          <p><strong>Email:</strong> <a href="mailto:support@stu-hub.com">support@stu-hub.com</a></p>
          <p><strong>Phone:</strong> <a href="tel:+919876543210">+91-9876543210</a></p>
          <p><strong>Address:</strong> StuHub Pvt. Ltd., Sector 5, Noida, Uttar Pradesh, India</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;