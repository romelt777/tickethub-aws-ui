'use client'

import { useEffect, useState } from 'react';
import { formSubmit } from '@/app/actions';
import { useSearchParams } from 'next/navigation';


const CheckoutForm = ({ concertInfo }) => {
    //hold all data from the form fields
    const [formData, setFormData] = useState({
        id: concertInfo.id, email: '',
        name: '', phone: '',
        quantity: concertInfo.quantity, creditCard: '',
        expirationDate: '', securityCode: '',
        address: '', city: '',
        province: '', postalCode: '',
        country: ''
    });

    const searchParams = useSearchParams();
    useEffect(() => {
        const id = searchParams.get('id');
        const quantity = searchParams.get('quantity');

        setFormData((prev) => ({
            ...prev,
            id: id || '',
            quantity: quantity || '',
        }));
    }, [searchParams]);

    //hold the response from the api to display on webpage
    const [apiResponse, setApiResponse] = useState(null);

    const [apiResponseStatus, setApiResponseStatus] = useState(null);


    //holds the errors, to then change UI.
    const [fullError, setFullError] = useState(null);


    //when form changes, the values are saved to the state.
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        //stops form from reloading page.
        e.preventDefault();

        //reset errors
        setFullError({});

        //send formdata to formsubmit, function from actionJS
        const response = await formSubmit(formData);
        //setting the response to state, will display on webpage
        setApiResponseStatus(response.status);
        setApiResponse(response.message);
        if (response.message.errors) {
            let fullError = "";
            response.message.errors.forEach(error => {
                fullError += error;
            });
            console.log(fullError);
            setFullError(fullError);
        }

        //clearing form
        if (response.status === 200) {
            setFormData({
                id: concertInfo.id, email: '',
                name: '', phone: '',
                quantity: concertInfo.quantity, creditCard: '',
                expirationDate: '', securityCode: '',
                address: '', city: '',
                province: '', postalCode: '',
                country: ''
            })
        }

    };




    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white max-w-2xl mx-auto p-8 rounded-xl shadow-md space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Concert ID" name="id" error={fullError} value={formData.id || ''} readOnly />
                <FormInput label="Quantity" name="quantity" error={fullError} value={formData.quantity || ''} readOnly />
                <FormInput label="Email" name="email" error={fullError} value={formData.email} onChange={handleChange} type="email" />
                <FormInput label="Name" name="name" error={fullError} value={formData.name} onChange={handleChange} />
                <FormInput label="Phone" name="phone" error={fullError} value={formData.phone} onChange={handleChange} />
                <FormInput label="Credit Card" name="creditCard" error={fullError} value={formData.creditCard} onChange={handleChange} />
                <FormInput label="Expiration Date (MM/YY)" error={fullError} name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
                <FormInput label="Security Code" name="securityCode" error={fullError} value={formData.securityCode} onChange={handleChange} />
                <FormInput label="Address" name="address" error={fullError} value={formData.address} onChange={handleChange} />
                <FormInput label="City" name="city" error={fullError} value={formData.city} onChange={handleChange} />
                <FormInput label="Province" name="province" error={fullError} value={formData.province} onChange={handleChange} />
                <FormInput label="Postal Code" name="postalCode" error={fullError} value={formData.postalCode} onChange={handleChange} />
                <FormInput label="Country" name="country" error={fullError} value={formData.country} onChange={handleChange} />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
            >
                Submit Order
            </button>

            {apiResponse && (
                <div>
                    {apiResponseStatus === 200 ?
                        <p className="font-medium text-green-600">{apiResponse}</p> :
                        <ul className="font-medium text-red-600">
                            {apiResponse.errors.map((error) => (
                                <li key={error}>{error}</li>
                            ))}

                        </ul>
                    }

                </div>
            )}
        </form>
    )
}

const FormInput = ({ label, name, value, onChange, error, readOnly = false, type = 'text' }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
            {label}
        </label>
        {error && console.log(error + " " + label)}
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`${error?.toString().toLowerCase().includes(label.toLowerCase()) ? 'border-4 border-red-600' : 'border border-gray-300 '} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
            required
        />
    </div>
)

export default CheckoutForm;