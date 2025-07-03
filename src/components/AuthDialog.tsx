
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAuthSuccess: (name: string) => void;
}

export const AuthDialog = ({ open, onOpenChange, onAuthSuccess }: AuthDialogProps) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);

  const validatePassword = (pwd: string) => {
    const errors: string[] = [];
    
    if (pwd.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(pwd)) errors.push("One uppercase letter");
    if (!/[a-z]/.test(pwd)) errors.push("One lowercase letter");
    if (!/\d/.test(pwd)) errors.push("One number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(pwd)) errors.push("One special character");
    
    setPasswordErrors(errors);
    return errors.length === 0;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    if (isSignUp && newPassword) {
      validatePassword(newPassword);
    }
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp && !validatePassword(password)) {
      return;
    }
    
    // Mock authentication - in real app this would connect to Supabase
    setTimeout(() => {
      const userName = isSignUp ? name : email.split('@')[0];
      onAuthSuccess(userName);
      onOpenChange(false);
      
      // Reset form
      setEmail("");
      setPassword("");
      setName("");
      setPasswordErrors([]);
    }, 1000);
  };

  const passwordRequirements = [
    { text: "At least 8 characters", test: (pwd: string) => pwd.length >= 8 },
    { text: "One uppercase letter", test: (pwd: string) => /[A-Z]/.test(pwd) },
    { text: "One lowercase letter", test: (pwd: string) => /[a-z]/.test(pwd) },
    { text: "One number", test: (pwd: string) => /\d/.test(pwd) },
    { text: "One special character", test: (pwd: string) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card/95 backdrop-blur-xl border border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            {isSignUp ? "Create Account" : "Welcome Back"}
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleAuth} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-800/50 border-gray-700"
                required
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800/50 border-gray-700"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={handlePasswordChange}
                className="bg-gray-800/50 border-gray-700 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            
            {isSignUp && password && (
              <div className="space-y-2 mt-3">
                <p className="text-sm text-gray-400">Password requirements:</p>
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => {
                    const isValid = req.test(password);
                    return (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        {isValid ? (
                          <CheckCircle className="h-3 w-3 text-green-400" />
                        ) : (
                          <AlertCircle className="h-3 w-3 text-red-400" />
                        )}
                        <span className={isValid ? "text-green-400" : "text-red-400"}>
                          {req.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
          
          <Button
            type="submit"
            disabled={isSignUp && passwordErrors.length > 0}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>
        
        <Separator className="bg-gray-700" />
        
        <div className="text-center">
          <Button
            variant="ghost"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setPasswordErrors([]);
              setPassword("");
            }}
            className="text-gray-400 hover:text-white"
          >
            {isSignUp 
              ? "Already have an account? Sign in" 
              : "Don't have an account? Sign up"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
