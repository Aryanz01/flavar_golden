"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/menu/3");
  }, [router]);

  return (
    <div className="h-screen w-full flex items-center justify-center bg-[#121212]">
      <div className="animate-pulse">
        <h1 className="gold-gradient-text text-2xl font-semibold">Loading Restaurant Menu...</h1>
      </div>
    </div>
  );
} 