import React from 'react'

export default function Select({ id, name, value, onChange, options, errors }) {
    return (
        <>
            <div className="input-container">
                {errors ? <label>{errors}</label> : null}
                <select
                    name={name}
                    value={value}
                    onChange={onChange}
                >
                    <option value="" hidden>Select Category</option>
                    {options.map((el, i) => <option key={i} value={el}>{el}</option>)}
                </select>
            </div>
        </>
    )
}
