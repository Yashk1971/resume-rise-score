
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Target, Zap, Sparkles } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-purple-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-5xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Sparkles className="h-16 w-16 text-purple-400 animate-pulse" />
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight tracking-tight">
              Optimize Your Resume.<br />
              <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                Get Hired Faster.
              </span>
            </h1>
            
            <p className="text-2xl md:text-3xl text-gray-300 mb-6 max-w-3xl mx-auto leading-relaxed font-light">
              Instant ATS Score for Your Resume
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
              Beat Applicant Tracking Systems with our AI-powered resume analyzer. 
              Get your ATS compatibility score and optimization tips in seconds.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/score">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                  Upload Resume to Get Score
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-gray-800 px-8 py-6 text-lg rounded-2xl">
                See Example Report
              </Button>
            </div>

            <div className="mt-16 flex justify-center items-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span>No signup required for demo</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span>Instant results</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span>ATS optimized</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Upload className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Instant Analysis</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Upload your resume and get your ATS score with detailed feedback in seconds</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Target className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">ATS Optimization</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Get detailed feedback on keyword matches, formatting, and ATS compatibility</p>
            </div>
            
            <div className="text-center p-8 rounded-3xl bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl hover:shadow-green-500/10 transition-all duration-300 hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">Get Hired Faster</h3>
              <p className="text-gray-400 text-lg leading-relaxed">Increase your interview chances with optimized resumes that pass ATS filters</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
