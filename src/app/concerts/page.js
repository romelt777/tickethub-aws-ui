import Link from "next/link";


const Concerts = () => {
    const concerts = [
        { id: '1', date: '2026-04-01' },
        { id: '2', date: '2026-05-10' },
        { id: '3', date: '2026-07-20' },
    ];

    return (
        <>
            <h1 className="text-3xl font-bold">All Concerts</h1>

            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-3">
                {concerts.map((concert) => (
                    <Link key={concert.id}
                        href={{
                            pathname: `/concerts/${concert.id}`,
                            query: { date: concert.date },
                        }}
                    >
                        <div className="border rounded-xl p-4 shadow hover:bg-gray-100 transition">
                            <h2 className="text-xl font-semibold">Concert #{concert.id}</h2>
                            <p className="text-gray-600">{concert.date}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default Concerts