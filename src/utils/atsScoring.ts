import { JobRole, getJobRoleById, jobRoles } from './jobRoles';

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
  jobRole: JobRole;
}

export const calculateATSScore = (
  fileName: string, 
  fileSize: number, 
  fileType: string, 
  selectedJobRoleId?: string
): ATSAnalysisResult => {
  // Use selected job role or default to software engineer
  const jobRole = selectedJobRoleId ? 
    getJobRoleById(selectedJobRoleId) || jobRoles[0] : 
    jobRoles[0];

  // Generate consistent mock content based on filename
  const resumeContent = generateMockResumeContent(fileName, jobRole);
  
  // 1. Keyword Match (40 points)
  const keywordScore = calculateKeywordMatch(resumeContent, fileName, jobRole);
  
  // 2. Formatting & Readability (20 points)
  const formattingScore = calculateFormattingScore(fileName, fileType);
  
  // 3. Experience Relevance (20 points)
  const experienceScore = calculateExperienceRelevance(resumeContent, fileName, jobRole);
  
  // 4. Skills Section (10 points)
  const skillsScore = calculateSkillsSection(resumeContent, fileName, jobRole);
  
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
  
  const missingKeywords = findMissingKeywords(resumeContent, fileName, jobRole);
  const suggestions = generateSuggestions(breakdown, missingKeywords, jobRole);
  const criticalIssues = identifyCriticalIssues(breakdown, fileName, fileType, jobRole);
  
  return {
    score: totalScore,
    breakdown,
    missingKeywords,
    suggestions,
    criticalIssues,
    jobRole
  };
};

const generateMockResumeContent = (fileName: string, jobRole: JobRole): string[] => {
  // Generate mock content based on filename to simulate resume parsing
  const nameHash = fileName.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0);
    return a & a;
  }, 0);
  
  const availableSkills = [...jobRole.keywords, ...jobRole.skills];
  const resumeSkills: string[] = [];
  
  // Simulate skills based on filename and job role
  availableSkills.forEach((skill, index) => {
    if ((Math.abs(nameHash + index) % 5) > 1) {
      resumeSkills.push(skill.toLowerCase());
    }
  });
  
  return resumeSkills;
};

const calculateKeywordMatch = (resumeContent: string[], fileName: string, jobRole: JobRole): number => {
  const requiredKeywords = jobRole.keywords.map(k => k.toLowerCase());
  const foundKeywords = resumeContent.filter(skill => 
    requiredKeywords.some(keyword => keyword.toLowerCase().includes(skill) || skill.includes(keyword.toLowerCase()))
  );
  
  const matchPercentage = foundKeywords.length / requiredKeywords.length;
  
  // Award 40 points based on keyword match percentage
  let score = Math.round(matchPercentage * 40);
  
  // Bonus for high-value keywords (first 5 keywords are considered high-value)
  const highValueKeywords = jobRole.keywords.slice(0, 5).map(k => k.toLowerCase());
  const highValueMatches = resumeContent.filter(skill => 
    highValueKeywords.some(keyword => skill.includes(keyword) || keyword.includes(skill))
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

const calculateExperienceRelevance = (resumeContent: string[], fileName: string, jobRole: JobRole): number => {
  let score = 0;
  
  // Check for job-relevant experience keywords based on role
  const experienceKeywords = getExperienceKeywords(jobRole);
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
  if (fileName.toLowerCase().includes(jobRole.title.toLowerCase().split(' ')[0].toLowerCase())) {
    score += 3;
  }
  
  return Math.min(score, 20);
};

const calculateSkillsSection = (resumeContent: string[], fileName: string, jobRole: JobRole): number => {
  let score = 0;
  
  // Award points for having technical skills relevant to the job role
  const technicalSkills = resumeContent.filter(skill => 
    jobRole.keywords.some(keyword => 
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

const findMissingKeywords = (resumeContent: string[], fileName: string, jobRole: JobRole): string[] => {
  const requiredKeywords = jobRole.keywords;
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

const generateSuggestions = (breakdown: ATSScoreBreakdown, missingKeywords: string[], jobRole: JobRole): string[] => {
  const suggestions: string[] = [];
  
  if (breakdown.keywordMatch < 20) {
    suggestions.push(`Add these missing ${jobRole.title.toLowerCase()} keywords: ${missingKeywords.slice(0, 3).join(', ')}`);
    suggestions.push(`Include more ${jobRole.category.toLowerCase()}-specific technical terms and tools`);
  }
  
  if (breakdown.formatting < 15) {
    suggestions.push("Use a clean, single-column layout without tables or graphics");
    suggestions.push("Ensure consistent formatting and standard fonts throughout");
  }
  
  if (breakdown.experienceRelevance < 15) {
    suggestions.push(`Highlight ${jobRole.title.toLowerCase()} responsibilities more prominently`);
    suggestions.push("Use reverse chronological order for your work experience");
  }
  
  if (breakdown.skillsSection < 7) {
    suggestions.push(`Create a dedicated 'Technical Skills' section for ${jobRole.category.toLowerCase()} roles`);
    suggestions.push(`List ${jobRole.category.toLowerCase()} tools, technologies, and frameworks you've used`);
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

const identifyCriticalIssues = (breakdown: ATSScoreBreakdown, fileName: string, fileType: string, jobRole: JobRole): string[] => {
  const issues: string[] = [];
  
  if (breakdown.keywordMatch < 15) {
    issues.push(`Low ${jobRole.title.toLowerCase()} keyword match - this resume may not pass initial ATS screening`);
  }
  
  if (breakdown.formatting < 10) {
    issues.push("Formatting issues detected - may not be ATS-compatible");
  }
  
  if (!['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(fileType)) {
    issues.push("File format not ATS-friendly - use PDF or DOCX");
  }
  
  return issues;
};

const getExperienceKeywords = (jobRole: JobRole): string[] => {
  const roleSpecificKeywords: Record<string, string[]> = {
    'software-engineer': ['developer', 'engineer', 'programming', 'software', 'web', 'full-stack', 'backend', 'frontend'],
    'data-scientist': ['data', 'analyst', 'scientist', 'research', 'machine learning', 'statistics', 'modeling'],
    'digital-marketing': ['marketing', 'digital', 'campaign', 'growth', 'seo', 'social media', 'content'],
    'product-manager': ['product', 'manager', 'strategy', 'roadmap', 'stakeholder', 'requirements'],
    'sales-representative': ['sales', 'account', 'client', 'revenue', 'quota', 'business development'],
    'ux-designer': ['design', 'user experience', 'interface', 'usability', 'wireframe', 'prototype'],
    'financial-analyst': ['financial', 'analyst', 'modeling', 'budgeting', 'forecasting', 'investment'],
    'hr-manager': ['human resources', 'talent', 'recruiting', 'employee', 'hiring', 'training']
  };
  
  return roleSpecificKeywords[jobRole.id] || ['manager', 'coordinator', 'specialist', 'analyst'];
};
