
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="relative z-20 p-4 bg-black/20 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Zume
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
          <Button variant="ghost" className="text-gray-300 hover:text-white">
            Sign In
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Get Started
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
