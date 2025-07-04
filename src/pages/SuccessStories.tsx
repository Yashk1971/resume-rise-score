
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, TrendingUp, Users, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Testimonials } from "@/components/Testimonials";
import { LiveStats } from "@/components/LiveStats";

const beforeAfterExamples = [
  {
    role: "Software Engineer",
    before: {
      score: 42,
      issues: ["Missing technical keywords", "Poor formatting", "No quantified achievements"]
    },
    after: {
      score: 89,
      improvements: ["Added React, Node.js, Python keywords", "Clean single-column layout", "Quantified impact: 'Reduced load time by 40%'"]
    },
    outcome: "Landed interviews at Google, Microsoft, and Amazon"
  },
  {
    role: "Marketing Manager",
    before: {
      score: 38,
      issues: ["Generic job descriptions", "Missing growth metrics", "No campaign details"]
    },
    after: {
      score: 85,
      improvements: ["Added SEO, PPC, analytics keywords", "Included ROI metrics", "Detailed campaign results"]
    },
    outcome: "Received 5 interview requests in first week"
  },
  {
    role: "Data Scientist",
    before: {
      score: 51,
      issues: ["Unclear project descriptions", "Missing ML frameworks", "No statistical tools mentioned"]
    },
    after: {
      score: 91,
      improvements: ["Added Python, R, TensorFlow keywords", "Quantified model accuracy", "Detailed data pipeline work"]
    },
    outcome: "Secured senior position at Fortune 500 company"
  }
];

const SuccessStories = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar isAuthenticated={false} userName="" onLogout={() => {}} />
        
        <div className="container mx-auto px-4 pt-20 pb-20">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Link to="/">
                <Button variant="outline" className="mb-6 border-gray-700 hover:bg-gray-800">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Analyzer
                </Button>
              </Link>
              
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Success Stories
              </h1>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Real results from professionals who transformed their careers with our ATS Resume Analyzer
              </p>
            </div>

            {/* Live Stats */}
            <div className="mb-16">
              <LiveStats />
            </div>

            {/* Before/After Examples */}
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">
                Before & After Transformations
              </h2>
              <div className="space-y-8">
                {beforeAfterExamples.map((example, index) => (
                  <Card key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-xl text-purple-300">
                        {example.role} Success Story
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-3 gap-6">
                        {/* Before */}
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-red-400 mb-2">
                              {example.before.score}/100
                            </div>
                            <h4 className="font-semibold text-red-300">Before</h4>
                          </div>
                          <div className="space-y-2">
                            {example.before.issues.map((issue, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-gray-400">
                                <div className="w-2 h-2 bg-red-400 rounded-full mt-2"></div>
                                <span>{issue}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Arrow */}
                        <div className="flex items-center justify-center">
                          <TrendingUp className="h-8 w-8 text-purple-400" />
                        </div>

                        {/* After */}
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">
                              {example.after.score}/100
                            </div>
                            <h4 className="font-semibold text-green-300">After</h4>
                          </div>
                          <div className="space-y-2">
                            {example.after.improvements.map((improvement, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
                                <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                                <span>{improvement}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Star className="h-5 w-5 text-yellow-400" />
                          <span className="font-semibold text-green-300">Result</span>
                        </div>
                        <p className="text-gray-300">{example.outcome}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <Testimonials />

            {/* CTA */}
            <div className="text-center mt-16">
              <Card className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Ready to Transform Your Resume?
                  </h3>
                  <p className="text-gray-300 mb-6">
                    Join thousands of professionals who've improved their career prospects
                  </p>
                  <Link to="/score">
                    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-3">
                      Analyze Your Resume Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessStories;
