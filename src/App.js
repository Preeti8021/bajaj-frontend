import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [error, setError] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleJsonSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);

      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("JSON must contain a 'data' array.");
        return;
      }

      setError("");
      const result = await axios.post("https://bajaj-backend-one-green.vercel.app/bfhl", parsedInput); // Backend URL
      setResponse(result.data);
    } catch (err) {
      setError("Invalid JSON input.");
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedOptions.includes("Highest Lowercase Alphabet")) {
      filteredResponse.highest_lowercase_alphabet =
        response.highest_lowercase_alphabet;
    }

    return (
      <div className="response">
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>BAJAJ-TASK</h1> {}
      <textarea
        placeholder='Enter JSON here, e.g. {"data": ["A", "C", "z"]}'
        value={jsonInput}
        onChange={handleJsonChange}
        rows="6"
        cols="50"
      />
      <br />
      <button onClick={handleJsonSubmit}>Submit</button>
      {error && <p className="error">{error}</p>}
      {response && (
        <div>
          <label>
            Select data to display:
            <select
              multiple
              onChange={handleOptionChange}
              className="dropdown"
            >
              <option value="Alphabets">Alphabets</option>
              <option value="Numbers">Numbers</option>
              <option value="Highest Lowercase Alphabet">
                Highest Lowercase Alphabet
              </option>
            </select>
          </label>
        </div>
      )}
      {renderResponse()}
    </div>
  );
}

export default App;
