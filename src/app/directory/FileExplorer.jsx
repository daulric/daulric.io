'use client';

import { useState, useEffect } from 'react';
import { FaFolder, FaFolderOpen, FaFile } from 'react-icons/fa';
import SearchBar from './SearchBar';

const FileExplorer = ({ files }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFiles, setFilteredFiles] = useState(files);

  useEffect(() => {
    const filterFiles = (fileList, term) => {
      return fileList.reduce((acc, file) => {
        if (file.name.toLowerCase().includes(term.toLowerCase())) {
          acc.push(file);
        } else if (file.type === 'folder' && file.children) {
          const filteredChildren = filterFiles(file.children, term);
          if (filteredChildren.length > 0) {
            acc.push({ ...file, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };

    setFilteredFiles(filterFiles(files, searchTerm));
  }, [files, searchTerm]);

  return (
    <div>
      <SearchBar onSearch={setSearchTerm} />
      <FileList files={filteredFiles} />
    </div>
  );
};

const FileList = ({ files }) => {
  return (
    <div className="file-explorer">
      {files.map((file, index) => (
        <FileItem key={index} file={file} />
      ))}
    </div>
  );
};

const FileItem = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    if (file.type === 'folder') {
      setIsOpen(!isOpen);
    }
  };

  const handleFileAction = (e) => {
    e.stopPropagation();
    if (file.type === 'file') {
      if (file.downloadUrl) {
        window.open(file.downloadUrl, '_blank');
      } else if (file.linkUrl) {
        window.open(file.linkUrl, '_blank');
      }
    }
  };

  return (
    <div>
      <div
        className="flex items-center cursor-pointer hover:bg-gray-800 p-2"
        onClick={toggleOpen}
      >
        {file.type === 'folder' ? (
          isOpen ? <FaFolderOpen className="mr-2" /> : <FaFolder className="mr-2" />
        ) : (
          <FaFile className="mr-2" />
        )}
        {file.type === 'file' ? (
          <span onClick={handleFileAction} className="text-blue-500 hover:underline">
            {file.name}
          </span>
        ) : (
          <span>{file.name}</span>
        )}
      </div>
      {file.type === 'folder' && isOpen && file.children && (
        <div className="ml-4">
          <FileList files={file.children} />
        </div>
      )}
    </div>
  );
};

export default FileExplorer;