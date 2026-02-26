const FormInput = ({ label, name, value, onChange, readOnly = false, type = 'text', error }) => {
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
        <div className="flex flex-col gap-1.5">
            <label htmlFor={name} className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
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
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
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
                        className="flex-1 border border-slate-200 rounded-xl px-3 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition"
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
                    className={`${hasError ? 'border-4 border-red-600' : 'border border-gray-300 '} w-full rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-300 ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
                    required
                />}

        </div>
    )
}

export default FormInput;
