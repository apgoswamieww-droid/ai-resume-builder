import { signIn } from "@/auth"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-black">
      <div className="w-full max-w-md space-y-8 rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-black dark:text-white">Welcome Back</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Sign in to manage your professional resumes</p>
        </div>
        <div className="flex flex-col gap-4">
          <form
            action={async () => {
              "use server"
              await signIn("github", { redirectTo: "/" })
            }}
          >
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302.866 10.064 2.3 14.2C3.94 23.73 5.66 24 7.3 24c1.55 0 2.75-.65 3.5-1.6.75 1.05 1.95 1.6 3.5 1.6 1.64 0 2.85-0.3 3.6-1.3.75 1.05 1.95 1.6 3.5 1.6 1.64 0 2.85-0.3 3.6-1.3C21.34 18.064 24 13.302 24 12c0-6.627-5.373-12-12-12z" />
              </svg>
              Continue with GitHub
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
