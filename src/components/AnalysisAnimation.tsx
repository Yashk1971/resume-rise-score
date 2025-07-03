
import { useState, useEffect } from "react";
import { CheckCircle, Clock, Zap } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalysisStep {
  id: string;
  label: string;
  icon: React.ReactNode;
  duration: number;
}

const analysisSteps: AnalysisStep[] = [
  {
    id: "parsing",
    label: "Parsing resume content...",
    icon: <Clock className="h-4 w-4" />,
    duration: 800,
  },
  {
    id: "keywords",
    label: "Analyzing keyword relevance...",
    icon: <Zap className="h-4 w-4" />,
    duration: 1200,
  },
  {
    id: "formatting",
    label: "Checking ATS compatibility...",
    icon: <CheckCircle className="h-4 w-4" />,
    duration: 1000,
  },
  {
    id: "scoring",
    label: "Calculating final score...",
    icon: <Zap className="h-4 w-4" />,
    duration: 800,
  },
];

interface AnalysisAnimationProps {
  onComplete: () => void;
}

export const AnalysisAnimation = ({ onComplete }: AnalysisAnimationProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  useEffect(() => {
    if (currentStep >= analysisSteps.length) {
      setTimeout(onComplete, 500);
      return;
    }

    const step = analysisSteps[currentStep];
    const startTime = Date.now();
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const stepProgress = Math.min((elapsed / step.duration) * 100, 100);
      const totalProgress = ((currentStep * 100) + stepProgress) / analysisSteps.length;
      
      setProgress(totalProgress);
      
      if (elapsed >= step.duration) {
        setCompletedSteps(prev => [...prev, step.id]);
        setCurrentStep(prev => prev + 1);
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [currentStep, onComplete]);

  return (
    <div className="space-y-6 p-6">
      <div className="text-center">
        <h3 className="text-xl font-semibold mb-2">Analyzing Your Resume</h3>
        <p className="text-gray-400">Please wait while we perform a deep analysis...</p>
      </div>
      
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>
      
      <div className="space-y-3">
        {analysisSteps.map((step, index) => (
          <div
            key={step.id}
            className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
              index === currentStep
                ? "bg-purple-600/20 border border-purple-600/30"
                : completedSteps.includes(step.id)
                ? "bg-green-600/20 border border-green-600/30 text-green-400"
                : "bg-gray-800/30 text-gray-500"
            }`}
          >
            <div
              className={`transition-colors ${
                completedSteps.includes(step.id)
                  ? "text-green-400"
                  : index === currentStep
                  ? "text-purple-400 animate-pulse"
                  : "text-gray-500"
              }`}
            >
              {completedSteps.includes(step.id) ? (
                <CheckCircle className="h-4 w-4" />
              ) : (
                step.icon
              )}
            </div>
            <span className="flex-1">{step.label}</span>
            {index === currentStep && (
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
