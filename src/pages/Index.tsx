
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Upload, Target, Zap } from "lucide-react";
import Navbar from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      {/* Blur gradient overlay */}
      <div className="absolute inset-0 blur-gradient opacity-40"></div>
      <div className="absolute top-20 left-1/4 w-96 h-96 blur-gradient opacity-20"></div>
      <div className="absolute bottom-20 right-1/4 w-96 h-96 blur-gradient opacity-20"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 pt-20 pb-32">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent leading-tight">
              Optimize Your Resume.<br />
              Get Hired Faster.
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Instant ATS Score for Your Resume
            </p>
            
            <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
              Beat Applicant Tracking Systems with our AI-powered resume analyzer. 
              Get your ATS compatibility score and optimization tips in seconds.
            </p>
            
            <Link to="/score">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                Upload Resume to Get Score
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Features Section */}
        <div className="container mx-auto px-4 pb-20">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Upload className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Instant Analysis</h3>
              <p className="text-gray-400">Upload your resume and get your ATS score in seconds</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Target className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">ATS Optimization</h3>
              <p className="text-gray-400">Get detailed feedback on keyword matches and formatting</p>
            </div>
            
            <div className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-gray-800">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Get Hired Faster</h3>
              <p className="text-gray-400">Increase your interview chances with optimized resumes</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
