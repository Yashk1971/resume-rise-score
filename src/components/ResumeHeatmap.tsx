
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, TrendingUp } from "lucide-react";

interface SectionScore {
  name: string;
  score: number;
  maxScore: number;
  issues: string[];
  suggestions: string[];
}

interface ResumeHeatmapProps {
  sections: SectionScore[];
  overallScore: number;
}

export const ResumeHeatmap = ({ sections, overallScore }: ResumeHeatmapProps) => {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "bg-green-500";
    if (percentage >= 60) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getScoreTextColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-400";
    if (percentage >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-purple-400" />
          Resume Analysis Heatmap
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.map((section, index) => {
          const percentage = (section.score / section.maxScore) * 100;
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <h4 className="font-medium text-white">{section.name}</h4>
                <span className={`font-semibold ${getScoreTextColor(section.score, section.maxScore)}`}>
                  {section.score}/{section.maxScore}
                </span>
              </div>
              <Progress 
                value={percentage} 
                className={`h-3 ${getScoreColor(section.score, section.maxScore)}`}
              />
              {section.issues.length > 0 && (
                <div className="text-sm space-y-1">
                  {section.issues.map((issue, issueIndex) => (
                    <div key={issueIndex} className="flex items-start gap-2 text-red-300">
                      <AlertCircle className="h-3 w-3 mt-0.5" />
                      <span>{issue}</span>
                    </div>
                  ))}
                </div>
              )}
              {section.suggestions.length > 0 && (
                <div className="text-sm space-y-1">
                  {section.suggestions.slice(0, 2).map((suggestion, suggestionIndex) => (
                    <div key={suggestionIndex} className="flex items-start gap-2 text-blue-300">
                      <CheckCircle className="h-3 w-3 mt-0.5" />
                      <span>{suggestion}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};
