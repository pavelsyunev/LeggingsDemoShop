/* eslint-disable jsx-a11y/no-onchange */
import React from "react"

export const OptionPicker = ({ name, options, onChange, selected }) => {
  return (
    <div className="col-span-6 sm:col-span-3">
      <label
        htmlFor="name"
        className="block text-sm font-medium leading-5 text-gray-700"
      >
        {name}
      </label>
      <select
        id="name"
        className="mt-1 block text-sm form-select w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5"
        onChange={onChange}
        value={selected}
      >
        {options.map(option => (
          <option value={option} key={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}
