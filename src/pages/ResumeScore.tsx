import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import { AuthDialog } from "@/components/AuthDialog";
import { AnalysisAnimation } from "@/components/AnalysisAnimation";
import { toast } from "sonner";

const ResumeScore = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [resumeScores, setResumeScores] = useState<Record<string, number>>({});

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (allowedTypes.includes(uploadedFile.type)) {
        setFile(uploadedFile);
        toast.success("Resume uploaded successfully!");
      } else {
        toast.error("Please upload a PDF or DOCX file");
      }
    }
  };

  const generateConsistentScore = (fileName: string, fileSize: number) => {
    // Create a simple hash from filename and size for consistency
    const hash = fileName.split('').reduce((a, b) => {
      a = ((a << 5) - a) + b.charCodeAt(0);
      return a & a;
    }, 0) + fileSize;
    
    // Generate score between 65-95 based on hash
    return Math.abs(hash % 30) + 65;
  };

  const handleAnalyzeClick = () => {
    if (!file) {
      toast.error("Please upload a resume first");
      return;
    }
    
    if (!isAuthenticated) {
      setShowAuthDialog(true);
      return;
    }
    
    startAnalysis();
  };

  const handleAuthSuccess = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    toast.success(`Welcome ${name}! Starting analysis...`);
    setTimeout(startAnalysis, 500);
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    if (!file) return;
    
    const fileKey = `${file.name}-${file.size}`;
    let finalScore;
    
    if (resumeScores[fileKey]) {
      finalScore = resumeScores[fileKey];
    } else {
      finalScore = generateConsistentScore(file.name, file.size);
      setResumeScores(prev => ({ ...prev, [fileKey]: finalScore }));
    }
    
    setScore(finalScore);
    setShowResults(true);
    setIsAnalyzing(false);
    toast.success("Analysis complete!");
  };

  const mockKeywords = [
    { keyword: "JavaScript", found: true },
    { keyword: "React", found: true },
    { keyword: "Project Management", found: false },
    { keyword: "Leadership", found: true },
    { keyword: "Data Analysis", found: false },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        {/* User info display */}
        {isAuthenticated && (
          <div className="container mx-auto px-4 pt-4">
            <div className="flex justify-end">
              <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-lg px-4 py-2">
                <User className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-300">Welcome, {userName}</span>
              </div>
            </div>
          </div>
        )}
        
        <div className="container mx-auto px-4 pt-20 pb-20">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex justify-center mb-4">
                <Sparkles className="h-12 w-12 text-purple-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                Resume ATS Analyzer
              </h1>
              <p className="text-gray-300 text-lg">
                Get your ATS compatibility score and detailed insights
              </p>
            </div>
            
            {isAnalyzing ? (
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
                <CardContent>
                  <AnalysisAnimation onComplete={handleAnalysisComplete} />
                </CardContent>
              </Card>
            ) : !showResults ? (
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Upload className="h-5 w-5 text-purple-400" />
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-600 rounded-xl p-8 text-center hover:border-purple-500 transition-all duration-300 hover:bg-purple-500/5">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg mb-2 font-medium">
                        {file ? file.name : "Click to upload your resume"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Supports PDF and DOCX files (Max 10MB)
                      </p>
                    </label>
                  </div>
                  
                  <Button 
                    onClick={handleAnalyzeClick}
                    disabled={!file}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-6 rounded-xl shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
                  >
                    Get My ATS Score
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-center">Your ATS Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className={`text-6xl font-bold mb-4 ${score && score >= 80 ? 'text-green-400' : score && score >= 60 ? 'text-yellow-400' : 'text-red-400'}`}>
                        {score}/100
                      </div>
                      <p className="text-gray-300 mb-6">
                        {score && score >= 80 ? 'Excellent! Your resume is ATS-friendly.' : 
                         score && score >= 60 ? 'Good, but there\'s room for improvement.' : 
                         'Needs work to pass ATS systems.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockKeywords.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">{item.keyword}</span>
                          {item.found ? (
                            <CheckCircle className="h-5 w-5 text-green-400" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-400" />
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-gray-300">
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                        <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Add missing keywords</p>
                          <p className="text-sm text-gray-400">Include "Project Management" and "Data Analysis" in your experience section</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                        <CheckCircle className="h-5 w-5 text-blue-400 mt-0.5" />
                        <div>
                          <p className="font-medium">Use standard section headers</p>
                          <p className="text-sm text-gray-400">Replace creative headers with "Experience", "Education", "Skills"</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setFile(null);
                    setScore(null);
                  }}
                  variant="outline"
                  className="w-full border-gray-700 hover:bg-gray-800"
                >
                  Analyze Another Resume
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthSuccess={handleAuthSuccess}
      />
    </div>
  );
};

export default ResumeScore;
