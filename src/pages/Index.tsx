
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Filter, List, Search, User } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, isLoading, navigate]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
                TaskMaster
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-blue-100 animate-slide-up">
                Stay organized and get more done with our simple task management app
              </p>
              <div className="flex gap-4 animate-slide-up">
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-blue-200"
                  onClick={() => navigate("/register")}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-blue-600 hover:bg-blue-300"
                  onClick={() => navigate("/login")}
                >
                  Sign In
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end animate-slide-up">
              <div className="bg-white rounded-lg shadow-xl p-4 w-full max-w-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-gray-800">My Tasks</h3>
                  <div className="bg-blue-100 rounded-full p-1">
                    <List className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
                
                {/* Sample tasks */}
                <div className="space-y-2">
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm line-through text-gray-500">Complete project setup</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <div className="h-4 w-4 border border-blue-500 rounded-full mr-2" />
                    <span className="text-sm text-gray-500">Design user interface</span>
                  </div>
                  <div className="flex items-center p-2 bg-gray-50 rounded">
                    <div className="h-4 w-4 border border-blue-500 rounded-full mr-2" />
                    <span className="text-sm">Implement authentication</span>
                    <span className="ml-auto text-xs text-red-500 flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Today
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Task Management</h3>
              <p className="text-gray-600">
                Create, edit, and delete tasks. Mark them as completed when done.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                <Filter className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Filtering</h3>
              <p className="text-gray-600">
                Filter tasks by status to focus on what matters most right now.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                <Search className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Powerful Search</h3>
              <p className="text-gray-600">
                Quickly find tasks with our powerful search functionality.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Due Dates</h3>
              <p className="text-gray-600">
                Set due dates for your tasks to stay on track and meet deadlines.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Profiles</h3>
              <p className="text-gray-600">
                Manage your personal information and preferences.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="bg-blue-100 rounded-full p-3 w-fit mb-4">
              <div className="h-6 w-6 flex items-center justify-center text-blue-500 text-xl font-bold">
              <span className="text-blue-500 text-2xl">+</span>
              </div>
            </div>

              <h3 className="text-xl font-semibold mb-2">More Coming Soon</h3>
              <p className="text-gray-600">
                We're constantly adding new features to make task management even better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to get organized?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Start using TaskMaster today and take control of your tasks.
          </p>
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/register")}
          >
            Get Started for Free
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
            <div className="flex space-x-6 md:order-2">
              <p className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">Twitter</span>
                  Linkedin
              </p>
              <p className="text-gray-400 hover:text-gray-500">
                <span className="sr-only">GitHub</span>
                GitHub
              </p>
            </div>
            <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
              &copy; {new Date().getFullYear()} TaskMaster. Created By Nayf Serag Who can Center div ^_^
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
