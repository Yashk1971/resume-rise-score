
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart3, Users, TrendingDown, TrendingUp } from "lucide-react";

interface BenchmarkComparisonProps {
  userScore: number;
  averageScore: number;
  industryScore: number;
  jobRole: string;
  percentile: number;
}

export const BenchmarkComparison = ({ 
  userScore, 
  averageScore, 
  industryScore, 
  jobRole, 
  percentile 
}: BenchmarkComparisonProps) => {
  const getPerformanceIcon = () => {
    if (userScore > averageScore) return <TrendingUp className="h-5 w-5 text-green-400" />;
    return <TrendingDown className="h-5 w-5 text-red-400" />;
  };

  const getPerformanceText = () => {
    if (userScore > averageScore) {
      return `${userScore - averageScore} points above average`;
    }
    return `${averageScore - userScore} points below average`;
  };

  const getPerformanceColor = () => {
    if (userScore > averageScore) return "text-green-400";
    return "text-red-400";
  };

  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-400" />
          Benchmark Comparison
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            {getPerformanceIcon()}
            <span className={`font-semibold ${getPerformanceColor()}`}>
              {getPerformanceText()}
            </span>
          </div>
          <p className="text-gray-400 text-sm">
            You scored better than {percentile}% of {jobRole} candidates
          </p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Your Score</span>
              <span className="font-semibold text-white">{userScore}/100</span>
            </div>
            <Progress value={userScore} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-gray-300">Platform Average</span>
              </div>
              <span className="font-semibold text-gray-400">{averageScore}/100</span>
            </div>
            <Progress value={averageScore} className="h-2 bg-gray-700" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">{jobRole} Industry</span>
              <span className="font-semibold text-gray-400">{industryScore}/100</span>
            </div>
            <Progress value={industryScore} className="h-2 bg-gray-600" />
          </div>
        </div>

        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="text-purple-300 font-semibold mb-2">How to Improve</h4>
          <p className="text-gray-400 text-sm">
            {userScore < averageScore 
              ? `Focus on the critical issues highlighted above to reach the average score of ${averageScore}.`
              : `Great job! You're performing above average. Consider targeting the top 10% with a score of 90+.`
            }
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
