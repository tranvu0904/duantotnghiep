import React from "react";
import { text } from "../utils/dataContact";
import { Button } from "../components";

const Contact = () => {
  return (
    <footer className="w-full bg-gray-100 py-10 px-8">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-5 gap-8 mt-10">
        {/* Logo and Info Section */}
        <div className="flex flex-col gap-2 md:col-span-2">
          <div className="flex items-center gap-4">
            <img src={text.sections[0].logo} alt="Logo" className="w-10 h-10" />
            <h2 className="text-gray-800 font-semibold text-xl">
              {text.sections[0].title}
            </h2>
          </div>
          {text.sections[0].content.map((line, idx) => (
            <p key={idx} className="text-gray-600 text-sm leading-relaxed">
              {line}
            </p>
          ))}
        </div>

        {/* Links Sections */}
        {text.sections.slice(1).map((section, index) => (
          <div key={index} className="flex flex-col">
            <h3 className="text-gray-800 font-semibold mb-2">
              {section.title}
            </h3>
            <ul className="space-y-1">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-gray-800 text-sm"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Contact;
