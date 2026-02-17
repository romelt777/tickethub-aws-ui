import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-6">
      {/* thin blue top bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-blue-500" />

      <div className="text-center max-w-md">
        {/* icon mark */}
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-500 mb-8 shadow-lg shadow-blue-200">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v3" />
            <path d="M2 15v3a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
            <path d="M17 9v6M7 9v6" />
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-slate-900 tracking-tight mb-3">
          TicketHub
        </h1>
        <p className="text-slate-500 text-lg mb-10">
          Find and book tickets for live concerts near you.
        </p>

        <Link
          href="/concerts"
          className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold px-6 py-3 rounded-xl shadow-md shadow-blue-200"
        >
          View All Concerts
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
