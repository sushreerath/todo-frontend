import React from "react";

const Landing = () => {
  // Using a placeholder image for preview
  const heroImage = "https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1739&q=80";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-6 py-16">
        <div className="flex items-center justify-between gap-12 max-w-7xl mx-auto min-h-screen">
          <div className="flex-1 space-y-8">
            <div className="space-y-6">
              <h1 className="text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                  Organize work and life
                </span>
                <br />
                <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  finally.
                </span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
                Type just anything into the task field and TodoList's 
                <span className="font-semibold text-gray-800"> one-of-its-kind natural language recognition</span> will 
                instantly fill your to-do-list
              </p>
            </div>
            
            <div className="flex gap-4 pt-6">
              <a 
                href="/register"
                className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Register Now!</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
              <a 
                href="/login"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 overflow-hidden"
              >
                <span className="relative z-10">Login</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-orange-400 to-purple-400 rounded-3xl opacity-20 blur-xl"></div>
              <img 
                src={heroImage} 
                alt="todoapp hero" 
                className="relative w-full h-auto max-h-96 object-cover rounded-3xl shadow-2xl transform hover:scale-105 transition-transform duration-500" 
              />
            </div>
            
            {/* Floating elements for visual interest */}
            <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-60 animate-pulse"></div>
            <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full opacity-40 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;