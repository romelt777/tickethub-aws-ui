import { useMemo } from "react";

const FormInput = ({ label, name, value, onChange, readOnly = false, type = 'text', error }) => {
    const hasError = error && error[name];

    //Expiration Date:
    //splitting exp date into 2 values
    const [month, year] = (value || '').split('/');

    //get current month and year
    const now = new Date();
    const currentMonth = now.getMonth() + 1; //1-12
    const currentYear = now.getFullYear() % 100;  //%100 to get last to digits

    //function to generate available years automatically
    const availableYears = useMemo(() => {
        const years = [];
        for (let y = currentYear; y <= currentYear + 10; y++) {
            years.push(String(y));
        }
        return years;
    }, [currentYear]); //only recalculates when currentYear changes

    //generate months based on the year
    const availableMonths = useMemo(() => {
        const months = [
            { value: '01', label: '01 - Jan' },
            { value: '02', label: '02 - Feb' },
            { value: '03', label: '03 - Mar' },
            { value: '04', label: '04 - Apr' },
            { value: '05', label: '05 - May' },
            { value: '06', label: '06 - Jun' },
            { value: '07', label: '07 - Jul' },
            { value: '08', label: '08 - Aug' },
            { value: '09', label: '09 - Sep' },
            { value: '10', label: '10 - Oct' },
            { value: '11', label: '11 - Nov' },
            { value: '12', label: '12 - Dec' },
        ];

        if (year && parseInt(year) === currentYear) {
            return months.filter(m => parseInt(m.value) > currentMonth);
        }
        else {
            return months;
        }
    }, [year, currentMonth, currentYear]);

    //handle the expiration Date changing dropdown
    const handleSelectChange = (e) => {
        //putting the name, and value assigning it to incoming target.
        const { name: selectName, value: selectValue } = e.target;

        //new month and year
        let newMonth = selectName === "month" ? selectValue : (month || '');
        let newYear = selectName === "year" ? selectValue : (year || '');

        //reset the month if its in the past
        if (selectName === "year" && parseInt(selectValue) === currentYear) {
            if (newMonth && parseInt(newMonth) <= currentMonth) {
                newMonth = "";
            }
        }

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
                        {availableMonths.map((m) => (
                            <option key={m.value} value={m.value}>
                                {m.label}
                            </option>
                        ))}
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
                        {availableYears.map((y) => (
                            <option key={y} value={y}>
                                20{y}
                            </option>
                        ))}
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
