import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard';
// import { supabase } from '../../lib/Supabase';
import products from '../../assets/images/products';

const Home = () => {

  // const [products, setProducts] = useState([]);

  // useEffect(() => {
  //   fetchProducts();
  // }, []);

  // const fetchProducts = async () => {
  //   const { data, error } = await supabase.from("Products").select("*");
  //   // console.log("hiiiiiiii")
  //   if (error) {
  //     console.error("Error fetching products:", error.message);
  //   } else {
  //     setProducts(data);
  //   }
  // };

  // console.log(products);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [sortBy, setSortBy] = useState('priceLowToHigh');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(9);

  useEffect(() => {
    filterAndSortProducts(searchQuery, sortBy);
  }, [searchQuery, sortBy, products]);

  const filterAndSortProducts = (query, sortBy) => {
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(query.toLowerCase())
    );

    filtered = sortProducts(filtered, sortBy);

    setFilteredProducts(filtered);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const sortProducts = (products, sortBy) => {
    return [...products].sort((a, b) => {
      const priceA = parseFloat(a.price.replace(/[^\d.]/g, ''));
      const priceB = parseFloat(b.price.replace(/[^\d.]/g, ''));

      if (sortBy === 'priceLowToHigh') {
        return priceA - priceB;
      } else {
        return priceB - priceA;
      }
    });
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow p-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-800">Welcome to FarmEase</h1>
          <p className="text-lg text-gray-600">Your one-stop solution for farming needs</p>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search for machines, seeds, plants..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
          />
        </div>

        <div className="flex justify-end">
          <label htmlFor="sortBy" className="mr-2 mt-2 text-gray-700">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={handleSortChange}
            className="p-2 border rounded-lg"
          >
            <option value="priceLowToHigh">Low to High</option>
            <option value="priceHighToLow">High to Low</option>
          </select>
        </div>

        {currentProducts.length > 0 ? (
          <section>
            <h2 className="text-3xl font-bold text-green-800 mb-6">Featured Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  image={product.image}
                  title={product.title}
                  description={product.description}
                  price={product.price}
                  category={product.category}
                  availability={product.availability}
                  ratings={product.ratings}
                  reviews={product.reviews}
                  specifications={product.specifications}
                  relatedProducts={product.relatedProducts}
                />
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-gray-600">No products found.</p>
        )}
        <br />

        <div className="flex justify-between items-center mb-6">
          <div>
            <label className="text-gray-700 font-semibold mr-2">Show:</label>
            <select
              id="productsPerPage"
              value={productsPerPage}
              onChange={(e) => setProductsPerPage(Number(e.target.value))}
              className="border p-2 rounded-lg text-gray-700"
            >
              <option value={9}>9 per page</option>
              <option value={18}>18 per page</option>
              <option value={27}>27 per page</option>
            </select>
          </div>

          <div className="flex space-x-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${currentPage === page ? "bg-green-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">What Farmers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "FarmEase has made it so easy to rent machines and buy seeds. The delivery is fast, and the quality is excellent!"
              </p>
              <p className="mt-4 font-semibold text-green-700">- John Doe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "The agricultural tips on this website have helped me improve my farming practices. Highly recommended!"
              </p>
              <p className="mt-4 font-semibold text-green-700">- Jane Smith</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-700 italic">
                "Connecting with dealers through FarmEase has been a game-changer for my business."
              </p>
              <p className="mt-4 font-semibold text-green-700">- Robert Brown</p>
            </div>
          </div>
        </section>

        <section className="mt-12 bg-green-100 p-8 rounded-lg text-center">
          <h2 className="text-3xl font-bold text-green-800 mb-4">Ready to Get Started?</h2>
          <button className="bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700">
            Explore Now
          </button>
        </section>
      </main>
    </div>
  );
};

export default Home;
