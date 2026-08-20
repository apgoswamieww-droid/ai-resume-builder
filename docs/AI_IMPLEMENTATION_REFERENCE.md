# AI Features - Technical Implementation Reference

## Quick Reference

### Files Created/Modified

| File | Purpose | Status |
|------|---------|--------|
| `src/components/ai/AtsAnalysisModal.tsx` | Modal for ATS analysis results | ✅ New |
| `src/components/ai/CoverLetterModal.tsx` | Modal for cover letter generation | ✅ New |
| `src/components/ai/JobMatchModal.tsx` | Modal for job match analysis | ✅ New |
| `src/components/ai/AISuggestionToast.tsx` | Toast notifications for AI status | ✅ New |
| `src/components/editor/ResumeFormEditor.tsx` | Editor with integrated AI buttons | ✅ Updated |
| `src/app/globals.css` | Added toast animation styles | ✅ Updated |
| `src/actions/ai.ts` | AI backend functions (pre-existing) | ✓ Used |
| `docs/AI_FEATURES_GUIDE.md` | User-facing feature documentation | ✅ New |

---

## Component Architecture

### Modal Components (Presentational)

```
AtsAnalysisModal
├── Props: isOpen, onClose, atsResults, loading
├── Features: Score badge, markdown rendering, close button
└── Responsibilities: Display results, handle UX

CoverLetterModal
├── Props: isOpen, onClose, coverLetter, loading, companyName, setCompanyName
├── Features: Company name input, textarea display
└── Responsibilities: Show generated letter, allow customization

JobMatchModal
├── Props: isOpen, onClose, matchResult, loading, jobDescription, setJobDescription, onAnalyze
├── Features: Job description input, analyze button, results display
└── Responsibilities: Manage job description input, trigger analysis
```

### Toast System (Notifications)

```
AISuggestionToast (Single)
├── Props: message, type, onClose, actionLabel, onAction
├── Features: Auto-dismiss (5s), custom icons, actions
└── Responsibilities: Individual toast display

AIToastManager (Container)
├── Props: toasts[], onDismiss()
├── Features: Manages multiple toasts, stacking
└── Responsibilities: Render all active toasts
```

### ResumeFormEditor (Container)

```
Main Component
├── State:
│   ├── Modal visibility (showAtsModal, showCoverModal, showMatchModal)
│   ├── AI results (atsResults, coverLetter, matchResult)
│   ├── User inputs (companyName, jobDescription)
│   ├── Loading state (aiLoading)
│   └── Toasts (toasts[])
│
├── Handlers:
│   ├── handleGenerateSummary()
│   ├── handleImproveExperience()
│   ├── handleCheckGrammarSummary()
│   ├── handleCheckGrammarExperience()
│   ├── handleSuggestSkills()
│   ├── handleAnalyzeATS()
│   ├── handleGenerateCoverLetter()
│   └── handleAnalyzeJobMatch()
│
└── Renders:
    ├── Editor form (tabs + inputs)
    ├── AI Buttons (inline + tab-based)
    ├── Modal dialogs
    └── Toast manager
```

---

## State Management Flow

### Adding a Toast

```typescript
// Quick notification
const toastId = addToast("Generating summary...", "loading");

// Later: Remove toast
removeToast(toastId);

// Or use in handler:
try {
  const id = addToast("Processing...", "loading");
  const result = await aiAction();
  removeToast(id);
  addToast("Success!", "success");
} catch (e) {
  removeToast(id);
  addToast(`Error: ${e.message}`, "error");
}
```

### Modal Workflow

```typescript
// Open modal and start loading
const handleAnalyzeATS = async () => {
  setAiLoading("ats");           // Set loading state
  setShowAtsModal(true);          // Open modal
  addToast("Analyzing...", "loading");

  try {
    const result = await analyzeATS(...);
    setAtsResults(result);        // Update results
    removeToast(id);
    addToast("Done!", "success");
  } catch (e) {
    removeToast(id);
    addToast(`Error: ${e.message}`, "error");
  }
  
  setAiLoading(null);             // Clear loading
};

// Modal displays based on state:
{aiLoading === "ats" && <LoadingSpinner />}
{atsResults && <ResultsDisplay results={atsResults} />}
```

---

## Server Action Integration

### AI Backend Functions

All in `src/actions/ai.ts`:

```typescript
// Summary generation
export async function generateSummary(
  targetRole: string, 
  skills: string[], 
  experience: string
): Promise<string>

// Experience improvement
export async function improveExperience(
  description: string, 
  targetRole: string
): Promise<string>

// Grammar checking
export async function checkGrammar(text: string): Promise<string>

// Skill suggestions (returns array)
export async function suggestSkills(
  targetRole: string, 
  existingSkills: string[]
): Promise<string[]>

// ATS analysis (returns markdown)
export async function analyzeATS(
  targetRole: string, 
  resumeText: string
): Promise<string>

// Cover letter generation
export async function generateCoverLetter(
  targetRole: string, 
  resumeText: string, 
  companyName?: string
): Promise<string>

// Job match analysis
export async function analyzeJobMatch(
  targetRole: string, 
  resumeText: string, 
  jobDescription: string
): Promise<string>
```

### Error Handling Pattern

```typescript
try {
  // Call AI action
  const result = await aiAction(params);
  
  // Process result
  setResults(result);
  
  // Save to DB if needed
  await updateResumeDetails(resume.id, { field: value });
  
  // Refresh UI
  router.refresh();
  
  // Success notification
  addToast("Success!", "success");
} catch (e: any) {
  // Extract error message
  const message = e?.message || "API key check needed";
  
  // Show error toast
  addToast(`Failed: ${message}`, "error");
}
```

---

## CSS Additions

### Toast Animation

```css
@keyframes slide-in {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

.animate-slide-in {
  animation: slide-in 0.3s ease-out;
}
```

### Modal Styling (Tailwind)

- **Overlay**: `fixed inset-0 z-50 bg-black/50 backdrop-blur-sm`
- **Modal Box**: `relative w-full max-w-2xl max-h-[90vh] bg-slate-950 rounded-2xl border border-slate-800`
- **Header**: `flex items-center justify-between border-b border-slate-800 pb-3`
- **Content**: `space-y-4 overflow-y-auto`
- **Buttons**: `rounded-xl bg-purple-600 px-3 py-1.5 text-xs font-semibold text-white`

---

## Type Definitions

### Toast Type

```typescript
interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "loading" | "info";
  actionLabel?: string;
  onAction?: () => void;
}
```

### Modal Props

```typescript
// ATS Modal
interface AtsAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  atsResults: string | null;
  loading: boolean;
}

// Cover Letter Modal
interface CoverLetterModalProps {
  isOpen: boolean;
  onClose: () => void;
  coverLetter: string | null;
  loading: boolean;
  companyName: string;
  setCompanyName: (name: string) => void;
}

// Job Match Modal
interface JobMatchModalProps {
  isOpen: boolean;
  onClose: () => void;
  matchResult: string | null;
  loading: boolean;
  jobDescription: string;
  setJobDescription: (desc: string) => void;
  onAnalyze: () => void;
}
```

---

## Testing Checklist

### Unit Tests (Needed)

- [ ] Toast creation/removal
- [ ] Modal opening/closing
- [ ] AI handler function calls
- [ ] Error message formatting
- [ ] State updates

### Integration Tests (Needed)

- [ ] Full AI workflow (generate → display → save)
- [ ] Multiple concurrent AI requests
- [ ] Error recovery flows
- [ ] Modal dismiss behavior
- [ ] Toast auto-dismiss timing

### Manual Testing

- [ ] Generate summary with empty resume
- [ ] Improve experience with long text
- [ ] Run ATS analysis (check score accuracy)
- [ ] Generate cover letter with/without company
- [ ] Job match with real job description
- [ ] Check all error messages appear
- [ ] Verify toast auto-dismiss (5s)
- [ ] Test on mobile responsiveness

---

## Performance Tips

### Optimization Done

✅ Modal lazy rendering (renders only when opened)
✅ Toast debouncing (5s auto-dismiss)
✅ Server-side AI calls (no client-side latency)
✅ Debounced auto-save (1.5s after changes)

### Future Optimizations

- [ ] Memo() wrapping for modal components
- [ ] Suspense boundaries for modals
- [ ] Request deduplication for duplicate AI calls
- [ ] Local caching of recent results

---

## Common Patterns

### Pattern 1: Simple AI Action with Toast

```typescript
const handleQuickAction = async () => {
  const id = addToast("Processing...", "loading");
  try {
    const result = await aiAction(data);
    removeToast(id);
    addToast("Done!", "success");
  } catch (e) {
    removeToast(id);
    addToast(`Error: ${e.message}`, "error");
  }
};
```

### Pattern 2: AI Action with Modal Results

```typescript
const handleAnalysis = async () => {
  setAiLoading("analysis");
  setShowModal(true);
  const id = addToast("Analyzing...", "loading");
  
  try {
    const result = await analyzeAction(data);
    setResults(result);
    removeToast(id);
    addToast("Analysis complete!", "success");
  } catch (e) {
    removeToast(id);
    addToast(`Failed: ${e.message}`, "error");
  }
  
  setAiLoading(null);
};
```

### Pattern 3: AI Action with Database Save

```typescript
const handleImprovement = async () => {
  const id = addToast("Improving...", "loading");
  try {
    const improved = await improveAction(text);
    await updateDatabase(id, improved);
    removeToast(id);
    addToast("Saved!", "success");
    router.refresh();
  } catch (e) {
    removeToast(id);
    addToast(`Error: ${e.message}`, "error");
  }
};
```

---

## Debugging Tips

### Check AI Loading State

```typescript
console.log("Current AI Loading:", aiLoading);
// Should be: null, "summary", "exp-{id}", "ats", "cover", "match", etc.
```

### Verify Toast Updates

```typescript
console.log("Active Toasts:", toasts);
// Should show: [{ id: "123", message: "...", type: "loading" }]
```

### Test Modal State

```typescript
console.log("ATS Modal Open:", showAtsModal);
console.log("ATS Results:", atsResults);
// Modal should display when showAtsModal=true and atsResults is truthy
```

### Monitor Server Action Calls

```typescript
// In browser DevTools Network tab:
// Look for POST requests to server actions
// Check response format matches expected type
```

---

## Deployment Checklist

- [ ] Verify `.env` has OMNIROUTE_API_KEY set
- [ ] Test all AI features before deployment
- [ ] Check error messages are user-friendly
- [ ] Verify modals close on escape key
- [ ] Test on mobile (responsive design)
- [ ] Monitor API rate limits
- [ ] Set up error logging/monitoring
- [ ] Document environment variables

---

## Related Documentation

- **User Guide**: `/docs/AI_FEATURES_GUIDE.md` - How to use each feature
- **Architecture**: `/docs/ARCHITECTURE.md` - Overall system design
- **API Design**: `/docs/API.md` - Backend API standards
- **Security**: `/docs/SECURITY.md` - Security practices

