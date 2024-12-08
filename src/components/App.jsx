import { useState, useEffect } from 'react';
import Axios from 'axios';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons'; // Specific quote-right icon from FontAwesome

function App() {
  const [quote, setQuote] = useState("");

  const fetchRandomQuote = async () => {
    try {
      const response = await Axios.get(     // Sending a GET request to the API to get a random quote
        `https://quotesondesign.com/wp-json/wp/v2/posts/?orderby=rand&timestamp=${new Date().getTime()}`
      );
      const randomQuote = response.data[0]?.content?.rendered || "No quote found";      // Fallback message if no quote is found
      setQuote(randomQuote);
    } catch (error) {
      console.error("Error fetching the quote:", error);      // Log the error and display a fallback message in the console
      setQuote("Failed to fetch quote. Please try again.");   // Display a fallback message in the UI
    }
  };

  return (
    <div className="container">
      <button onClick={fetchRandomQuote} className="generate-btn">
        Generate Design Quote
      </button>
      <div className="quote-display">
      <FontAwesomeIcon icon={faQuoteRight} className="quote-icon" />
        {/* The dangerouslySetInnerHTML is used to render HTML content safely. The Quote looks weird without it. */}
        <span dangerouslySetInnerHTML={{ __html: quote }} />
      </div>
    </div>
  );
}

export default App;
