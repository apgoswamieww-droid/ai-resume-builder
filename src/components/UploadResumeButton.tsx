"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Upload, Loader2, FileText } from "lucide-react";
import { extractTextFromFile } from "@/actions/parse-resume";
import { parseResumeText } from "@/actions/ai";
import { createResumeFromParsed, ParsedResumeData } from "@/actions/resume";
import { useToast } from "@/providers/ToastProvider";

// Helper function to attempt JSON repair
function parseJsonWithRecovery(jsonString: string): ParsedResumeData | null {
  if (!jsonString || typeof jsonString !== 'string') {
    console.error("Invalid input for JSON recovery:", jsonString);
    return null;
  }

  try {
    // First, try to extract JSON from the string (remove any markdown code blocks)
    let cleanJson = jsonString.trim();

    if (!cleanJson || cleanJson.length === 0) {
      console.error("Empty JSON string");
      return null;
    }

    // Remove markdown code blocks if present
    if (cleanJson.startsWith("```json")) {
      cleanJson = cleanJson.replace(/^```json\s*/, "").replace(/\s*```$/, "");
    } else if (cleanJson.startsWith("```")) {
      cleanJson = cleanJson.replace(/^```\s*/, "").replace(/\s*```$/, "");
    }

    cleanJson = cleanJson.trim();

    // Try parsing directly first
    try {
      return JSON.parse(cleanJson);
    } catch (e) {
      console.log("Direct parse failed, attempting recovery...");
    }

    // Remove any trailing comma before closing braces/brackets
    cleanJson = cleanJson.replace(/,(\s*[}\]])/g, "$1");

    // Fix unterminated strings - find lines that look incomplete
    // Match patterns like: "field": "value without closing quote
    cleanJson = cleanJson.replace(/"([^"]*?):\s*"([^"]*?)($|,|\s*})/gm, '"$1": "$2"$3');

    // Ensure object is properly closed
    if (cleanJson.endsWith('"')) {
      cleanJson += "}";
    } else if (!cleanJson.endsWith("}")) {
      cleanJson += "}";
    }

    console.log("Attempting parse with recovered JSON:", cleanJson.substring(0, 200));
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("JSON recovery failed:", error, "Input was:", jsonString.substring(0, 300));
    return null;
  }
}

// Create a minimal default resume structure
function createDefaultParsedResume(): ParsedResumeData {
  return {
    title: "Imported Resume",
    targetRole: "",
    summary: "",
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      jobTitle: "",
      linkedin: "",
      github: ""
    },
    experiences: [],
    educations: [],
    skills: [],
    projects: []
  };
}

export function UploadResumeButton() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { addToast } = useToast();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setStatus("Extracting text...");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const rawText = await extractTextFromFile(formData);
      console.log("Extracted text length:", rawText.length);

      setStatus("Parsing with AI...");
      const parsedJson = await parseResumeText(rawText);
      console.log("AI response:", parsedJson.substring(0, 300));

      // Attempt to parse JSON with error recovery
      let parsed: ParsedResumeData;
      try {
        parsed = JSON.parse(parsedJson);
      } catch (jsonError) {
        console.error("JSON parse error:", jsonError);

        // Try to fix common JSON issues
        const fixedJson = parseJsonWithRecovery(parsedJson);
        if (fixedJson === null) {
          console.warn("JSON recovery failed, using default structure");
          // Use default structure as fallback
          parsed = createDefaultParsedResume();
        } else {
          parsed = fixedJson;
        }
      }

      setStatus("Creating resume...");
      const resume = await createResumeFromParsed(parsed);

      setStatus("Redirecting...");
      router.push(`/builder/${resume.id}`);
    } catch (err: any) {
      console.error("Upload error:", err);
      addToast(
        `Upload failed: ${
          err?.message ||
          "Could not parse resume. The resume might be too complex or contain special characters. You can manually add your details in the editor."
        }`,
        "error"
      );
      setLoading(false);
      setStatus("");
    }

    setLoading(false);
    setStatus("");
    if (fileRef.current) fileRef.current.value = "";
  };

  return (
    <>
      <input
        ref={fileRef}
        type="file"
        accept=".pdf,.docx"
        onChange={handleUpload}
        className="hidden"
      />
      <button
        onClick={() => fileRef.current?.click()}
        disabled={loading}
        className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow shadow-purple-500/20 hover:from-purple-500 hover:to-indigo-500 transition disabled:opacity-50"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>{status}</span>
          </>
        ) : (
          <>
            <Upload className="h-4 w-4" />
            <span>Upload Resume</span>
          </>
        )}
      </button>
    </>
  );
}
