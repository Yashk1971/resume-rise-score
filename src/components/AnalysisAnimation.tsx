
import { useState, useEffect } from "react";
import { CheckCircle, Clock, Zap, FileText, Search, Target, Award } from "lucide-react";

interface AnalysisStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  duration: number;
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "parsing",
    label: "Parsing resume content and structure...",
    icon: <FileText className="h-5 w-5" />,
    duration: 3500,
  },
  {
    id: "keywords",
    label: "Analyzing keyword relevance and density...",
    icon: <Search className="h-5 w-5" />,
    duration: 4000,
  },
  {
    id: "formatting",
    label: "Checking ATS compatibility and formatting...",
    icon: <Target className="h-5 w-5" />,
    duration: 3000,
  },
  {
    id: "scoring",
    label: "Calculating final score and recommendations...",
    icon: <Award className="h-5 w-5" />,
    duration: 2500,
  },
];

interface AnalysisAnimationProps {
  onComplete: () => void;
}

export const AnalysisAnimation = ({ onComplete }: AnalysisAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [dots, setDots] = useState("");

  // Animated dots effect
  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 800);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      setTimeout(onComplete, 1500);
      return;
    }

    const step = analysisSteps[currentStep];
    
    const timer = setTimeout(() => {
      setCompletedSteps(prev => [...prev, step.id]);
      setCurrentStep(prev => prev + 1);
    }, step.duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  return (
    <div className="space-y-8 p-8">
      <div className="text-center">
        <div className="relative mb-6">
          {/* Elegant spinning ring */}
          <div className="w-24 h-24 mx-auto relative">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-spin" 
                 style={{ animationDuration: '4s' }}>
              <div className="absolute inset-2 rounded-full bg-gray-900"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Zap className="h-8 w-8 text-purple-400 animate-pulse" style={{ animationDuration: '2s' }} />
            </div>
          </div>
        </div>
        
        <h3 className="text-2xl font-semibold mb-3 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Analyzing Your Resume{dots}
        </h3>
        <p className="text-gray-400 text-lg">
          Our AI is performing a comprehensive analysis of your resume
        </p>
      </div>
      
      <div className="space-y-4">
        {analysisSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-1000 ${
              index === currentStep
                ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 scale-105"
                : completedSteps.includes(step.id)
                ? "bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
                : "bg-gray-800/30 border border-gray-700/50"
            }`}
          >
            <div
              className={`flex-shrink-0 transition-all duration-700 ${
                completedSteps.includes(step.id)
                  ? "text-green-400 scale-110"
                  : index === currentStep
                  ? "text-purple-400 animate-pulse scale-110"
                  : "text-gray-500"
              }`}
              style={{ animationDuration: index === currentStep ? '1.5s' : undefined }}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                step.icon
              )}
            </div>
            <span 
              className={`flex-1 transition-colors duration-700 ${
                completedSteps.includes(step.id)
                  ? "text-green-300"
                  : index === currentStep
                  ? "text-white"
                  : "text-gray-500"
              }`}
            >
              {step.label}
            </span>
            {index === currentStep && (
              <div className="flex-shrink-0">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((dot) => (
                    <div
                      key={dot}
                      className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
                      style={{ animationDelay: `${dot * 0.3}s`, animationDuration: '1.2s' }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className="text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
          <Clock className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">This may take a few moments</span>
        </div>
      </div>
    </div>
  );
};
