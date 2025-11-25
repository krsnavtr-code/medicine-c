import React from "react";
import { Phone, Mail, Globe, Search } from "lucide-react";

const NavbarTop = () => {
  return (
    <div className="w-full bg-gray-100 border-b py-2">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            <span>+91 9876543210</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            <span>support@example.com</span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-6 text-sm">
          {/* Language */}
          <div className="flex items-center gap-2 cursor-pointer">
            <Globe className="h-4 w-4" />
            <span>EN</span>
          </div>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-3 py-1 pl-8 text-sm focus:outline-none"
            />
            <Search className="h-4 w-4 absolute left-2 top-1.5 text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarTop;
