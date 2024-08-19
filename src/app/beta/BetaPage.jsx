"use client"

export default function BetaPage({links}) {
    return (
        <div className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {links.map((link, index) => (
                <a 
                  key={index} 
                  href={link.url || "#"} 
                  className="block p-6 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  <div className="flex items-center space-x-4">
                    <span className="text-4xl">{link.icon}</span>
                    <div>
                      <h3 className="text-xl font-medium text-blue-300">{link.title}</h3>
                      <p className="text-gray-400">{link.description}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
        </div>
    )
}