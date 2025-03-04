
import { useState } from "react";
import { predictPrice, saveModel } from "../model";
import "bootstrap/dist/css/bootstrap.min.css";

const Form = ({ setPrediction, setError }) => {
  const [formData, setFormData] = useState({
    area: "",
    bedrooms: "",
    bathrooms: "",
    location: "0",
    age: ""
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setFormErrors({ ...formErrors, [e.target.name]: "" });
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.area || formData.area <= 0) errors.area = "❌ Enter a valid area!";
    if (!formData.bedrooms || formData.bedrooms <= 0) errors.bedrooms = "❌ Enter a valid number of bedrooms!";
    if (!formData.bathrooms || formData.bathrooms <= 0) errors.bathrooms = "❌ Enter a valid number of bathrooms!";
    if (!formData.age || formData.age < 0) errors.age = "❌ Enter a valid property age!";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setError("Please correct the errors before submitting.");
      return;
    }

    const { area, bedrooms, bathrooms, location, age } = formData;
    try {
      const price = predictPrice(Number(area), Number(bedrooms), Number(bathrooms), Number(location), Number(age));
      setPrediction(price, formData);
      setError("");
      saveModel();
    } catch (error) {
      setError("⚠️ An error occurred while predicting the price. Please try again.");
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <input className="form-control" type="number" name="area" placeholder="Area (sq ft)" onChange={handleChange} />
        {formErrors.area && <p className="error-message">{formErrors.area}</p>}

        <input className="form-control mt-2" type="number" name="bedrooms" placeholder="Bedrooms" onChange={handleChange} />
        {formErrors.bedrooms && <p className="error-message">{formErrors.bedrooms}</p>}

        <input className="form-control mt-2" type="number" name="bathrooms" placeholder="Bathrooms" onChange={handleChange} />
        {formErrors.bathrooms && <p className="error-message">{formErrors.bathrooms}</p>}

        <select className="form-control mt-2" name="location" onChange={handleChange}>
          <option value="0">Downtown</option>
          <option value="1">Suburban</option>
          <option value="2">Rural</option>
        </select>

        <input className="form-control mt-2" type="number" name="age" placeholder="Age (years)" onChange={handleChange} />
        {formErrors.age && <p className="error-message">{formErrors.age}</p>}

        <button className="btn btn-success mt-3" type="submit">Predict Price</button>
      </form>
    </div>
  );
};

export default Form;
