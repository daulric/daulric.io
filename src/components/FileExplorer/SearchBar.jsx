import React from 'react';
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const SearchBar = ({ onSearch }) => {
  return (
    <div className="relative mb-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
        <Input
          type="text"
          placeholder="Search files..."
          onChange={(e) => onSearch(e.target.value)}
          className="pl-10 bg-gray-800 text-white placeholder-gray-400 border-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default SearchBar;