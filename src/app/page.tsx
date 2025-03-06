"use client"; // Required since we use hooks

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the Welcome page on first load
    router.push("/home");
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <p className="text-lg text-gray-600">Redirecting...</p>
    </div>
  );
}
