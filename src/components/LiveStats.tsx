
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, TrendingUp, Award } from "lucide-react";

interface StatItem {
  icon: any;
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export const LiveStats = () => {
  const [stats, setStats] = useState<StatItem[]>([
    {
      icon: FileText,
      label: "Resumes Analyzed",
      value: 12847,
      suffix: "+",
      color: "text-purple-400"
    },
    {
      icon: Users,
      label: "Active Users",
      value: 3241,
      suffix: "",
      color: "text-blue-400"
    },
    {
      icon: TrendingUp,
      label: "Average Score Improvement",
      value: 34,
      suffix: " pts",
      color: "text-green-400"
    },
    {
      icon: Award,
      label: "Success Rate",
      value: 89,
      suffix: "%",
      color: "text-yellow-400"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prevStats => 
        prevStats.map(stat => ({
          ...stat,
          value: stat.label === "Resumes Analyzed" ? stat.value + Math.floor(Math.random() * 3) :
                 stat.label === "Active Users" ? stat.value + Math.floor(Math.random() * 2) :
                 stat.value
        }))
      );
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <Card key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800">
            <CardContent className="p-4 text-center">
              <IconComponent className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
              <div className="text-2xl font-bold text-white mb-1">
                {stat.value.toLocaleString()}{stat.suffix}
              </div>
              <div className="text-sm text-gray-400">{stat.label}</div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
