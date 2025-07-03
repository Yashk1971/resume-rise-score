
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";

const Account = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");
  const [usageCount, setUsageCount] = useState(0);
  const freeChecksLimit = 3;

  useEffect(() => {
    const savedAuth = localStorage.getItem('userAuth');
    const savedUsage = localStorage.getItem('usageCount');
    
    if (savedAuth) {
      const authData = JSON.parse(savedAuth);
      setIsAuthenticated(true);
      setUserName(authData.userName);
    }
    
    if (savedUsage) {
      setUsageCount(parseInt(savedUsage));
    }
  }, []);

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserName("");
    localStorage.removeItem('userAuth');
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <div className="absolute inset-0 blur-gradient opacity-40"></div>
      
      <div className="relative z-10">
        <Navbar 
          isAuthenticated={isAuthenticated} 
          userName={userName} 
          onLogout={handleLogout}
        />
        
        <div className="container mx-auto px-4 pt-20 pb-20">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
              Your Account
            </h1>
            
            {!isAuthenticated ? (
              <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                <CardContent className="text-center py-12">
                  <p className="text-gray-300 text-lg mb-4">Please sign in to view your account details</p>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Sign In
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Usage Card */}
                <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Usage Overview</span>
                      <Badge variant="secondary">Free Plan</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-gray-300">Resume Checks</span>
                          <span className="text-white">{usageCount}/{freeChecksLimit}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(usageCount / freeChecksLimit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <p className="text-gray-400 text-sm">
                        You have {Math.max(0, freeChecksLimit - usageCount)} free checks remaining this month.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Upgrade Card */}
                <Card className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 backdrop-blur-sm border border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-center">
                      Upgrade to Pro
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center space-y-4">
                    <div className="text-3xl font-bold text-white mb-2">
                      $5<span className="text-lg text-gray-400">/month</span>
                    </div>
                    
                    <div className="space-y-2 text-gray-300">
                      <p>✓ Unlimited resume checks</p>
                      <p>✓ Detailed improvement suggestions</p>
                      <p>✓ Missing keywords analysis</p>
                      <p>✓ Advanced formatting tips</p>
                      <p>✓ Priority support</p>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg py-3">
                      Upgrade Now
                    </Button>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="bg-card/50 backdrop-blur-sm border border-gray-800">
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <p className="text-white">Resume_2024.pdf</p>
                          <p className="text-sm text-gray-400">Score: 85/100</p>
                        </div>
                        <p className="text-sm text-gray-400">2 days ago</p>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <p className="text-white">Marketing_Resume.docx</p>
                          <p className="text-sm text-gray-400">Score: 72/100</p>
                        </div>
                        <p className="text-sm text-gray-400">1 week ago</p>
                      </div>
                      
                      <div className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50">
                        <div>
                          <p className="text-white">Software_Engineer_CV.pdf</p>
                          <p className="text-sm text-gray-400">Score: 91/100</p>
                        </div>
                        <p className="text-sm text-gray-400">2 weeks ago</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
