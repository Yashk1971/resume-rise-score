
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import { toast } from "sonner";

const ResumeScore = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

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

  const analyzeResume = () => {
    if (!file) {
      toast.error("Please upload a resume first");
      return;
    }
    
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      const mockScore = Math.floor(Math.random() * 30) + 70; // Score between 70-100
      setScore(mockScore);
      setShowResults(true);
      setIsAnalyzing(false);
      toast.success("Analysis complete!");
    }, 3000);
  };

  const mockKeywords = [
    { keyword: "JavaScript", found: true },
    { keyword: "React", found: true },
    { keyword: "Project Management", found: false },
    { keyword: "Leadership", found: true },
    { keyword: "Data Analysis", found: false },
  ];

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 blur-gradient opacity-40"></div>
      
      <div className="relative z-10">
        <Navbar />
        
        <div className="container mx-auto px-4 pt-20 pb-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Resume ATS Analyzer
            </h1>
            
            <p className="text-gray-300 text-center mb-12 text-lg">
              Upload your resume to get your ATS compatibility score
            </p>
            
            {!showResults ? (
              <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                <CardHeader>
                  <CardTitle className="text-center flex items-center justify-center gap-2">
                    <Upload className="h-5 w-5" />
                    Upload Your Resume
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-purple-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="resume-upload"
                    />
                    <label htmlFor="resume-upload" className="cursor-pointer">
                      <FileText className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <p className="text-lg mb-2">
                        {file ? file.name : "Click to upload your resume"}
                      </p>
                      <p className="text-sm text-gray-400">
                        Supports PDF and DOCX files
                      </p>
                    </label>
                  </div>
                  
                  <Button 
                    onClick={analyzeResume}
                    disabled={!file || isAnalyzing}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3"
                  >
                    {isAnalyzing ? "Analyzing..." : "Get My ATS Score"}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Score Card */}
                <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
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

                {/* Keyword Analysis */}
                <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
                    <CardTitle>Keyword Analysis</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {mockKeywords.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50">
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

                {/* Format Issues */}
                <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
                    <CardTitle>Formatting Issues</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-gray-300">
                      <p>• Consider using standard section headers</p>
                      <p>• Add more relevant keywords</p>
                      <p>• Improve bullet point formatting</p>
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
                  className="w-full"
                >
                  Analyze Another Resume
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeScore;
