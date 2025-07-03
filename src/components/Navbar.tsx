
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { User, LogOut } from "lucide-react";
import Logo from "./Logo";

interface NavbarProps {
  isAuthenticated?: boolean;
  userName?: string;
  onLogout?: () => void;
}

const Navbar = ({ isAuthenticated = false, userName = "", onLogout }: NavbarProps) => {
  return (
    <nav className="relative z-20 p-4 bg-black/20 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="hover:scale-105 transition-transform">
          <Logo size={40} />
        </Link>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/score" className="text-gray-300 hover:text-white transition-colors">
            Analyze Resume
          </Link>
          <Link to="/account" className="text-gray-300 hover:text-white transition-colors">
            Account
          </Link>
        </div>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-900/50 backdrop-blur-xl border border-gray-800 rounded-lg px-3 py-2">
                <User className="h-4 w-4 text-purple-400" />
                <span className="text-sm text-gray-300">{userName}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onLogout}
                className="text-gray-300 hover:text-white"
              >
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <>
              <Button variant="ghost" className="text-gray-300 hover:text-white">
                Sign In
              </Button>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Get Started
              </Button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
