
interface ATSScoreBreakdown {
  keywordMatch: number;
  formatting: number;
  experienceRelevance: number;
  skillsSection: number;
  fileType: number;
  total: number;
}

interface ATSAnalysisResult {
  score: number;
  breakdown: ATSScoreBreakdown;
  missingKeywords: string[];
  suggestions: string[];
  criticalIssues: string[];
}

// Mock job requirements - in real implementation, this would come from job posting
const mockJobRequirements = {
  title: "Software Engineer",
  keywords: [
    "JavaScript", "React", "Python", "Node.js", "SQL", "Git", "AWS", "Docker",
    "API", "REST", "Agile", "Scrum", "Testing", "CI/CD", "MongoDB", "Express",
    "TypeScript", "HTML", "CSS", "Redux", "GraphQL", "Microservices"
  ],
  skills: [
    "Problem Solving", "Team Collaboration", "Communication", "Leadership",
    "Project Management", "Code Review", "Debugging", "System Design"
  ]
};

export const calculateATSScore = (fileName: string, fileSize: number, fileType: string): ATSAnalysisResult => {
  // Generate consistent mock content based on filename
  const resumeContent = generateMockResumeContent(fileName);
  
  // 1. Keyword Match (40 points)
  const keywordScore = calculateKeywordMatch(resumeContent, fileName);
  
  // 2. Formatting & Readability (20 points)
  const formattingScore = calculateFormattingScore(fileName, fileType);
  
  // 3. Experience Relevance (20 points)
  const experienceScore = calculateExperienceRelevance(resumeContent, fileName);
  
  // 4. Skills Section (10 points)
  const skillsScore = calculateSkillsSection(resumeContent, fileName);
  
  // 5. File Type & Metadata (10 points)
  const fileTypeScore = calculateFileTypeScore(fileName, fileType, fileSize);
  
  const totalScore = keywordScore + formattingScore + experienceScore + skillsScore + fileTypeScore;
  
  const breakdown: ATSScoreBreakdown = {
    keywordMatch: keywordScore,
    formatting: formattingScore,
    experienceRelevance: experienceScore,
    skillsSection: skillsScore,
    fileType: fileTypeScore,
    total: totalScore
  };
  
  const missingKeywords = findMissingKeywords(resumeContent, fileName);
  const suggestions = generateSuggestions(breakdown, missingKeywords);
  const criticalIssues = identifyCriticalIssues(breakdown, fileName, fileType);
  
  return {
    score: totalScore,
    breakdown,
    missingKeywords,
    suggestions,
    criticalIssues
  };
};

const generateMockResumeContent = (fileName: string): string[] => {
  // Generate mock content based on filename to simulate resume parsing
  const nameHash = fileName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const availableSkills = [...mockJobRequirements.keywords, ...mockJobRequirements.skills];
  const resumeSkills: string[] = [];
  
  // Simulate skills based on filename
  availableSkills.forEach((skill, index) => {
    if ((Math.abs(nameHash + index) % 5) > 1) {
      resumeSkills.push(skill.toLowerCase());
    }
  });
  
  return resumeSkills;
};

const calculateKeywordMatch = (resumeContent: string[], fileName: string): number => {
  const requiredKeywords = mockJobRequirements.keywords.map(k => k.toLowerCase());
  const foundKeywords = resumeContent.filter(skill => 
    requiredKeywords.some(keyword => keyword.toLowerCase().includes(skill) || skill.includes(keyword.toLowerCase()))
  );
  
  const matchPercentage = foundKeywords.length / requiredKeywords.length;
  
  // Award 40 points based on keyword match percentage
  let score = Math.round(matchPercentage * 40);
  
  // Bonus for high-value keywords
  const highValueKeywords = ['react', 'python', 'javascript', 'aws', 'sql'];
  const highValueMatches = resumeContent.filter(skill => 
    highValueKeywords.some(keyword => skill.includes(keyword))
  ).length;
  
  score += Math.min(highValueMatches * 2, 8); // Up to 8 bonus points
  
  return Math.min(score, 40);
};

const calculateFormattingScore = (fileName: string, fileType: string): number => {
  let score = 20; // Start with full points
  
  // File type check
  if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(fileType)) {
    score -= 5;
  }
  
  // Filename quality check
  if (!fileName.toLowerCase().includes('resume') && !fileName.toLowerCase().includes('cv')) {
    score -= 2;
  }
  
  if (fileName.includes(' ') || fileName.includes('untitled') || fileName.includes('document')) {
    score -= 3;
  }
  
  // Mock formatting issues based on filename patterns
  const nameHash = fileName.charCodeAt(0) % 10;
  
  if (nameHash < 3) {
    score -= 5; // Simulate tables/graphics penalty
  }
  
  if (nameHash < 2) {
    score -= 3; // Simulate inconsistent formatting
  }
  
  return Math.max(score, 0);
};

const calculateExperienceRelevance = (resumeContent: string[], fileName: string): number => {
  let score = 0;
  
  // Check for job-relevant experience keywords
  const experienceKeywords = ['developer', 'engineer', 'programming', 'software', 'web', 'full-stack', 'backend', 'frontend'];
  const hasRelevantExperience = resumeContent.some(skill => 
    experienceKeywords.some(keyword => skill.includes(keyword))
  );
  
  if (hasRelevantExperience) {
    score += 12;
  } else {
    score += 5; // Some credit for having experience section
  }
  
  // Simulate chronological order bonus
  const nameHash = fileName.charCodeAt(0) % 5;
  if (nameHash > 2) {
    score += 5; // Good structure bonus
  }
  
  // Simulate job title match
  if (fileName.toLowerCase().includes('software') || fileName.toLowerCase().includes('dev')) {
    score += 3;
  }
  
  return Math.min(score, 20);
};

const calculateSkillsSection = (resumeContent: string[], fileName: string): number => {
  let score = 0;
  
  // Award points for having technical skills
  const technicalSkills = resumeContent.filter(skill => 
    mockJobRequirements.keywords.some(keyword => 
      keyword.toLowerCase().includes(skill) || skill.includes(keyword.toLowerCase())
    )
  );
  
  if (technicalSkills.length > 5) {
    score = 10;
  } else if (technicalSkills.length > 2) {
    score = 7;
  } else if (technicalSkills.length > 0) {
    score = 4;
  }
  
  return score;
};

const calculateFileTypeScore = (fileName: string, fileType: string, fileSize: number): number => {
  let score = 10;
  
  // Proper file format
  if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(fileType)) {
    score -= 4;
  }
  
  // File size check (too small might be image-based)
  if (fileSize < 50000) { // Less than 50KB
    score -= 3;
  }
  
  // File name quality
  const hasProperNaming = fileName.toLowerCase().includes('resume') || 
                         fileName.toLowerCase().includes('cv') ||
                         /^[A-Za-z]+_[A-Za-z]+/.test(fileName); // FirstName_LastName pattern
  
  if (!hasProperNaming) {
    score -= 2;
  }
  
  return Math.max(score, 0);
};

const findMissingKeywords = (resumeContent: string[], fileName: string): string[] => {
  const requiredKeywords = mockJobRequirements.keywords;
  const missing: string[] = [];
  
  requiredKeywords.forEach(keyword => {
    const isFound = resumeContent.some(skill => 
      skill.includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(skill)
    );
    
    if (!isFound && missing.length < 8) {
      missing.push(keyword);
    }
  });
  
  return missing.slice(0, 8);
};

const generateSuggestions = (breakdown: ATSScoreBreakdown, missingKeywords: string[]): string[] => {
  const suggestions: string[] = [];
  
  if (breakdown.keywordMatch < 20) {
    suggestions.push(`Add these missing keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
    suggestions.push("Include more industry-specific technical terms and tools");
  }
  
  if (breakdown.formatting < 15) {
    suggestions.push("Use a clean, single-column layout without tables or graphics");
    suggestions.push("Ensure consistent formatting and standard fonts throughout");
  }
  
  if (breakdown.experienceRelevance < 15) {
    suggestions.push("Highlight relevant job titles and responsibilities more prominently");
    suggestions.push("Use reverse chronological order for your work experience");
  }
  
  if (breakdown.skillsSection < 7) {
    suggestions.push("Create a dedicated 'Technical Skills' section");
    suggestions.push("List programming languages, frameworks, and tools you've used");
  }
  
  if (breakdown.fileType < 8) {
    suggestions.push("Save your resume as a PDF or Word document");
    suggestions.push("Use a professional filename like 'FirstName_LastName_Resume.pdf'");
  }
  
  if (breakdown.total < 70) {
    suggestions.push("Focus on quantifying your achievements with specific metrics");
  }
  
  return suggestions.slice(0, 6);
};

const identifyCriticalIssues = (breakdown: ATSScoreBreakdown, fileName: string, fileType: string): string[] => {
  const issues: string[] = [];
  
  if (breakdown.keywordMatch < 15) {
    issues.push("Low keyword match - this resume may not pass initial ATS screening");
  }
  
  if (breakdown.formatting < 10) {
    issues.push("Formatting issues detected - may not be ATS-compatible");
  }
  
  if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(fileType)) {
    issues.push("File format not ATS-friendly - use PDF or DOCX");
  }
  
  return issues;
};
