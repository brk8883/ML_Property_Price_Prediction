
import { useState } from "react";
import dataset from "../data/dataset.json";

const Prediction = ({ price, formData }) => {
  const [feedback, setFeedback] = useState(null);

  const findSimilarHouses = () => {
    if (!formData) return [];

    const similarHouses = dataset.filter((house) => {
      const matchesArea = Math.abs(house.area - formData.area) <= 3000;
      const matchesBedrooms = Math.abs(house.bedrooms - formData.bedrooms) <= 2;
      const matchesBathrooms = Math.abs(house.bathrooms - formData.bathrooms) <= 2;
      const matchesAge = Math.abs(house.age - formData.age) <= 20;
      const matchesLocation = house.location === Number(formData.location);

      return matchesArea && matchesBedrooms && matchesBathrooms && matchesAge && matchesLocation;
    });

    return similarHouses.slice(0, 5);
  };

  const similarHouses = findSimilarHouses();

  const handleFeedback = (response) => {
    setFeedback(response);
    localStorage.setItem("prediction_feedback", response);
  };

  return (
    <div className="container mt-3">
      {price !== null ? (
        <>
          <h4>Predicted Price: ${price.toLocaleString()}</h4>

          <h5>🔍 Similar Houses:</h5>
          {similarHouses.length > 0 ? (
            <ul>
              {similarHouses.map((house, index) => (
                <li key={index}>
                  {house.area} sqft | {house.bedrooms} Bed | {house.bathrooms} Bath | Age: {house.age} years →  
                  <strong> ${house.price.toLocaleString()}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>⚠️ No exact matches, but consider adjusting your search.</p>
          )}

          <p>Was this prediction accurate?</p>
          <button className="btn btn-success m-2" onClick={() => handleFeedback("accurate")}>
            ✅ Yes
          </button>
          <button className="btn btn-danger m-2" onClick={() => handleFeedback("inaccurate")}>
            ❌ No
          </button>

          {feedback && <p className="mt-2">Thank you for your feedback! ({feedback})</p>}
        </>
      ) : (
        <p>No prediction yet.</p>
      )}
    </div>
  );
};

export default Prediction;

