
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-12">
      <div className="container mx-auto text-center text-sm">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <p className="mt-2">Happy Shopping</p>
      </div>
    </footer>
  );
};

export default Footer;