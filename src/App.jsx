import { useState } from "react";
import "./App.css";

// City Component to display fetched data
function City({ data }) {
  if (!data || data.length === 0) return null; // Ensure data exists before rendering Or else there'll be an error if you try to get first object in array

  const cityData = data[0]; // Get the first object in the array

  return (
    <div>
      <br />
      <h3>Search Results</h3>
      <p><strong>City:</strong> {cityData.City}</p>
      <p><strong>State:</strong></p>
      <p><strong>Location:</strong></p>
      <p><strong>Population:</strong></p>
      <p><strong>Total Wages:</strong></p>
    </div>
  );
}

// ZipSearchField Component to handle user input
function ZipSearchField({ input, setInput, handleSearch }) {
  return (
    <div>
      <br />
      Zip Code: <br />
      <input
        type="text"
        placeholder="Enter Zip Code"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          handleSearch(e.target.value); // Trigger the search immediately on input change
        }}
      />
    </div>
  );
}

function App() {
  const [input, setInput] = useState(""); // State to store the zip code user types in
  const [data, setData] = useState(null); // State to store the fetched data from API

  // Function to handle search and fetch data from the API
  const handleSearch = async (zip) => {
      const response = await fetch(`https://ctp-zip-code-api.onrender.com/${zip}`);
      const data = await response.json();
      setData(data);
  };

  return (
    <div className="App">
      <div className="App-header">
        <h1>Zip Code Search</h1>
      </div>

      <div className="mx-auto" style={{ maxWidth: 400 }}>
        <ZipSearchField input={input} setInput={setInput} handleSearch={handleSearch} />
        <City data={data} />
      </div>
    </div>
  );
}

export default App;