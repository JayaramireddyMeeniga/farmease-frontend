import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import products from "../../assets/images/products";

const ProductFullDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    image,
    title,
    description,
    price,
    category,
    availability,
    ratings,
    reviews = [],
    specifications = [],
    relatedProducts = [],
  } = location.state || {};

  if (!location.state) {
    return <div>Product not found.</div>;
  }

  const relatedProductObjects = relatedProducts.map((id) =>
    products.find((product) => product.id === id)
  );

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
          >
            Back to Home
          </button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <img
              src={image}
              alt={title}
              className="w-full h-72 object-cover rounded-lg"
            />
            <div>
              <div className="flex justify-between items-center">
              <h1 className="text-3xl font-bold text-green-800">{title}</h1>
              <p className="text-gray-600 mt-2">{price}</p>
              </div>
              <p className="mt-4 text-gray-700">{description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <h2 className="text-xl font-bold text-green-800">Details</h2>
              <div className="mt-2 space-y-2">
                <p>
                  <span className="font-semibold">Category:</span> {category}
                </p>
                <p>
                  <span className="font-semibold">Availability:</span>{" "}
                  {availability}
                </p>
                <p>
                  <span className="font-semibold">Ratings:</span> {ratings}/5
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800">
                Specifications
              </h2>
              <ul className="mt-2 list-disc list-inside">
                {specifications.map((spec, index) => (
                  <li key={index} className="text-gray-700">
                    {spec}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-green-800">Reviews</h2>
              <div className="mt-2 space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-gray-700">{review.comment}</p>
                    <p className="text-sm text-gray-600 mt-2">
                      - {review.author}, {review.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-10 flex gap-40">
            <button className="w-96 bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Rent Now
            </button>

            <button className="w-96 bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600">
              Contact Owner
            </button>
          </div>

          <div className="mt-10">
            <h2 className="text-2xl font-bold text-green-800 mb-6">
              Related Products
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProductObjects.map(
                (product) =>
                  product && (
                    <div
                      key={product.id}
                      className="border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-green-800">
                          {product.title}
                        </h3>
                        <p className="text-gray-600">{product.price}</p>
                        <button
                          onClick={() =>
                            navigate(`/product/${product.id}`, { state: product })
                          }
                          className="mt-4 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  )
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductFullDetails;