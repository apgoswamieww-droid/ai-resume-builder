"use server";

const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL || "http://localhost:20128/v1";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";

const OMNIROUTE_MODEL = "auto";

const systemPrompt = `You are an expert resume writer and career coach. Your role is to help users create professional, ATS-optimized resume content. Follow these guidelines:
- Use strong action verbs and quantifiable achievements
- Keep descriptions concise and impactful
- Optimize for ATS (Applicant Tracking Systems)
- Maintain professional tone
- Use industry-appropriate keywords
- Never fabricate information; work with what the user provides`;

async function generateContent(prompt: string, maxTokens = 500): Promise<string> {
  if (!OMNIROUTE_API_KEY) {
    throw new Error("OMNIROUTE_API_KEY not found. Add it to .env or get one from http://localhost:20128");
  }

  const res = await fetch(`${OMNIROUTE_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OMNIROUTE_API_KEY}`,
    },
    body: JSON.stringify({
      model: OMNIROUTE_MODEL,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: prompt },
      ],
      temperature: 0.7,
      max_tokens: maxTokens,
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OmniRoute error (${res.status}): ${text}`);
  }

  const data = await res.json();
  return (data.choices?.[0]?.message?.content || "").trim();
}

export async function generateSummary(targetRole: string, skills: string[], experience: string): Promise<string> {
  const prompt = `Create a compelling professional summary for a ${targetRole || "professional"} candidate.

Context:
- Target Role: ${targetRole || "Not specified"}
- Key Skills: ${skills.join(", ") || "Not specified"}
- Background: ${experience || "Not specified"}

Write 3-4 sentences that:
1. Opens with their title and years of experience
2. Highlights key skills and expertise
3. Mentions notable achievements
4. Closes with what they bring to a new role

Return ONLY the summary text, no labels or prefixes.`;

  return generateContent(prompt);
}

export async function improveExperience(description: string, targetRole: string): Promise<string> {
  const prompt = `Improve the following resume bullet points for a ${targetRole || "professional"} role.

Original content:
${description}

Rewrite to:
- Use strong action verbs (e.g., Led, Developed, Implemented, Optimized)
- Add quantifiable metrics where possible
- Show impact and results
- Keep each bullet to 1-2 lines
- Make it ATS-friendly

Return ONLY the improved bullet points, no labels or prefixes.`;

  return generateContent(prompt);
}

export async function suggestSkills(targetRole: string, existingSkills: string[]): Promise<string[]> {
  const prompt = `For a ${targetRole || "professional"} role, suggest relevant skills.

Existing skills: ${existingSkills.join(", ") || "None"}

Return a comma-separated list of 8-10 additional relevant skills that would strengthen this resume for the target role.
Return ONLY the comma-separated list, no labels or prefixes.`;

  const text = await generateContent(prompt);
  return text.split(",").map((s) => s.trim()).filter(Boolean);
}

export async function analyzeATS(targetRole: string, resumeText: string): Promise<string> {
  const prompt = `You are an ATS optimization expert. Analyze the following resume for ATS (Applicant Tracking System) compatibility.

Target Role: ${targetRole || "Not specified"}

Resume Content:
${resumeText}

Provide a detailed ATS analysis with these sections:
1. **Overall ATS Score** — Rate out of 100 with a brief explanation
2. **Keyword Optimization** — How well do the resume keywords match the target role? List missing keywords
3. **Section Headings** — Are headings ATS-friendly? Suggest improvements if needed
4. **Formatting Issues** — Any formatting that might confuse an ATS parser
5. **Missing Key Terms or Skills** — What's missing for this target role?
6. **Bullet Point Structure** — Are achievements clear and quantified? Suggest improvements
7. **Quantifiable Achievements** — Which bullets could use metrics?
8. **Top Recommendations** — 3-5 most impactful changes

Format the response with clear markdown sections and specific, actionable advice.`;

  return generateContent(prompt, 2000);
}

export async function generateCoverLetter(targetRole: string, resumeText: string, companyName?: string): Promise<string> {
  const prompt = `You are an expert cover letter writer. Create a compelling, professional cover letter that complements the following resume.

Target Role: ${targetRole || "Not specified"}
${companyName ? `Company: ${companyName}` : ""}

Resume Content:
${resumeText}

Write a cover letter that:
1. Addresses the hiring manager professionally
2. Opens with a strong hook
3. Highlights 2-3 key achievements from the resume
4. Connects experience to the target role
5. Shows enthusiasm for the company/role
6. Is 3-4 paragraphs
7. Ends with a clear call to action

Return ONLY the cover letter text, formatted with proper paragraph spacing.`;

  return generateContent(prompt, 2000);
}

export async function checkGrammar(text: string): Promise<string> {
  const prompt = `Proofread and improve the following resume content. Fix any grammar, spelling, punctuation, or awkward phrasing while preserving the original meaning and professional tone.

Content to check:
${text}

Return ONLY the corrected text, no explanations or labels.`;

  return generateContent(prompt);
}

export async function parseResumeText(rawText: string): Promise<string> {
  // Truncate very long resumes to avoid token limits
  const maxLength = 8000;
  const truncatedText = rawText.length > maxLength
    ? rawText.substring(0, maxLength) + "\n...[truncated]"
    : rawText;

  // Escape any problematic characters in the text
  const sanitizedText = truncatedText
    .replace(/\\/g, '\\\\')
    .replace(/`/g, "'");

  const prompt = `You are a resume parsing expert. Extract structured information from the following raw resume text.

Raw Resume Text:
${sanitizedText}

IMPORTANT INSTRUCTIONS:
1. Return ONLY valid JSON - no markdown, no code blocks, no explanations
2. All strings must be properly escaped and terminated
3. If a field is missing, use empty string "" not null
4. Escape any quotes inside string values using backslash
5. Do NOT include any text before or after the JSON

Return data in this exact format:
{
  "title": "extracted job title or Untitled Resume",
  "targetRole": "most recent job title",
  "summary": "professional summary or empty string",
  "personalInfo": {
    "fullName": "full name",
    "email": "email",
    "phone": "phone",
    "location": "location",
    "jobTitle": "current title",
    "linkedin": "LinkedIn URL",
    "github": "GitHub URL"
  },
  "experiences": [
    {
      "company": "company name",
      "position": "job title",
      "startDate": "start date",
      "endDate": "end date",
      "isCurrent": false,
      "description": "description"
    }
  ],
  "educations": [
    {
      "institution": "school",
      "degree": "degree",
      "fieldOfStudy": "field",
      "endDate": "graduation date"
    }
  ],
  "skills": [
    { "name": "skill" }
  ],
  "projects": [
    {
      "title": "project name",
      "description": "description",
      "technologies": "tech stack"
    }
  ]
}

Return ONLY the JSON object, nothing else.`;

  return generateContent(prompt, 4000);
}

export async function analyzeJobMatch(targetRole: string, resumeText: string, jobDescription: string): Promise<string> {
  const prompt = `You are a job matching and career alignment expert. Analyze the resume against the target job requirements.

Target Role: ${targetRole || "Not specified"}

Resume Content:
${resumeText}

Job Description:
${jobDescription}

Provide a detailed job match analysis with these sections:
1. **Overall Match Score** — Percentage match with brief explanation
2. **Key Matching Qualifications** — What the candidate already has
3. **Missing or Underdeveloped Areas** — Gaps to address
4. **Specific Recommendations** — How to improve alignment
5. **Suggested Keywords to Add** — Missing terms from the job description
6. **Skills to Highlight or Develop** — What to emphasize or learn

Format the response with clear markdown sections and specific, actionable advice.`;

  return generateContent(prompt, 2000);
}
