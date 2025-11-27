import { useEffect, useState } from "react";
import "./InfiniteScroll.css";

const Post = ({ url, title, id }) => {
  return <img key={id} src={url} alt={title} className="img-item" />;
};

const InfiniteScroll = () => {
  const [images, setImages] = useState([]);
  const [pageNo, setPageNo] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${pageNo}&limit=3`);
        const data = await res.json();
        setImages(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [pageNo]);
  
  return (
    <div className="main-container">
      <h1 className="heading">Infinite Scroll</h1>
      <div className="img-container">
        {!images.length ? (
          <div>Images not found!</div>
        ) : (
          images.map((image) => (
            <Post id={image.id} title={image.author} url={image.download_url} />
          ))
        )}
      </div>
    </div>
  );
};

export default InfiniteScroll;
