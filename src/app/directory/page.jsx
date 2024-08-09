import FileExplorer from './FileExplorer';

const initialFiles = [
    { name: 'Documents', type: 'folder', children: [
      { name: 'Work', type: 'folder', children: [
        { name: 'Project A', type: 'file', downloadUrl: '/files/projectA.pdf' },
        { name: 'Project B', type: 'file', linkUrl: 'https://example.com/projectB' },
      ]},
      { name: 'Personal', type: 'folder', children: [
        { name: 'Budget.xlsx', type: 'file', downloadUrl: '/files/budget.xlsx' },
        { name: 'Resume.pdf', type: 'file', downloadUrl: '/files/resume.pdf' },
      ]},
    ]},
    
    { name: 'Downloads', type: 'folder', children: [
      { name: 'Movie.mp4', type: 'file', downloadUrl: '/files/movie.mp4' },
      { name: 'Song.mp3', type: 'file', downloadUrl: '/files/song.mp3' },
    ]},
    { name: 'Desktop', type: 'folder', children: [
      {name: "About", type: "file", downloadUrl: "/nav/about.png"}
    ] },
];

export default function DirectoryPage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">daulric directory</h1>
      <FileExplorer files={initialFiles} />
    </main>
  );
}