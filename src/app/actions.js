//define server actions
'use server'

//sending form to api
export const formSubmit = async (formData) => {
    const response = await fetch('https://bu0la6i3uj.execute-api.us-east-1.amazonaws.com/tickets', {
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