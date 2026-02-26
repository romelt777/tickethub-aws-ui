//define server actions
'use server'

//sending form to api
export const formSubmit = async (formData) => {
    const response = await fetch(process.env.URL_SAM, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
        return ({
            status: response.status,
            message: 'Order submitted successfully!'
        });
    } else {
        return (
            {
                status: response.status,
                message: data
            }
        );
    }
}