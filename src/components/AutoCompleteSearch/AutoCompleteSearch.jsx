import { useEffect, useState } from "react";
import "./AutoCompleteSearch.css";

const AutoCompleteSearch = () => {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [cache, setCache] = useState({});
  const [show, setShow] = useState(false);

  // API Call
  const fetchData = async () => {
    try {
      if (cache[input]) {
        console.log("CACHED RETRIEVED: ", input);
        setResults(cache[input]);
        return;
      }
      console.log("API CALL: ", input);
      const res = await fetch(
        "https://dummyjson.com/recipes/search?q=" + input
      );
      const data = await res.json();
      setResults(data?.recipes);
      setCache((prev) => ({ ...prev, [input]: data?.recipes }));
    } catch (error) {
      console.log(error);
    }
  };

  // Call fetch data when component mounts
  useEffect(() => {
    let timer = setTimeout(fetchData, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <div className="main-container">
      <h1 className="heading">Auto Complete Search</h1>
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setShow(true)}
          onBlur={() => setShow(false)}
        />
        {show && (
          <div className="results-container">
            {results.length &&
              results.map((result) => (
                <div className="result-item" key={result.id}>
                  {result.name}
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AutoCompleteSearch;
