import { useCallback, useEffect, useMemo, useState } from "react";
import "./Pagination.css";

// Product Card Component
const ProductCard = ({ id, title, image }) => {
  return (
    <div key={id} className="product-card">
      <img src={image} alt={title} />
      <h3 className="title">{title}</h3>
    </div>
  );
};

const PAGE_SIZE = 10;

const Pagination = () => {
  // Maintain State for storing fetch products
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  // Call API and fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/products?limit=200");
      const data = await response.json();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Call API when component mounts for first time
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  // Calculations of the values
  const totalProducts = products.length;
  const noOfPages = Math.ceil(totalProducts / PAGE_SIZE);
  const start = currentPage * PAGE_SIZE;
  const end = start + PAGE_SIZE;

  // Function to handle page change
  const handlePageChange = (n) => {
    setCurrentPage(n);
  };
  
  const handlePrevClick = () => {
    setCurrentPage((prev) => prev - 1);
  }
  
  const handleNextClick = () => {
    setCurrentPage((prev) => prev + 1);
  }
  
  // Memoizing page array once, so do not need to create again and again
  const pageArray = useMemo(() => [...Array(noOfPages).keys()], [noOfPages]);

  return (
    <div className="main-container">
      <h1 className="heading">Pagination</h1>
      <div className="card-container">
        {!products.length ? (
          <div>No Products Found!</div>
        ) : (
          products
            .slice(start, end)
            .map((product) => (
              <ProductCard key={product.id} title={product.title} image={product.thumbnail} />
            ))
        )}
      </div>
      <div className="pagination-container">
        <button className="pagination-item" disabled = {currentPage === 0} onClick={() => handlePrevClick()}>
          ⬅️
        </button>
        {pageArray.map((n) => (
          <button
            className={`pagination-item ${n === currentPage && "active"}`}
            onClick={() => handlePageChange(n)}
          >
            {n}
          </button>
        ))}
        <button disabled={currentPage === noOfPages - 1} className="pagination-item" onClick={() => handleNextClick()}>
          ➡️
        </button>
      </div>
    </div>
  );
};

export default Pagination;
