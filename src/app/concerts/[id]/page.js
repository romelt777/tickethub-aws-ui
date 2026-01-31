import ConcertDetails from "@/components/ConcertDetails";

const Concert = async ({ params, searchParams }) => {
    const concertParams = await params;
    const id = concertParams.id;
    const date = concertParams.date;
    const quantity = concertParams.quantity;

    const concert = {
        id: id,
        date: date,
        quantity: quantity

    }

    return (
        <>
            <ConcertDetails concert={concert}></ConcertDetails>
        </>
    )
}

export default Concert