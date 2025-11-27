import { useCallback, useEffect, useState } from "react";

// Product Card Component
const ProductCard = ({ title, image }) => {
  return (
    <div className="product-card">
      <img src={image} alt={title} />
      <h3 className="title">{title}</h3>
    </div>
  );
};

const Pagination = () => {
  // Maintain State for storing fetch products
  const [products, setProducts] = useState([]);

  // Call API and fetch data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
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

  return (
    <div className="main-container">
      <h1 className="heading">Pagination</h1>
      <div className="card-container">
        {!products.length ? (
          <div>No Products Found!</div>
        ) : (
          products.map((product) => (
            <ProductCard title={product.title} image={product.thumbnail} />
          ))
        )}
      </div>
    </div>
  );
};

export default Pagination;
