import React, { useState } from "react";
import { FiSend, FiSearch, FiHeart, FiMessageSquare, FiUser } from "react-icons/fi";

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Farmer John",
      avatar: "👨‍🌾",
      content: "How to improve soil fertility? I've noticed my wheat yields decreasing over the past few seasons.",
      category: "Soil Health",
      likes: 12,
      comments: 5,
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      user: "Farmer Jane",
      avatar: "👩‍🌾",
      content: "Best crops for rainy season? Our region gets heavy rainfall from June-August.",
      category: "Crop Selection",
      likes: 8,
      comments: 3,
      timestamp: "5 hours ago"
    },
    {
      id: 3,
      user: "Farmer Mike",
      avatar: "🧑‍🌾",
      content: "How to control pests naturally? I want to avoid chemical pesticides in my organic farm.",
      category: "Pest Control",
      likes: 15,
      comments: 7,
      timestamp: "1 day ago"
    },
    {
      id: 4,
      user: "Farmer Sarah",
      avatar: "👩‍🌾",
      content: "Which fertilizers are best for wheat? Looking for both organic and conventional options.",
      category: "Fertilizers",
      likes: 6,
      comments: 4,
      timestamp: "1 day ago"
    },
    {
      id: 5,
      user: "Farmer Alex",
      avatar: "👨‍🌾",
      content: "How to increase crop yield? My corn production has plateaued despite good weather.",
      category: "Yield Improvement",
      likes: 10,
      comments: 6,
      timestamp: "2 days ago"
    },
    {
      id: 6,
      user: "Farmer Emily",
      avatar: "👩‍🌾",
      content: "Best irrigation methods for dry regions? Water conservation is critical in our area.",
      category: "Irrigation",
      likes: 9,
      comments: 3,
      timestamp: "2 days ago"
    },
  ]);

  const [newPost, setNewPost] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeTab, setActiveTab] = useState("Recent");

  const categories = ["All", "Soil Health", "Crop Selection", "Pest Control", "Fertilizers", "Irrigation", "Yield Improvement"];

  const addPost = () => {
    if (newPost.trim()) {
      const post = {
        id: posts.length + 1,
        user: "You",
        avatar: "👤",
        content: newPost,
        category: "General",
        likes: 0,
        comments: 0,
        timestamp: "Just now"
      };
      setPosts([post, ...posts]);
      setNewPost("");
    }
  };

  const likePost = (postId) => {
    setPosts(posts.map(post =>
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  const filteredPosts = posts
    .filter(post =>
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.user.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(post => selectedCategory === "All" || post.category === selectedCategory)
    .sort((a, b) => {
      if (activeTab === "Recent") return new Date(b.timestamp) - new Date(a.timestamp);
      if (activeTab === "Popular") return b.likes - a.likes;
      return 0;
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 p-4 md:px-5 md:py-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-green-800">Farmers Community</h1>
            <p className="text-green-600 mt-2">
              Connect with fellow farmers, share knowledge, and grow together
            </p>
          </div>
          <div className="relative mt-4 md:mt-0 w-full md:w-64">
            <FiSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search discussions..."
              className="w-full pl-10 pr-4 py-2 rounded-full border border-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Post Creation Area */}
          <div className="p-6 border-b border-green-100">
            <div className="flex items-start space-x-3">
              <div className="bg-green-100 text-green-800 rounded-full w-10 h-10 flex items-center justify-center">
                <FiUser size={20} />
              </div>
              <div className="flex-1">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  className="w-full p-3 border border-green-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  placeholder="Start a discussion... Share your farming question or experience"
                  rows="3"
                />
                <div className="flex justify-between items-center mt-3">
                  <select
                    className="border border-green-200 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-green-500"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <button
                    onClick={addPost}
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition duration-200"
                  >
                    <FiSend size={18} />
                    <span>Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-green-100">
            <button
              className={`px-6 py-3 font-medium ${activeTab === "Recent" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("Recent")}
            >
              Recent Discussions
            </button>
            <button
              className={`px-6 py-3 font-medium ${activeTab === "Popular" ? "text-green-600 border-b-2 border-green-600" : "text-gray-500"}`}
              onClick={() => setActiveTab("Popular")}
            >
              Popular Discussions
            </button>
          </div>

          {/* Posts List */}
          <div className="divide-y divide-green-100">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div key={post.id} className="p-6 hover:bg-green-50 transition duration-150">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 text-green-800 rounded-full w-12 h-12 flex items-center justify-center text-xl">
                      {post.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-green-800">{post.user}</h3>
                          <span className="text-xs text-gray-500">{post.timestamp}</span>
                        </div>
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          {post.category}
                        </span>
                      </div>
                      <p className="mt-2 text-gray-700">{post.content}</p>
                      <div className="flex items-center space-x-4 mt-4">
                        <button
                          onClick={() => likePost(post.id)}
                          className="flex items-center space-x-1 text-gray-500 hover:text-green-600"
                        >
                          <FiHeart size={18} />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center space-x-1 text-gray-500 hover:text-green-600">
                          <FiMessageSquare size={18} />
                          <span>{post.comments}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No discussions found. Start a new discussion!
              </div>
            )}
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mt-8 bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4">Community Guidelines</h2>
          <ul className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Be respectful and supportive of fellow farmers
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Share your experiences and knowledge generously
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Keep discussions relevant to farming and agriculture
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Provide constructive feedback and suggestions
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              Report any inappropriate content to moderators
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CommunityForum;