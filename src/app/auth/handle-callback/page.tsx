"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { supabase } from "../../../../config/mesa-config";

function HandleCallbackContent() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Try to get code from URL params first (for GET requests)
        let code = searchParams.get("code");
        let next = searchParams.get("next") || "/connect";

        // If no code in URL params, check if this is a POST request with form data
        if (!code && typeof window !== "undefined") {
          // Check if there's form data in the current page (Apple form_post)
          const urlHash = window.location.hash;
          if (urlHash.includes("code=")) {
            const hashParams = new URLSearchParams(urlHash.substring(1));
            code = hashParams.get("code");
            next = hashParams.get("next") || next;
          }
        }

        if (!code) {
          setError("No authorization code provided");
          setLoading(false);
          return;
        }

        console.log("Handling OAuth callback with code:", code);
        console.log("Redirecting to:", next);

        // Exchange the code for a session on the client side
        const { error } = await supabase.auth.exchangeCodeForSession(code);

        if (error) {
          console.error("OAuth exchange error:", error);
          setError(error.message);
          setLoading(false);
          return;
        }

        console.log("OAuth exchange successful, redirecting to:", next);

        // Redirect to the intended destination
        router.push(next);
      } catch (err) {
        console.error("OAuth callback error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 to-teal-500">
        <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3">
          <h1 className="text-2xl font-bold">Completing Sign In...</h1>
          <div className="flex items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 to-teal-500">
        <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3">
          <h1 className="text-2xl font-bold text-red-600">
            Authentication Error
          </h1>
          <div className="rounded-lg bg-red-100 p-4 text-red-800">
            <strong>Error:</strong> {error}
          </div>
          <button
            onClick={() => router.push("/sign-in")}
            className="rounded-full bg-blue-500 p-3 px-8 font-bold text-white hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return null;
}

function LoadingFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 to-teal-500">
      <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3">
        <h1 className="text-2xl font-bold">Loading...</h1>
        <div className="flex items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
        </div>
      </div>
    </div>
  );
}

export default function HandleCallback() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HandleCallbackContent />
    </Suspense>
  );
}
