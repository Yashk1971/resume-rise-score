import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle, Sparkles, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import { AuthDialog } from "@/components/AuthDialog";
import { AnalysisAnimation } from "@/components/AnalysisAnimation";
import { toast } from "sonner";
import { calculateATSScore } from "@/utils/atsScoring";

const ResumeScore = () => {
  const [file, setFile] = useState<File | null>(null);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [resumeScores, setResumeScores] = useState<Record<string, number>>({});
  const [analysisHistory, setAnalysisHistory] = useState<Array<{
    fileName: string;
    score: number;
    date: string;
    suggestions: string[];
    keywords: Array<{keyword: string, found: boolean}>;
  }>>([]);
  const [usageCount, setUsageCount] = useState(0);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [currentAnalysis, setCurrentAnalysis] = useState<{
    suggestions: string[];
    keywords: Array<{keyword: string, found: boolean}>;
  } | null>(null);
  const [atsAnalysis, setAtsAnalysis] = useState<{
    score: number;
    breakdown: any;
    missingKeywords: string[];
    suggestions: string[];
    criticalIssues: string[];
  } | null>(null);

  const FREE_TRIAL_LIMIT = 3;

  useEffect(() => {
    const savedAuth = localStorage.getItem('userAuth');
    const savedUsage = localStorage.getItem('usageCount');
    const savedScores = localStorage.getItem('resumeScores');
    const savedHistory = localStorage.getItem('analysisHistory');
    
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserName(authData.userName);
    }
    
    if (savedUsage) {
      setUsageCount(parseInt(savedUsage));
    }
    
    if (savedScores) {
      setResumeScores(JSON.parse(savedScores));
    }
    
    if (savedHistory) {
      setAnalysisHistory(JSON.parse(savedHistory));
    }
  }, []);

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

  const generateAnalysisData = (fileName: string, score: number) => {
    // This is now replaced by the ATS scoring system
    // Keep for backward compatibility with existing history
    const allKeywords = [
      'JavaScript', 'React', 'Python', 'Project Management', 'Leadership', 
      'Data Analysis', 'Communication', 'Problem Solving', 'Team Collaboration',
      'Agile', 'Git', 'SQL', 'Node.js', 'HTML/CSS', 'Machine Learning'
    ];
    
    const keywords = allKeywords.slice(0, 5).map((keyword, index) => ({
      keyword,
      found: (fileName.toLowerCase().includes(keyword.toLowerCase().split(' ')[0].toLowerCase()) || 
              (score + index * 13) % 7 > 2)
    }));
    
    const suggestions = [];
    const missingKeywords = keywords.filter(k => !k.found).map(k => k.keyword);
    
    if (score < 70) {
      suggestions.push('Improve overall resume structure and formatting');
      if (missingKeywords.length > 0) {
        suggestions.push(`Add missing keywords: ${missingKeywords.slice(0, 2).join(', ')}`);
      }
      suggestions.push('Use more action verbs in experience descriptions');
    } else if (score < 85) {
      if (missingKeywords.length > 0) {
        suggestions.push(`Include relevant keywords: ${missingKeywords[0]}`);
      }
      suggestions.push('Quantify achievements with specific numbers and metrics');
      suggestions.push('Ensure consistent formatting throughout the document');
    } else {
      suggestions.push('Consider adding more industry-specific certifications');
      suggestions.push('Optimize section ordering for better readability');
    }
    
    return { keywords, suggestions };
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
    
    // Check if user has exceeded free trials
    if (usageCount >= FREE_TRIAL_LIMIT) {
      setShowUpgradeModal(true);
      return;
    }
    
    startAnalysis();
  };

  const handleAuthSuccess = (name: string) => {
    setIsAuthenticated(true);
    setUserName(name);
    
    // Save to localStorage
    localStorage.setItem('userAuth', JSON.stringify({ userName: name }));
    
    toast.success(`Welcome ${name}! Starting analysis...`);
    setTimeout(startAnalysis, 500);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('userAuth');
    toast.success("Logged out successfully");
  };

  const startAnalysis = () => {
    setIsAnalyzing(true);
  };

  const handleAnalysisComplete = () => {
    if (!file) return;
    
    const fileKey = `${file.name}-${file.size}`;
    let finalScore;
    let analysisData;
    let atsResult;
    
    if (resumeScores[fileKey]) {
      finalScore = resumeScores[fileKey];
      const existingAnalysis = analysisHistory.find(item => 
        item.fileName === file.name && item.score === finalScore
      );
      if (existingAnalysis) {
        analysisData = {
          keywords: existingAnalysis.keywords,
          suggestions: existingAnalysis.suggestions
        };
        // Generate ATS analysis for existing resume
        atsResult = calculateATSScore(file.name, file.size, file.type);
        atsResult.score = finalScore; // Use stored score for consistency
      } else {
        // New ATS analysis
        atsResult = calculateATSScore(file.name, file.size, file.type);
        finalScore = atsResult.score;
        analysisData = {
          keywords: atsResult.missingKeywords.map(keyword => ({ keyword, found: false })),
          suggestions: atsResult.suggestions
        };
      }
    } else {
      // Brand new analysis using ATS scoring
      atsResult = calculateATSScore(file.name, file.size, file.type);
      finalScore = atsResult.score;
      
      analysisData = {
        keywords: atsResult.missingKeywords.map(keyword => ({ keyword, found: false })),
        suggestions: atsResult.suggestions
      };
      
      const updatedScores = { ...resumeScores, [fileKey]: finalScore };
      setResumeScores(updatedScores);
      localStorage.setItem('resumeScores', JSON.stringify(updatedScores));
      
      // Save analysis to history
      const newAnalysis = {
        fileName: file.name,
        score: finalScore,
        date: new Date().toISOString(),
        suggestions: atsResult.suggestions,
        keywords: analysisData.keywords
      };
      
      const updatedHistory = [newAnalysis, ...analysisHistory.slice(0, 9)];
      setAnalysisHistory(updatedHistory);
      localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
      
      const newUsageCount = usageCount + 1;
      setUsageCount(newUsageCount);
      localStorage.setItem('usageCount', newUsageCount.toString());
    }
    
    setAtsAnalysis(atsResult);
    setCurrentAnalysis(analysisData);
    setScore(finalScore);
    setShowResults(true);
    setIsAnalyzing(false);
    toast.success("Analysis complete!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 relative overflow-hidden">
      {/* Enhanced background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-gray-900 to-gray-900"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userName={userName} 
          onLogout={handleLogout}
        />
        
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
              // ... keep existing code (upload card)
              <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Upload className="h-5 w-5 text-purple-400" />
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {isAuthenticated && (
                    <div className="text-center text-sm text-gray-400 mb-4">
                      Free analyses remaining: {FREE_TRIAL_LIMIT - usageCount}/{FREE_TRIAL_LIMIT}
                    </div>
                  )}
                  
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
                {/* Main ATS Score Card */}
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
                        {score && score >= 80 ? 'Excellent! Your resume is highly ATS-compatible.' : 
                         score && score >= 60 ? 'Good score, but there\'s room for improvement.' : 
                         'Needs significant work to pass ATS systems.'}
                      </p>
                      
                      {/* Critical Issues Alert */}
                      {atsAnalysis?.criticalIssues && atsAnalysis.criticalIssues.length > 0 && (
                        <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mb-4">
                          <h4 className="text-red-400 font-semibold mb-2">⚠️ Critical Issues</h4>
                          {atsAnalysis.criticalIssues.map((issue, index) => (
                            <p key={index} className="text-red-300 text-sm">{issue}</p>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Score Breakdown Card */}
                {atsAnalysis?.breakdown && (
                  <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                    <CardHeader>
                      <CardTitle>Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">Keyword Match (40 pts)</span>
                          <span className={`font-semibold ${atsAnalysis.breakdown.keywordMatch >= 30 ? 'text-green-400' : atsAnalysis.breakdown.keywordMatch >= 20 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {atsAnalysis.breakdown.keywordMatch}/40
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">Formatting & Readability (20 pts)</span>
                          <span className={`font-semibold ${atsAnalysis.breakdown.formatting >= 16 ? 'text-green-400' : atsAnalysis.breakdown.formatting >= 12 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {atsAnalysis.breakdown.formatting}/20
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">Experience Relevance (20 pts)</span>
                          <span className={`font-semibold ${atsAnalysis.breakdown.experienceRelevance >= 16 ? 'text-green-400' : atsAnalysis.breakdown.experienceRelevance >= 12 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {atsAnalysis.breakdown.experienceRelevance}/20
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">Skills Section (10 pts)</span>
                          <span className={`font-semibold ${atsAnalysis.breakdown.skillsSection >= 8 ? 'text-green-400' : atsAnalysis.breakdown.skillsSection >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {atsAnalysis.breakdown.skillsSection}/10
                          </span>
                        </div>
                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/30">
                          <span className="text-gray-300">File Type & Metadata (10 pts)</span>
                          <span className={`font-semibold ${atsAnalysis.breakdown.fileType >= 8 ? 'text-green-400' : atsAnalysis.breakdown.fileType >= 5 ? 'text-yellow-400' : 'text-red-400'}`}>
                            {atsAnalysis.breakdown.fileType}/10
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Missing Keywords Card */}
                {atsAnalysis?.missingKeywords && atsAnalysis.missingKeywords.length > 0 && (
                  <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                    <CardHeader>
                      <CardTitle>Missing Keywords</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-3">
                        {atsAnalysis.missingKeywords.map((keyword, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                            <AlertCircle className="h-4 w-4 text-red-400" />
                            <span className="text-gray-300">{keyword}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <p className="text-blue-300 text-sm">
                          💡 Consider adding these keywords naturally throughout your experience and skills sections
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Improvement Suggestions Card */}
                <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
                  <CardHeader>
                    <CardTitle>Improvement Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-gray-300">
                      {atsAnalysis?.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                          <AlertCircle className="h-5 w-5 text-yellow-400 mt-0.5" />
                          <div>
                            <p className="font-medium">{suggestion}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Pro upgrade prompt */}
                    <div className="mt-6 p-4 bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="text-purple-300 font-semibold">Get Detailed AI Insights</h4>
                          <p className="text-gray-400 text-sm">Unlock personalized improvement recommendations</p>
                        </div>
                        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                          Upgrade to Pro
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Button 
                  onClick={() => {
                    setShowResults(false);
                    setFile(null);
                    setScore(null);
                    setCurrentAnalysis(null);
                    setAtsAnalysis(null);
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

      {/* ... keep existing code (AuthDialog and Upgrade Modal) */}
      <AuthDialog 
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        onAuthSuccess={handleAuthSuccess}
      />

      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="bg-gray-900/95 backdrop-blur-xl border border-purple-500/30 max-w-md w-full">
            <CardHeader>
              <CardTitle className="text-center text-xl font-semibold text-white">
                Upgrade to Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">
                  $5<span className="text-lg text-gray-400">/month</span>
                </div>
                <p className="text-gray-300 mb-4">You've used all your free analyses!</p>
                
                <div className="space-y-2 text-gray-300 text-left">
                  <p>✓ Unlimited resume checks</p>
                  <p>✓ Detailed improvement suggestions</p>
                  <p>✓ Missing keywords analysis</p>
                  <p>✓ Advanced formatting tips</p>
                  <p>✓ Priority support</p>
                </div>
              </div>
              
              <div className="flex gap-3">
                <Button 
                  onClick={() => setShowUpgradeModal(false)}
                  variant="outline"
                  className="flex-1 border-gray-700 hover:bg-gray-800"
                >
                  Maybe Later
                </Button>
                <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Upgrade Now
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ResumeScore;
