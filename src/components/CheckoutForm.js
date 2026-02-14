'use client'

import { useEffect, useState, createContext, useContext } from 'react';
import { formSubmit } from '@/app/actions';
import { useSearchParams, useRouter } from 'next/navigation';
import DotsLoader from './DotsLoader';

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
            }, 3000);

            return () => clearTimeout(timer);
        }

        setLoading(false);

    };




    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white max-w-2xl mx-auto p-8 rounded-xl shadow-md space-y-6"
        >
            <h2 className="text-2xl font-semibold text-gray-800">Checkout</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <ErrorContext.Provider value={fullError}>
                    <FormInput label="Concert ID" name="id" value={formData.id || ''} readOnly />
                    <FormInput label="Quantity" name="quantity" value={formData.quantity || ''} readOnly />
                    <FormInput label="Email" name="email" value={formData.email} onChange={handleChange} type="email" />
                    <FormInput label="Name" name="name" value={formData.name} onChange={handleChange} />
                    <FormInput label="Phone" name="phone" value={formData.phone} onChange={handleChange} />
                    <FormInput label="Credit Card" name="creditCard" value={formData.creditCard} onChange={handleChange} />
                    <FormInput label="Expiration Date (MM/YY)" name="expirationDate" value={formData.expirationDate} onChange={handleChange} />
                    <FormInput label="Security Code" name="securityCode" value={formData.securityCode} onChange={handleChange} />
                    <FormInput label="Address" name="address" value={formData.address} onChange={handleChange} />
                    <FormInput label="City" name="city" value={formData.city} onChange={handleChange} />
                    <FormInput label="Province" name="province" value={formData.province} onChange={handleChange} />
                    <FormInput label="Postal Code" name="postalCode" value={formData.postalCode} onChange={handleChange} />
                    <FormInput label="Country" name="country" value={formData.country} onChange={handleChange} />

                </ErrorContext.Provider>

            </div>

            {loading ? (
                <div className="flex items-center justify-center">
                    <span className="inline-block animate-spin">◐</span>
                </div>
            ) : (
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-4 rounded-lg transition"
                >
                    Submit Order
                </button>
            )}


            {apiResponse && (
                <div>
                    {apiResponseStatus === 200 ?
                        <div className="font-medium text-green-600">{apiResponse} Redirecting to Home  <DotsLoader /></div> :
                        <ul className="font-medium text-red-600">
                            {apiResponse.errors.map((error, i) => (
                                Object.entries(error).map(([key, value]) => (
                                    <li key={`${i}-${key}`}>{value}</li>
                                ))
                            )
                            )}
                        </ul>
                    }

                </div>
            )}
        </form>
    )
}

const FormInput = ({ label, name, value, onChange, readOnly = false, type = 'text' }) => {
    const error = useContext(ErrorContext);
    const hasError = error && error[name];

    //Expiration Date:
    //splitting exp date into 2 values
    const [month, year] = (value || '').split('/');
    // console.log("MOnth " + month + "year " + year);

    //handle the expiration Date changing dropdown
    const handleSelectChange = (e) => {
        //putting the name, and value assigning it to incoming target.
        const { name: selectName, value: selectValue } = e.target;

        //new month and year
        const newMonth = selectName === "month" ? selectValue : (month || '');
        const newYear = selectName === "year" ? selectValue : (year || '');

        //combine both and send back to parent 
        //build the target for handleOnChange
        onChange({
            target: {
                name: "expirationDate",
                value: `${newMonth}/${newYear}`
            }
        });
    }

    return (
        <div className="flex flex-col">
            <label htmlFor={name} className="mb-1 text-sm font-medium text-gray-700">
                {label}
            </label>
            {name === "expirationDate" ?
                <div className="flex gap-2">
                    <select
                        name="month"
                        autoComplete="cc-exp-month"
                        required
                        value={month || ""}
                        onChange={handleSelectChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="" disabled>MM</option>
                        <option value="01">01 - Jan</option>
                        <option value="02">02 - Feb</option>
                        <option value="03">03 - Mar</option>
                        <option value="04">04 - Apr</option>
                        <option value="05">05 - May</option>
                        <option value="06">06 - Jun</option>
                        <option value="07">07 - Jul</option>
                        <option value="08">08 - Aug</option>
                        <option value="09">09 - Sep</option>
                        <option value="10">10 - Oct</option>
                        <option value="11">11 - Nov</option>
                        <option value="12">12 - Dec</option>
                    </select>
                    <select
                        name="year"
                        autoComplete="cc-exp-year"
                        required
                        value={year || ""}
                        onChange={handleSelectChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300"
                    >
                        <option value="" disabled>YY</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                        <option value="28">2028</option>
                        <option value="29">2029</option>
                        <option value="30">2030</option>
                        <option value="31">2031</option>
                        <option value="32">2032</option>
                        <option value="33">2033</option>
                        <option value="34">2034</option>
                        <option value="35">2035</option>
                    </select>
                </div>
                : <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onChange={onChange}
                    readOnly={readOnly}
                    className={`${hasError ? 'border-4 border-red-600' : 'border border-gray-300 '} rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    required
                />}

        </div>
    )
}



export default CheckoutForm;