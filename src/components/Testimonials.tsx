
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Software Engineer",
    company: "Google",
    content: "This tool helped me identify critical gaps in my resume. I improved my ATS score from 45 to 87 and landed interviews at 3 FAANG companies!",
    rating: 5,
    avatar: "SC"
  },
  {
    name: "Michael Rodriguez",
    role: "Marketing Manager",
    company: "HubSpot",
    content: "The keyword analysis was spot-on. After implementing the suggestions, my response rate increased by 300%. Absolutely worth it!",
    rating: 5,
    avatar: "MR"
  },
  {
    name: "Emily Johnson",
    role: "Data Scientist",
    company: "Netflix",
    content: "The detailed breakdown helped me understand exactly what recruiters were looking for. Got my dream job within 2 weeks!",
    rating: 5,
    avatar: "EJ"
  },
  {
    name: "David Park",
    role: "UX Designer",
    company: "Adobe",
    content: "Clean interface, accurate analysis, and actionable insights. This is the best resume analyzer I've used!",
    rating: 5,
    avatar: "DP"
  }
];

export const Testimonials = () => {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
          Success Stories
        </h2>
        <p className="text-gray-400">
          Join thousands of professionals who've improved their resume with our ATS analyzer
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-gray-900/50 backdrop-blur-xl border border-gray-800 shadow-2xl">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                  {testimonial.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <Quote className="h-5 w-5 text-purple-400 mb-2" />
                  <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
