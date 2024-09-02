import React from 'react';
import { FaLinkedin } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaTwitterSquare } from "react-icons/fa";
//FOOTER PAGE
const Footer = () => {
  return (
    <footer className="border-t border-t-gray-00 bg-gray-300 py-5 px-5">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center max-sm:flex-col">
          <div className="mb-4 md:mb-0 flex flex-col justify-center items-center">
            <h2 className="text-xl font-bold max-sm:text-xl max-sm:font-bold">Developed by Vikash Kumar</h2>
            <p className="text-sm max-sm:text-lg max-sm:font-semibold max-sm:mt-2"><span>Copyright</span><span className='text-xl mx-1'> ©</span>2024 Jobidyne. All rights reserved.</p>
          </div>
          <div className="flex justify-center items-center space-x-4 mt-5 gap-5">
            <a href="https://linkedin.com" target='_blank' className="hover:text-blue-600" aria-label="Facebook">
              <FaLinkedin size={28} color='#0077B5' />
            </a>
            <a href="https://www.instagram.com/vikashkumar129553/" target='_blank' className="hover:text-blue-600" aria-label="Twitter">
              <FaInstagramSquare size={28} color='#c13584' />
            </a>
            <a href="https://twitter.com" target='_blank' className="hover:text-blue-600" aria-label="LinkedIn">
              <FaTwitterSquare size={28} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;