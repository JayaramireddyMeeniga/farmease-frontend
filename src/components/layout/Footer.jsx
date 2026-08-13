import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-[#796654] text-white p-8 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">FarmEase</h3>
          <p className="text-gray-300">
            Your one-stop solution for all farming needs. Rent machines, buy seeds, and connect with dealers effortlessly.
          </p>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-50 hover:text-yellow-100 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-50 hover:text-yellow-100 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faTwitter} size="lg" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-50 hover:text-yellow-100 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-50 hover:text-yellow-100 transition-colors duration-300"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </a>
          </div>
        </div>

        {/* <div>
          <h3 className="text-2xl font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {[
              { path: "/dashboard", label: "Dashboard" },
              { path: "/cropManagement", label: "Crop Management" },
              { path: "/irrigation", label: "Irrigation Management" },
              { path: "/cropRotation", label: "Crop Rotation Planner" },
              { path: "/tips", label: "Agricultural Tips" },
              { path: "/communityForum", label: "Community Forum" },
              { path: "/home", label: "Marketplace" },
            ].map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div> */}

        <div>
          <h3 className="text-2xl font-bold mb-4">Contact Us</h3>
          <ul className="space-y-2">
            <li className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
              123 Farm Street, AgriCity, Farmland
            </li>
            <li className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              support@farmEase.com
            </li>
            <li className="text-gray-300 flex items-center">
              <FontAwesomeIcon icon={faPhone} className="mr-2" />
              +1 (123) 456-7890
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-2xl font-bold mb-4">Subscribe</h3>
          <p className="text-gray-300 mb-4">
            Subscribe to our newsletter for the latest updates and farming tips.
          </p>
          <form className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-2 rounded-l-lg text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className=" text-white px-4 rounded-r-lg bg-green-700 transition-colors duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="text-center mt-8 pt-4 border-t border-yellow-100/40">
        <p className="text-gray-300">
          &copy; {new Date().getFullYear()} FarmEase. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
