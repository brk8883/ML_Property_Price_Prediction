import { useState, useEffect } from "react";
import Form from "./components/Form";
import Prediction from "./components/Prediction";
import ChartComponent from "./components/Chart";
import "bootstrap/dist/css/bootstrap.min.css";
import dataset from "./data/dataset.json";

const App = () => {
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState(null);
  const [predictedPrices, setPredictedPrices] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const actualPrices = dataset.map((data) => data.price);

  const handlePrediction = (price, data) => {
    setPrediction(price);
    setFormData(data);
    setPredictedPrices([...predictedPrices, price / 1000]);
    setFeedback(null); // Reset feedback on new prediction
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container-fluid bg-light min-vh-100">
      <div className="row">
        {/* Sidebar */}
        <div className="col-md-3 bg-dark text-white p-4 d-flex flex-column align-items-center">
          <h2 className="text-center mb-4">🏡 Real Estate Dashboard</h2>
          <Form setPrediction={handlePrediction} setError={setError} />
        </div>
        
        {/* Main Content */}
        <div className="col-md-9 p-4">
          <div className="row">
            <div className="col-md-6">
              <div className="card shadow p-3 h-100 d-flex flex-column justify-content-center">
                <h4 className="text-center">💰 Prediction Result</h4>
                <Prediction price={prediction} formData={formData} feedback={feedback} setFeedback={setFeedback} />
                {feedback && <p className="text-center mt-2">Thank you for your feedback! ({feedback})</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="card shadow p-3 h-100">
                <h4 className="text-center">📊 Market Data</h4>
                <ChartComponent actualPrices={actualPrices} predictedPrices={predictedPrices} />
              </div>
            </div>
          </div>
          
          {/* Recent Predictions */}
          <div className="row mt-4">
            <div className="col-md-12">
              <div className="card shadow p-3">
                <h4 className="text-center">📌 Recent Predictions</h4>
                <ul className="list-group list-group-flush">
                  {predictedPrices.length > 0 ? (
                    predictedPrices.map((price, index) => (
                      <li key={index} className="list-group-item">
                        Prediction {index + 1}: <strong>${price * 1000}</strong>
                      </li>
                    ))
                  ) : (
                    <li className="list-group-item text-muted">No predictions yet.</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
