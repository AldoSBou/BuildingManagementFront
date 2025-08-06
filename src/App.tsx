function App() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-blue-600 mb-6">
          Building Management System
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">Setup Completo ✅</h2>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>React + TypeScript</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
              <span>Tailwind CSS v3</span>
            </div>
          </div>
          
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full transition-colors">
            ¡Funciona! 🎉
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;