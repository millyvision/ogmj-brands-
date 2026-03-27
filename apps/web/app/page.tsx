export default function Home() {
  return (
    <div className="p-6">
      <div className="max-w-4xl">
        <h1 className="text-4xl font-bold text-emerald-400 mb-4">
          Welcome to OGMJ BRANDS
        </h1>
        <p className="text-xl text-zinc-300 mb-8">
          Intelligent Business Operating System
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="glass-dark p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">Quick Start</h3>
            <p className="text-gray-400 text-sm mb-4">Launch your first business in minutes</p>
            <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg font-medium transition-colors">
              Get Started
            </button>
          </div>
          
          <div className="glass-dark p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">AI Assistant</h3>
            <p className="text-gray-400 text-sm mb-4">Get help from our intelligent business assistant</p>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Chat with AI
            </button>
          </div>
          
          <div className="glass-dark p-6 rounded-lg border border-gray-800">
            <h3 className="text-lg font-semibold text-white mb-2">Marketplace</h3>
            <p className="text-gray-400 text-sm mb-4">Explore tools, templates, and integrations</p>
            <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
              Browse
            </button>
          </div>
        </div>
        
        <div className="glass-dark p-8 rounded-lg border border-gray-800">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to build your empire?</h2>
          <p className="text-gray-300 mb-6">
            OGMJ BRANDS is the most powerful all-in-one platform for entrepreneurs, creators, agencies, and service businesses to launch, run, and scale their entire operation from one intelligent dashboard.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-emerald-500 hover:bg-emerald-600 text-black px-6 py-3 rounded-lg font-medium transition-colors">
              Start Free Trial
            </button>
            <button className="border border-gray-700 hover:border-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Watch Demo
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
