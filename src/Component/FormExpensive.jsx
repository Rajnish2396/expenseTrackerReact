import React, { useEffect, useState } from "react";
import Input from "./Input";
import Select from "./Select";

export default function FormExpensive({ setExpensiveData, editLift }) {
  const [inpData, setInpData] = useState({});
  const [errors, setError] = useState({});

  // Populate `inpData` when `editLift` changes
  useEffect(() => {
    setInpData(editLift || {}); // Load the data to be edited
  }, [editLift]);

  // Input change handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInpData((prevState) => ({ ...prevState, [name]: value }));
    const { [name]: anyThing, ...rest } = errors; // Clear error for the current field
    setError(rest);
  };

  // Submit handler
  const submitHandler = (e) => {
    e.preventDefault();

    const validError = {};

    // Validation for title
    if (!inpData.title) {
      validError.title = "Please Enter Required.";
    } else if (inpData.title.length < 3) {
      validError.title = "Title Should be at least 3 Characters.";
    }

    // Validation for category
    if (!inpData.category) {
      validError.category = "Please Enter Category";
    }

    // Validation for amount
    if (!inpData.amount) {
      validError.amount = "Please Enter Amount.";
    }

    // If there are validation errors, update state and stop form submission
    if (Object.keys(validError).length > 0) {
      setError(validError);
      return;
    }

    // Check if editing or adding
    if (inpData.id) {
      // Update an existing expense
      setExpensiveData((prevState) =>
        prevState.map((item) => (item.id === inpData.id ? { ...inpData } : item))
      );
    } else {
      // Add a new expense
      setExpensiveData((prevState) => [
        ...prevState,
        { ...inpData, id: crypto.randomUUID() },
      ]);
    }

    // Reset the form fields and errors
    setInpData({});
    setError({});
  };

  return (
    <form className="expense-form" onSubmit={submitHandler}>
      <Input
        type="text"
        name="title"
        value={inpData.title || ""}
        placeholder="Title"
        onChange={inputHandler}
        errors={errors.title}
      />

      <div className="input-container">
        <Select
          id="category"
          name="category"
          value={inpData.category || ""}
          onChange={inputHandler}
          options={["Grocery", "Clothes", "Bills", "Education", "Medicine"]}
          errors={errors.category}
        />
      </div>

      <Input
        type="number"
        name="amount"
        value={inpData.amount || ""}
        placeholder="Amount"
        onChange={inputHandler}
        errors={errors.amount}
      />
      <button type="submit" className="add-btn">
        {inpData.id ? "Update" : "Add"}
      </button>
    </form>
  );
}
