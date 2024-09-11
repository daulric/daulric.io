'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, ChevronDown, Folder, File } from 'lucide-react';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import SearchBar from "@/components/FileExplorer/SearchBar"

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
    <div className="p-4">
      <SearchBar onSearch={setSearchTerm}/>
      <FileList files={filteredFiles} />
    </div>
  );
};

const FileList = ({ files }) => {
  return (
    <div className="space-y-2">
      {files.map((file, index) => (
        <FileItem key={index} file={file} />
      ))}
    </div>
  );
};

const FileItem = ({ file }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleFileAction = (e) => {
    e.stopPropagation();
    if (file.type === 'file') {
      if (file.downloadUrl) {
        window.open(file.downloadUrl, '_blank');
      } else if (file.path) {
        window.open(`https://github.com/daulric/daulric.io/blob/site_update/${file.path}`, '_blank');
      } else if (file.linkUrl) {
        window.open(file.linkUrl, '_blank');
      }
    }
  };

  if (file.type === 'folder') {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="w-full justify-start">
            {isOpen ? <ChevronDown className="mr-2 h-4 w-4" /> : <ChevronRight className="mr-2 h-4 w-4" />}
            <Folder className="mr-2 h-4 w-4" />
            {file.name}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="ml-6">
          <FileList files={file.children || []} />
        </CollapsibleContent>
      </Collapsible>
    );
  }

  return (
    <Button variant="ghost" className="w-full justify-start" onClick={handleFileAction}>
      <File className="mr-2 h-4 w-4" />
      <span className="text-blue-500 hover:underline">{file.name}</span>
    </Button>
  );
};

export default FileExplorer;