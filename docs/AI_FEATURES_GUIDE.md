# AI Features Implementation Guide

## Overview

The AI Resume Builder now has fully integrated AI-powered features that help users create, improve, and optimize their resumes. All AI features are built on **OmniRoute API** (free tier) and are seamlessly integrated into the resume editor UI with modal dialogs, real-time feedback, and toast notifications.

---

## Architecture

### Backend AI Actions (`src/actions/ai.ts`)

All AI operations are server-side actions using OmniRoute's API:
- **Model**: `auto` (automatically selects the best available model)
- **Base URL**: `http://localhost:20333/v1` (local development proxy)
- **API Key**: Configured in `.env` as `OMNIROUTE_API_KEY`

### Frontend Integration

AI features are exposed through:
1. **Modal Components** - Large results displayed in fullscreen modals
2. **Inline Buttons** - Quick actions within the editor
3. **Toast Notifications** - Status updates (loading, success, error)
4. **Real-time Updates** - Changes immediately saved to database

---

## AI Features

### 1. **Professional Summary Generation**
**Location**: Summary Tab

**How It Works**:
- User enters target role, skills, and work background
- Click "Generate" button
- AI analyzes the data and writes a 3-4 sentence professional summary
- Summary auto-saves to the resume

**Key Prompts**:
- Opens with their title and years of experience
- Highlights key skills and expertise
- Mentions notable achievements
- Closes with what they bring to a new role

**Example Output**:
```
Results-driven Senior Software Engineer with 5+ years of 
experience building scalable cloud-native applications. 
Expert in React, TypeScript, and AWS infrastructure with 
proven success leading cross-functional teams. Known for 
optimizing system performance and mentoring junior developers. 
Seeking to drive innovation in enterprise-scale software development.
```

---

### 2. **Experience Description Improvement**
**Location**: Experience Tab (Inline Button)

**How It Works**:
- User adds or edits a work experience entry
- Hover over experience card → Click the magic wand icon (Wand2)
- AI rewrites bullet points with:
  - Strong action verbs (Led, Developed, Implemented, Optimized)
  - Quantifiable metrics where possible
  - Clear impact and results
  - ATS-friendly formatting (1-2 lines per bullet)

**Key Features**:
- Preserves original information, improves presentation
- Makes achievements measurable and compelling
- Optimized for Applicant Tracking Systems (ATS)

**Example**:
- **Before**: "Worked on project management system"
- **After**: "Led development of project management system, reducing task assignment time by 40% and improving team collaboration efficiency by 35%"

---

### 3. **Grammar & Spelling Check**
**Location**: Summary Tab + Experience Cards (Inline)

**How It Works**:
- Click "Check Grammar" button (Checkmark icon)
- AI proofreads the text and fixes:
  - Grammar errors
  - Spelling mistakes
  - Awkward phrasing
  - Professional tone consistency
- Changes automatically saved

**Real-time Updates**:
- Preview shows corrected text immediately
- One-click apply via Save button
- Maintains original meaning and intent

---

### 4. **AI-Suggested Skills**
**Location**: Skills Tab

**How It Works**:
- User enters target role and existing skills
- Click "AI Suggest" button
- AI generates 8-10 relevant skills based on:
  - Target job role
  - Current skill set
  - Industry best practices
  - Job market trends
- New skills automatically added to resume

**Key Points**:
- Non-duplicative (skips skills already added)
- Role-specific and relevant
- Improves ATS keyword matching
- Can be manually edited/deleted after adding

---

### 5. **ATS Compatibility Analysis**
**Location**: ATS Score Tab

**How It Works**:
- Builds complete resume text from all sections
- Sends to AI for detailed analysis
- AI returns:
  - **Overall ATS Score** (0-100)
  - **Keyword Optimization** - How well keywords match the target role
  - **Section Headings** - ATS-friendly formatting check
  - **Formatting Issues** - Elements that might confuse ATS parsers
  - **Missing Key Terms** - Skills/keywords to add
  - **Bullet Point Structure** - Are achievements clear and quantified?
  - **Quantifiable Achievements** - Which bullets need metrics?
  - **Top Recommendations** - 3-5 most impactful changes

**Score Visualization**:
- Large circular badge shows score (e.g., 87/100)
- Gradient color coding (purple → blue)
- Detailed markdown-formatted recommendations

**User Experience**:
- Results open in a modal dialog
- Full recommendations visible
- Easy to copy insights and apply changes

---

### 6. **Cover Letter Generation**
**Location**: Cover Letter Tab

**How It Works**:
- User optionally enters company name
- Click "Generate Cover Letter"
- AI writes a professional 3-4 paragraph cover letter that:
  - Addresses hiring manager professionally
  - Opens with a strong hook
  - Highlights 2-3 key achievements from resume
  - Connects experience to target role
  - Shows enthusiasm for the company/role
  - Ends with clear call to action

**Generated Output**:
- Full cover letter in readable textarea
- Properly formatted with paragraph spacing
- Ready to copy and customize
- Can be regenerated with different company names

**Example Structure**:
```
Dear Hiring Manager,

[Opening hook about passion for role/company]

[Key achievement #1] demonstrates my ability to [role requirement].
Combined with [Key achievement #2], I've successfully [impact].

[Connection to company/role + enthusiasm]

I'm excited to bring my [key skills] to your team and would 
welcome the opportunity to discuss how I can contribute to [company].

Sincerely,
[User Name]
```

---

### 7. **Job Match Analysis**
**Location**: Job Match Tab

**How It Works**:
1. User pastes a job description
2. Click "Analyze Match"
3. AI compares resume against job requirements:
   - **Overall Match Score** (percentage %)
   - **Key Matching Qualifications** - What candidate already has
   - **Missing or Underdeveloped Areas** - Gaps to address
   - **Specific Recommendations** - How to improve alignment
   - **Suggested Keywords** - Missing terms from job description
   - **Skills to Highlight or Develop** - What to emphasize/learn

**Score Visualization**:
- Large circular badge with percentage (e.g., 78%)
- Gradient color coding (emerald → teal)
- Actionable recommendations for improvement

**User Workflow**:
1. Find job posting
2. Paste full job description
3. Get instant analysis of fit
4. Make targeted resume improvements
5. Re-analyze to track improvement

---

## UI Components

### Modal Dialogs

#### AtsAnalysisModal
- **Props**: `isOpen`, `onClose`, `atsResults`, `loading`
- **Features**:
  - Fullscreen overlay with close button
  - Loading spinner during analysis
  - Markdown-formatted results with proper styling
  - Large score badge display
  - Section-based organization

#### CoverLetterModal
- **Props**: `isOpen`, `onClose`, `coverLetter`, `loading`, `companyName`, `setCompanyName`
- **Features**:
  - Company name input field
  - Loading state during generation
  - Read-only textarea for final letter
  - Easy copy-to-clipboard workflow

#### JobMatchModal
- **Props**: `isOpen`, `onClose`, `matchResult`, `loading`, `jobDescription`, `setJobDescription`, `onAnalyze`
- **Features**:
  - Job description textarea (editable until analysis)
  - Real-time loading indicator
  - Markdown-formatted recommendations
  - Analyze Match button (enabled when text present)

### Toast Notifications

#### AISuggestionToast
- **Types**: `success`, `error`, `loading`, `info`
- **Features**:
  - Auto-dismisses after 5 seconds
  - Animated slide-in from bottom-right
  - Contextual icons and colors
  - Optional action buttons (e.g., "View Results")
  - Manual close button

#### AIToastManager
- **Props**: `toasts` array, `onDismiss` callback
- **Manages**: Multiple concurrent toasts with unique IDs

---

## State Management

### ResumeFormEditor State

```typescript
// Modal visibility
const [showAtsModal, setShowAtsModal] = useState(false);
const [showCoverModal, setShowCoverModal] = useState(false);
const [showMatchModal, setShowMatchModal] = useState(false);

// AI results
const [atsResults, setAtsResults] = useState<string | null>(null);
const [coverLetter, setCoverLetter] = useState<string | null>(null);
const [matchResult, setMatchResult] = useState<string | null>(null);

// User inputs
const [companyName, setCompanyName] = useState("");
const [jobDescription, setJobDescription] = useState("");

// Loading states
const [aiLoading, setAiLoading] = useState<string | null>(null);

// Toast management
const [toasts, setToasts] = useState<Toast[]>([]);
```

### Toast Management

```typescript
const addToast = (message, type = "info", actionLabel?, onAction?) => {
  const id = Date.now().toString();
  setToasts(prev => [...prev, { id, message, type, actionLabel, onAction }]);
  return id;
};

const removeToast = (id: string) => {
  setToasts(prev => prev.filter(t => t.id !== id));
};
```

---

## Error Handling

### Graceful Degradation

1. **API Failures**:
   - Toast shows error message with API key hint
   - Results display is skipped
   - User can retry without losing work

2. **Network Issues**:
   - Loading state shows clearly what's happening
   - User can close modal and try again
   - No data loss (changes auto-saved to DB)

3. **Invalid Input**:
   - Buttons disabled if required fields empty
   - Clear validation messages
   - Prevents unnecessary API calls

### Error Messages

```typescript
catch (e: any) {
  removeToast(loadingToastId);
  addToast(
    `AI feature failed: ${e?.message || "Check API key"}`,
    "error"
  );
}
```

---

## Performance Considerations

### Optimizations

1. **Debouncing**:
   - Auto-save waits 1.5 seconds after last change
   - Prevents excessive database updates

2. **Server Actions**:
   - All AI calls use Next.js Server Actions
   - No client-side API exposure
   - Secure key management in `.env`

3. **Modal Lazy Loading**:
   - Modals only render when opened
   - Reduces initial bundle size
   - Faster resume editor page load

### Data Flow

```
User Action → Handler Function
  ↓
Add Loading Toast
  ↓
Call Server Action (AI)
  ↓
Update Local State
  ↓
Save to Database (via Server Action)
  ↓
Remove Loading Toast + Show Success/Error
  ↓
Optionally Show Modal with Results
```

---

## API Integration Details

### OmniRoute Configuration

```typescript
const OMNIROUTE_BASE_URL = process.env.OMNIROUTE_BASE_URL 
  || "http://localhost:20128/v1";
const OMNIROUTE_API_KEY = process.env.OMNIROUTE_API_KEY || "";
const OMNIROUTE_MODEL = "auto";

// System Prompt
const systemPrompt = `You are an expert resume writer and career coach...`
```

### Request Format

```typescript
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
      { role: "user", content: userPrompt },
    ],
    temperature: 0.7,
    max_tokens: 2000, // varies by feature
    stream: false,
  }),
});
```

---

## User Workflow Examples

### Example 1: Improving a Resume for a Specific Job

1. **Create/Open Resume**
   - Go to builder page

2. **Generate Summary**
   - Fill in target role and skills
   - Click "Generate" in Summary tab
   - Review and accept AI-written summary

3. **Improve Experiences**
   - For each experience entry, click Wand2 icon
   - AI rewrites bullet points with metrics
   - Check Grammar, fix any issues

4. **Get Skill Suggestions**
   - Go to Skills tab
   - Click "AI Suggest"
   - Review and keep suggested skills

5. **Run ATS Analysis**
   - Go to ATS Score tab
   - Click "Run ATS Analysis"
   - Review recommendations
   - Make targeted improvements

6. **Analyze Job Match**
   - Go to Job Match tab
   - Paste target job description
   - Click "Analyze Match"
   - Address missing qualifications
   - Re-analyze to confirm improvement

7. **Generate Cover Letter**
   - Go to Cover Letter tab
   - Enter company name (optional)
   - Click "Generate Cover Letter"
   - Copy and customize

### Example 2: Quick Resume Polish

1. Use "Check Grammar" on summary and experiences
2. Get ATS score to see if optimized
3. If score < 80, run AI recommendations
4. Quick regenerate to confirm improvements

---

## Configuration & Environment

### Required Environment Variables

```env
# OmniRoute Configuration
OMNIROUTE_BASE_URL=http://localhost:20128/v1
OMNIROUTE_API_KEY=sk-your-api-key-here
```

### Optional Customization

In `src/actions/ai.ts`, adjust:
- `temperature`: 0.7 (creativity level, 0-1)
- `max_tokens`: Varies by feature (2000 for analysis, 500 for summaries)
- `systemPrompt`: Core instructions for AI behavior

---

## Future Enhancements

1. **AI Refinement Dialog**
   - Allow users to ask follow-up questions
   - Regenerate with specific feedback
   - Multi-turn conversation support

2. **Batch Operations**
   - Improve all experiences at once
   - Generate multiple cover letters in sequence
   - Compare different skill suggestions

3. **Analytics & Insights**
   - Track ATS score improvements over time
   - Show usage statistics
   - Highlight common optimization patterns

4. **Premium Features**
   - Unlimited AI generations (rate limiting)
   - Advanced customization prompts
   - Industry-specific templates
   - Interview preparation with AI

5. **Integrations**
   - LinkedIn profile sync
   - Job board API integrations
   - Calendar for interview prep sessions

---

## Troubleshooting

### AI Features Not Working

**Symptom**: "Check API key" error messages

**Solution**:
1. Verify `OMNIROUTE_API_KEY` is set in `.env`
2. Check `.env` is not in `.gitignore` (it shouldn't be committed anyway)
3. Restart dev server: `npm run dev`

### Modal Not Displaying Results

**Symptom**: Empty modal after analysis completes

**Solution**:
1. Check browser console for errors
2. Verify API response format matches expected markdown
3. Test with simpler resume data first

### Toast Notifications Not Showing

**Symptom**: No feedback when clicking AI buttons

**Solution**:
1. Ensure `AIToastManager` is rendered in ResumeFormEditor
2. Check z-index CSS doesn't conflict with other elements
3. Verify toast state is updating (check React DevTools)

### Slow AI Response

**Symptom**: Loading spinner takes > 30 seconds

**Solution**:
1. Check OmniRoute service is running (local mode)
2. Monitor network tab for actual response time
3. Consider reducing `max_tokens` in `src/actions/ai.ts`
4. Split large resumes into smaller requests

---

## Summary

The AI Resume Builder now provides **7 powerful AI features** that work together to help users create optimized, compelling resumes. All features are:

- ✅ **User-Friendly**: Clear buttons, helpful toasts, modal results
- ✅ **Secure**: Server-side API calls, no key exposure
- ✅ **Reliable**: Error handling, graceful degradation
- ✅ **Efficient**: Auto-save, debounced updates
- ✅ **Production-Ready**: TypeScript types, proper state management

Users can now go from blank resume to job-ready document with AI assistance at every step! 🚀
