import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <div className="bg-[#121212] text-white py-12 px-4">
      <div className="container mx-auto">
        {/* Logo and Slogan Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <a href="https://cybersapient.io">
            <img
              src="https://cybersapient.io/wp-content/uploads/2023/02/logo-cybersapient.png"
              alt="footer logo"
              className="h-12 mx-auto md:mx-0"
            />
          </a>
          <h3 className="text-xl font-light">Phenomenal Success. Delivered.</h3>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center md:justify-center gap-4 mt-8 text-sm">
          {[
            { name: "Home", link: "https://cybersapient.io/" },
            { name: "About Us", link: "https://cybersapient.io/about-us/" },
            { name: "Careers", link: "https://talents.cybersapient.io/jobs/" },
            {
              name: "Contact",
              link: "https://cybersapient.io/company/contact/",
            },
            { name: "Services", link: "https://cybersapient.io/services/" },
            { name: "Works", link: "https://cybersapient.io/works/" },
            {
              name: "Data-Intensive Apps",
              link: "https://cybersapient.io/data-intensive-apps/",
            },
            { name: "Insights", link: "https://cybersapient.io/insights/" },
          ].map((item) => (
            <a
              key={item.name}
              href={item.link}
              className="hover:underline text-gray-300"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Contact Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-6 gap-x-4 mt-12 text-center md:text-left">
          <div>
            <h6 className="text-sm text-gray-400 mb-2">LOCATIONS</h6>
            <h4 className="text-lg">Bangalore, Kochi, Dubai, KSA</h4>
          </div>
          <div>
            <h6 className="text-sm text-gray-400 mb-2">ENQUIRIES</h6>
            <a
              href="mailto:hello@cybersapient.io"
              className="text-lg hover:underline"
            >
              hello@cybersapient.io
            </a>
          </div>
          <div>
            <h6 className="text-sm text-gray-400 mb-2">FOLLOW</h6>
            <div className="flex justify-center md:justify-start space-x-4">
              <a
                href="https://www.facebook.com/cybersapient.io"
                target="_blank"
              >
                <FaFacebookF className="text-xl hover:text-blue-500" />
              </a>
              <a href="https://twitter.com/Cyber_Sapient_" target="_blank">
                <FaTwitter className="text-xl hover:text-blue-400" />
              </a>
              <a
                href="https://www.instagram.com/cybersapient.io/"
                target="_blank"
              >
                <FaInstagram className="text-xl hover:text-pink-500" />
              </a>
              <a
                href="https://www.linkedin.com/company/cybersapient/"
                target="_blank"
              >
                <FaLinkedinIn className="text-xl hover:text-blue-700" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="border-t border-gray-700 mt-10 pt-6 text-center text-sm">
          <p>
            Copyright © 2023 All rights reserved, Cybersapient Technologies |
            powered by
            <a
              href="https://dcod.co/"
              target="_blank"
              className="hover:underline ml-1"
            >
              DCOD
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
