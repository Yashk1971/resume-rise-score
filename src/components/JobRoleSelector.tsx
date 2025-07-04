
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, Palette, DollarSign, BarChart3, Code, Heart } from "lucide-react";
import { jobRoles, JobRole } from "@/utils/jobRoles";

interface JobRoleSelectorProps {
  selectedJobRole: string;
  onJobRoleChange: (jobRoleId: string) => void;
}

const categoryIcons: Record<string, any> = {
  Technology: Code,
  Marketing: TrendingUp,
  Product: Briefcase,
  Sales: DollarSign,
  Design: Palette,
  Finance: BarChart3,
  'Human Resources': Heart
};

export const JobRoleSelector = ({ selectedJobRole, onJobRoleChange }: JobRoleSelectorProps) => {
  const selectedRole = jobRoles.find(role => role.id === selectedJobRole);

  return (
    <Card className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl mb-6">
      <CardHeader>
        <CardTitle className="text-center flex items-center justify-center gap-2">
          <Briefcase className="h-5 w-5 text-purple-400" />
          Select Target Job Role
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Select value={selectedJobRole} onValueChange={onJobRoleChange}>
          <SelectTrigger className="w-full bg-gray-800/50 border-gray-700 text-white">
            <SelectValue placeholder="Choose the job role you're targeting" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 border-gray-700">
            {jobRoles.map((role) => {
              const IconComponent = categoryIcons[role.category] || Briefcase;
              return (
                <SelectItem key={role.id} value={role.id} className="text-white hover:bg-gray-700">
                  <div className="flex items-center gap-2">
                    <IconComponent className="h-4 w-4 text-purple-400" />
                    <div>
                      <div className="font-medium">{role.title}</div>
                      <div className="text-xs text-gray-400">{role.category}</div>
                    </div>
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        {selectedRole && (
          <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              {(() => {
                const IconComponent = categoryIcons[selectedRole.category] || Briefcase;
                return <IconComponent className="h-5 w-5 text-purple-400" />;
              })()}
              <h4 className="text-purple-300 font-semibold">{selectedRole.title}</h4>
            </div>
            <p className="text-gray-400 text-sm mb-3">{selectedRole.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="text-gray-300 font-medium mb-2">Key Skills Required:</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedRole.keywords.slice(0, 6).map((keyword, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700/50 text-gray-300 rounded text-xs">
                      {keyword}
                    </span>
                  ))}
                  {selectedRole.keywords.length > 6 && (
                    <span className="px-2 py-1 bg-gray-600/50 text-gray-400 rounded text-xs">
                      +{selectedRole.keywords.length - 6} more
                    </span>
                  )}
                </div>
              </div>
              <div>
                <h5 className="text-gray-300 font-medium mb-2">Soft Skills:</h5>
                <div className="flex flex-wrap gap-1">
                  {selectedRole.skills.slice(0, 4).map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-700/30 text-blue-300 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
