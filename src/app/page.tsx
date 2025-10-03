"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to landing page
    router.push("/landing");
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-white">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-solid border-slate-900 border-r-transparent"></div>
        <p className="mt-4 text-slate-600">Loading...</p>
      </div>
    </div>
  );
}
