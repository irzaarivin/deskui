import { Bookmark } from 'lucide-react';

export default function BookmarkApp() {

  const bookmarks = [
    { name: 'GitHub', url: 'https://github.com', category: 'Development', favicon: 'https://github.com/favicon.ico' },
    { name: 'Stack Overflow', url: 'https://stackoverflow.com', category: 'Development', favicon: 'https://stackoverflow.com/favicon.ico' },
    { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', category: 'Development', favicon: 'https://developer.mozilla.org/favicon.ico' },
    { name: 'YouTube', url: 'https://youtube.com', category: 'Entertainment', favicon: 'https://youtube.com/favicon.ico' },
    { name: 'Netflix', url: 'https://netflix.com', category: 'Entertainment', favicon: 'https://netflix.com/favicon.ico' },
    { name: 'Spotify', url: 'https://spotify.com', category: 'Music', favicon: 'https://spotify.com/favicon.ico' },
    { name: 'Google Drive', url: 'https://drive.google.com', category: 'Productivity', favicon: 'https://drive.google.com/favicon.ico' },
    { name: 'Twitter', url: 'https://twitter.com', category: 'Social', favicon: 'https://twitter.com/favicon.ico' },
    { name: 'LinkedIn', url: 'https://linkedin.com', category: 'Social', favicon: 'https://linkedin.com/favicon.ico' },
  ];

  return (
    <div>
      <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white/50 shadow-2xl w-full max-w-6xl max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-white/30">
          <div className="flex items-center gap-3">
            <Bookmark className="w-6 h-6 text-indigo-500" />
            <h2 className="text-2xl font-semibold text-gray-800">Bookmarks</h2>
          </div>
        </div>

        {/* Bookmarks Grid */}
        <div className="p-6 overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {bookmarks.map((bookmark, index) => (
              <a
                key={index}
                href={bookmark.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/60 hover:bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/50 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 hover:-translate-y-1"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <img
                      src={bookmark.favicon}
                      alt={`${bookmark.name} favicon`}
                      className="w-8 h-8"
                      onError={(e) => {
                        console.log('Favicon failed to load, using default icon.');
                        // e.target.style.display = 'none';
                        // e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <Bookmark className="w-6 h-6 text-indigo-500 hidden" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 truncate group-hover:text-indigo-600 transition-colors">
                      {bookmark.name}
                    </h3>
                    <p className="text-xs text-gray-500 truncate mt-0.5">
                      {bookmark.url}
                    </p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 text-xs rounded-full">
                      {bookmark.category}
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}