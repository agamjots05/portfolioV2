"use client";

import Link from "next/link";

export default function Resume() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation bar */}
      <div className="fixed top-0 left-0 right-0 p-4 z-10 bg-black/20 backdrop-blur-sm">
        <Link 
          href="/" 
          className="relative group transition-all duration-300 text-white"
        >
          <span className="relative">
            ← Back
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </span>
        </Link>
      </div>

      {/* PDF viewer */}
      <iframe
        src="/resume.pdf#view=FitH"
        className="flex-1 w-full h-full"
        style={{ height: 'calc(100vh - 0px)' }}
      />
    </div>
  );
}