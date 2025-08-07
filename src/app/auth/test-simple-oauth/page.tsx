"use client";

import { supabase } from "../../../../config/mesa-config";
import { useState } from "react";

export default function TestSimpleOAuth() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const testGoogleOAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: "https://mesaconnect.io/connect",
        },
      });

      if (error) {
        setError(error.message);
        console.error("Google OAuth error:", error);
      } else {
        console.log("Google OAuth initiated successfully");
      }
    } catch (err) {
      console.error("Google OAuth exception:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }

    setLoading(false);
  };

  const testAppleOAuth = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "apple",
        options: {
          redirectTo: "https://mesaconnect.io/connect",
        },
      });

      if (error) {
        setError(error.message);
        console.error("Apple OAuth error:", error);
      } else {
        console.log("Apple OAuth initiated successfully");
      }
    } catch (err) {
      console.error("Apple OAuth exception:", err);
      setError(err instanceof Error ? err.message : "Unknown error");
    }

    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-tr from-purple-400 to-teal-500">
      <div className="flex w-full flex-col gap-4 rounded-3xl bg-white p-10 shadow-md dark:bg-zinc-600 lg:w-2/3">
        <h1 className="text-2xl font-bold">Simple OAuth Test</h1>

        <div className="space-y-4">
          <button
            onClick={testGoogleOAuth}
            disabled={loading}
            className="w-full rounded-full bg-blue-500 p-3 px-8 font-bold text-white hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Google OAuth"}
          </button>

          <button
            onClick={testAppleOAuth}
            disabled={loading}
            className="w-full rounded-full bg-gray-500 p-3 px-8 font-bold text-white hover:bg-gray-600 disabled:opacity-50"
          >
            {loading ? "Testing..." : "Test Apple OAuth"}
          </button>
        </div>

        {error && (
          <div className="rounded-lg bg-red-100 p-4 text-red-800">
            <strong>Error:</strong> {error}
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p>This page tests OAuth with hardcoded redirect URLs.</p>
          <p>Check the browser console for detailed logs.</p>
        </div>
      </div>
    </div>
  );
}
