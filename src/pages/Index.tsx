
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Sparkles, TrendingUp, Users, Award, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";
import { LiveStats } from "@/components/LiveStats";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar isAuthenticated={false} userName="" onLogout={() => {}} />
        
        <div className="container mx-auto px-4 pt-20 pb-20">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <Sparkles className="h-16 w-16 text-purple-400" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Resume ATS Analyzer
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Get your resume optimized for Applicant Tracking Systems and land more interviews
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/score">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                  Analyze Your Resume Free
                </Button>
              </Link>
              <Link to="/success-stories">
                <Button variant="outline" className="border-gray-600 hover:bg-gray-800 text-lg px-8 py-4 rounded-xl">
                  See Success Stories
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Live Stats */}
          <div className="mb-16">
            <LiveStats />
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
              <CardHeader>
                <FileText className="h-12 w-12 text-purple-400 mb-4" />
                <CardTitle className="text-xl">Smart ATS Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Advanced algorithm analyzes your resume against ATS requirements and provides detailed scoring
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
              <CardHeader>
                <TrendingUp className="h-12 w-12 text-green-400 mb-4" />
                <CardTitle className="text-xl">Keyword Optimization</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Identifies missing keywords and suggests improvements to match job requirements
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
              <CardHeader>
                <Award className="h-12 w-12 text-yellow-400 mb-4" />
                <CardTitle className="text-xl">Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-400">
                  Get comprehensive analysis in seconds with actionable recommendations
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Testimonials Section */}
          <div className="mb-16">
            <Testimonials />
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <h3 className="text-3xl font-bold text-white mb-4">
                  Ready to Land Your Dream Job?
                </h3>
                <p className="text-gray-300 mb-6 text-lg">
                  Join thousands of professionals who've improved their resumes with our AI-powered analyzer
                </p>
                <Link to="/score">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300">
                    Start Free Analysis
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
