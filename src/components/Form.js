import { useState } from "react";
import { predictPrice, saveModel } from "../model";

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
    if (!formData.area || formData.area <= 0) errors.area = "Enter a valid area!";
    if (!formData.bedrooms || formData.bedrooms <= 0) errors.bedrooms = "Enter a valid number of bedrooms!";
    if (!formData.bathrooms || formData.bathrooms <= 0) errors.bathrooms = "Enter a valid number of bathrooms!";
    if (!formData.age || formData.age < 0) errors.age = "Enter a valid property age!";
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

    try {
      const price = predictPrice(
        Number(formData.area),
        Number(formData.bedrooms),
        Number(formData.bathrooms),
        Number(formData.location),
        Number(formData.age)
      );
      setPrediction(price, formData);
      setError("");
      saveModel();
    } catch (error) {
      setError("An error occurred while predicting the price.");
    }
  };

  return (
    <div className="w-100">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">🏠 Area (sq ft)</label>
          <input className="form-control" type="number" name="area" placeholder="Enter area" onChange={handleChange} />
          {formErrors.area && <small className="text-danger">{formErrors.area}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">🛏 Bedrooms</label>
          <input className="form-control" type="number" name="bedrooms" placeholder="Enter bedrooms" onChange={handleChange} />
          {formErrors.bedrooms && <small className="text-danger">{formErrors.bedrooms}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">🛁 Bathrooms</label>
          <input className="form-control" type="number" name="bathrooms" placeholder="Enter bathrooms" onChange={handleChange} />
          {formErrors.bathrooms && <small className="text-danger">{formErrors.bathrooms}</small>}
        </div>

        <div className="mb-3">
          <label className="form-label">📍 Location</label>
          <select className="form-control" name="location" onChange={handleChange}>
            <option value="0">Downtown</option>
            <option value="1">Suburban</option>
            <option value="2">Rural</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">📆 Age (years)</label>
          <input className="form-control" type="number" name="age" placeholder="Enter property age" onChange={handleChange} />
          {formErrors.age && <small className="text-danger">{formErrors.age}</small>}
        </div>

        <button className="btn btn-warning w-100 mt-2" type="submit">🔍 Predict Price</button>
      </form>
    </div>
  );
};

export default Form;
