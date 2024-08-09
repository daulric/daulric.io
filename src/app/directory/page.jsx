import FileExplorer from './FileExplorer';
import {files_list as Files} from "@/GetSourceFiles"

export const metadata = {
  title: "Open Source Directory",
  description: "Open Source Directory for this project",
}

export default function DirectoryPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">daulric den open source directory</h1>
      <FileExplorer files={Files} />
    </main>
  );
}