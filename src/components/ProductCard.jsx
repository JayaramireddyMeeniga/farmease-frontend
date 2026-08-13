import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ id, image, title, description, price, category, availability, ratings, reviews, specifications, relatedProducts }) => {
  const navigate = useNavigate();

  // const truncateDescription = (text, wordLimit) => {
  //   const words = text.split(" ");
  //   return words.length > wordLimit ? words.slice(0, wordLimit).join(" ") + "..." : text;
  // };

  const truncatedDescription =
    description.length > 100 ? description.substring(0, 55) + "..." : description;

  return (
    <div className="border rounded-lg p-4 shadow-md">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded" />
      <div className="flex justify-between items-center mt-2 mb-2">
        <h2 className="text-lg font-bold">{title}</h2>
        <p className="text-green-700 font-semibold">{price}</p>
      </div>

      <p className="text-gray-600">{truncatedDescription}</p>
      <button onClick={() => navigate(`/product/${id}`, {
        state: {
          image, title, description, price, category,
          availability,
          ratings,
          reviews,
          specifications,
          relatedProducts,
        }
      })}
        className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
        View Details
      </button>
    </div>
  );
};

export default ProductCard;