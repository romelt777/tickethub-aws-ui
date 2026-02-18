import Link from "next/link";


const Concerts = () => {
    const concerts = [
        { id: '1', date: '2026-04-01' },
        { id: '2', date: '2026-05-10' },
        { id: '3', date: '2026-07-20' },
    ];

    const formatDate = (iso) => {
        const d = new Date(iso + 'T00:00:00');
        return d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-slate-50 px-6 py-16">
            <div className="max-w-3xl mx-auto">
                {/* header */}
                <div className="mb-10">
                    <p className="text-blue-500 text-sm font-semibold tracking-widest uppercase mb-2">Upcoming Events</p>
                    <h1 className="text-4xl font-bold text-slate-900 tracking-tight">All Concerts</h1>
                </div>

                {/* cards */}
                <div className="flex flex-col gap-4">
                    {concerts.map((concert) => (
                        <Link
                            key={concert.id}
                            href={{ pathname: `/concerts/${concert.id}`, query: { date: concert.date } }}
                            className="group bg-white border border-slate-200 rounded-2xl p-6 flex items-center justify-between hover:border-blue-300 hover:shadow-md transition-all duration-200"
                        >
                            <div className="flex items-center gap-5">
                                {/* date badge */}
                                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-blue-50 flex flex-col items-center justify-center border border-blue-100">
                                    <span className="text-blue-500 text-xs font-bold uppercase leading-none">
                                        {new Date(concert.date + 'T00:00:00').toLocaleString('en-US', { month: 'short' })}
                                    </span>
                                    <span className="text-slate-800 text-xl font-bold leading-none mt-0.5">
                                        {new Date(concert.date + 'T00:00:00').getDate()}
                                    </span>
                                </div>

                                <div>
                                    <h2 className="text-lg font-semibold text-slate-900">Concert #{concert.id}</h2>
                                    {/* <p className="text-slate-500 text-sm">{concert.venue} · {concert.genre}</p> */}
                                    <p className="text-slate-400 text-xs mt-0.5">{formatDate(concert.date)}</p>
                                </div>
                            </div>

                            {/* arrow */}
                            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-100 group-hover:bg-blue-500 flex items-center justify-center transition-colors duration-200">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400 group-hover:text-white transition-colors duration-200">
                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Concerts