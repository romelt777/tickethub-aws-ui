'use client'

import Link from 'next/link';
import { use, useState } from 'react'
import { useSearchParams } from 'next/navigation'


const ConcertDetails = ({ concert }) => {
    const searchParams = useSearchParams()
    const date = searchParams.get('date');

    const [quantity, setQuantity] = useState(1);

    const formatDate = (iso) => {
        const d = new Date((iso || '') + 'T00:00:00');
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-16">
            {/* thin blue top bar */}
            <div className="fixed top-0 left-0 right-0 h-1 bg-blue-500 z-10" />

            <div className="bg-white border border-slate-200 rounded-2xl shadow-sm w-full max-w-md overflow-hidden">
                {/* card header strip */}
                <div className="bg-blue-500 px-6 py-5">
                    <p className="text-blue-100 text-xs font-semibold tracking-widest uppercase mb-1">Live Performance</p>
                    <h1 className="text-2xl font-bold text-white">Concert #{concert.id}</h1>
                </div>

                {/* card body */}
                <div className="px-6 py-6 space-y-6">
                    {/* date row */}
                    <div className="flex items-center gap-3 text-slate-600 text-sm">
                        <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
                                <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
                            </svg>
                        </div>
                        {formatDate(date)}
                    </div>

                    <div className="border-t border-slate-100" />

                    {/* quantity */}
                    <div>
                        <label htmlFor="quantity" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                            Number of Tickets
                        </label>
                        <select
                            id="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                            className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-slate-800 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 transition"
                        >
                            {[...Array(10)].map((_, i) => (
                                <option key={i} value={i + 1}>
                                    {i + 1} {i === 0 ? 'ticket' : 'tickets'}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* book button */}
                    <Link
                        href={{ pathname: '/checkout', query: { id: concert.id, date: concert.date, quantity } }}
                        className="flex items-center justify-center gap-2 w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-3 rounded-xl shadow-md shadow-blue-100"
                    >
                        Book Now
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default ConcertDetails