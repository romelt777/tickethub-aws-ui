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

        //send formdata to formsubmit, function from actionJS
        const response = await formSubmit(formData);
        //setting the response to state, will display on webpage
        setApiResponseStatus(response.status);
        setApiResponse(response.message);

    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white max-w-2xl mx-auto p-8 rounded-xl shadow-md space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormInput label="Concert ID" name="ConcertId" value={formData.id || ''} readOnly />
                <FormInput label="Quantity" name="Quantity" value={formData.quantity || ''} readOnly />
                <FormInput label="Email" name="Email" value={formData.email} onChange={handleChange} type="email" />
                <FormInput label="Name" name="Name" value={formData.name} onChange={handleChange} />
                <FormInput label="Phone" name="Phone" value={formData.phone} onChange={handleChange} />
                <FormInput label="Credit Card" name="CreditCard" value={formData.creditCard} onChange={handleChange} />
                <FormInput label="Expiration Date (MM/YY)" name="ExpirationDate" value={formData.expirationDate} onChange={handleChange} />
                <FormInput label="Security Code" name="SecurityCode" value={formData.securityCode} onChange={handleChange} />
                <FormInput label="Address" name="Address" value={formData.address} onChange={handleChange} />
                <FormInput label="City" name="City" value={formData.city} onChange={handleChange} />
                <FormInput label="Province" name="Province" value={formData.province} onChange={handleChange} />
                <FormInput label="Postal Code" name="PostalCode" value={formData.postalCode} onChange={handleChange} />
                <FormInput label="Country" name="Country" value={formData.country} onChange={handleChange} />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
            >
                Submit Order
            </button>

            {apiResponse && (
                <p className={`font-medium ${apiResponseStatus === 200 ? 'text-green-600' : 'text-red-600'}`}>
                    {apiResponseStatus}
                    {apiResponse}
                </p>
            )}
        </form>
    )
}

const FormInput = ({ label, name, value, onChange, readOnly = false, type = 'text' }) => (
    <div className="flex flex-col">
        <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            readOnly={readOnly}
            className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
            required
        />
    </div>
)

export default CheckoutForm;