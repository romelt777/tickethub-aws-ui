'use client'

import { useEffect, useState, createContext, useContext } from 'react';
import { formSubmit } from '@/app/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import DotsLoader from './DotsLoader';
import FormInput from './FormInput';

//creating context for errors
const ErrorContext = createContext({});

const CheckoutForm = ({ concertInfo }) => {
    //router for redirecting
    const router = useRouter();

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
    const [fullError, setFullError] = useState({});

    //holds loading state
    const [loading, setLoading] = useState(false);

    //holds redirect state
    const [redirect, setRedirect] = useState(false);


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

        setLoading(true);

        //send formdata to formsubmit, function from actionJS
        const response = await formSubmit(formData);
        //setting the response to state, will display on webpage
        setApiResponseStatus(response.status);
        setApiResponse(response.message);
        if (response.message.errors) {
            console.log(response.message.errors);
            let fullError = "";
            response.message.errors.forEach(error => {
                fullError += error;
            });
            // console.log(fullError);

            const errorMap = Object.assign({}, ...response.message.errors);
            console.log(errorMap);
            setFullError(errorMap);
        }

        //clearing form
        if (response.status === 200) {
            setLoading(false);
            setRedirect(true);

            setFormData({
                id: concertInfo.id, email: '',
                name: '', phone: '',
                quantity: concertInfo.quantity, creditCard: '',
                expirationDate: '', securityCode: '',
                address: '', city: '',
                province: '', postalCode: '',
                country: ''
            })

            const timer = setTimeout(() => {
                router.push("/");
            }, 5000);

            return () => clearTimeout(timer);
        }

        setLoading(false);

    };




    return (
        <div className="min-h-screen bg-slate-50 flex items-start justify-center px-4 py-12">

            <form
                onSubmit={handleSubmit}
                className="bg-white w-full max-w-2xl rounded-2xl shadow-sm border border-slate-200 overflow-hidden"
            >
                {/* header strip */}
                <div className="bg-blue-500 px-8 py-6">
                    <h2 className="text-2xl font-bold text-white">Checkout</h2>
                </div>

                <div className="p-8 space-y-4">
                    <ErrorContext.Provider value={fullError}>
                        <FormInput label="Concert ID" name="id" value={formData.id || ''} readOnly />
                        <FormInput label="Quantity" name="quantity" value={formData.quantity || ''} readOnly />
                        <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" error={fullError} />
                        <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} error={fullError} />
                        <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} error={fullError} />
                        <FormInput label="Credit Card" name="creditCard" value={formData.creditCard} onChange={handleChange} error={fullError} />
                        <FormInput label="Expiration Date (MM/YY)" name="expirationDate" value={formData.expirationDate} onChange={handleChange} error={fullError} />
                        <FormInput label="Security Code" name="securityCode" value={formData.securityCode} onChange={handleChange} error={fullError} />
                        <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} error={fullError} />
                        <FormInput label="City" name="city" value={formData.city} onChange={handleChange} error={fullError} />
                        <FormInput label="Province" name="province" value={formData.province} onChange={handleChange} error={fullError} />
                        <FormInput label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} error={fullError} />
                        <FormInput label="Country" name="country" value={formData.country} onChange={handleChange} error={fullError} />

                    </ErrorContext.Provider>

                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-2">
                        <div className="w-6 h-6 border-2 border-slate-200 border-t-blue-500 rounded-full animate-spin" />
                    </div>
                ) : (
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-3 px-4 rounded-xl"
                    >
                        Submit Order
                    </button>
                )}


                {apiResponse && (
                    <div>
                        {apiResponseStatus === 200 ?
                            <div className="flex items-center gap-2 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                                {apiResponse} Redirecting to Home <DotsLoader />
                            </div> :
                            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                                <ul className="text-red-500 text-sm space-y-1">
                                    {apiResponse.errors.map((error, i) => (
                                        Object.entries(error).map(([key, value]) => (
                                            <li key={`${i}-${key}`}>{value}</li>
                                        ))
                                    ))}
                                </ul>
                            </div>
                        }

                    </div>
                )}
            </form>
        </div>
    )
}


export default CheckoutForm;