import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MapPin, Clock, Truck, Package, AlertCircle, CheckCircle, Phone, MessageSquare, Star, TrendingUp, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Delivery = () => {
    const [selectedCategory, setSelectedCategory] = useState('seeds');
    const [orderFilter, setOrderFilter] = useState('all');
    const [hoveredProduct, setHoveredProduct] = useState(null);
    const navigate = useNavigate();

    const categories = [
        {
            id: 'seeds',
            name: 'Seeds',
            icon: '🌱',
            color: 'bg-green-500',
            description: 'High-quality seeds for various crops'
        },
        {
            id: 'fertilizer',
            name: 'Fertilizer',
            icon: '🌾',
            color: 'bg-yellow-500',
            description: 'Organic and chemical fertilizers'
        },
        {
            id: 'pesticide',
            name: 'Pesticides',
            icon: '🛡️',
            color: 'bg-red-500',
            description: 'Pest control and fungicide solutions'
        },
        {
            id: 'equipment',
            name: 'Equipment',
            icon: '🚜',
            color: 'bg-blue-500',
            description: 'Farming tools and equipment'
        }
    ];

    const deliveryProducts = {
        seeds: [
            {
                id: 1,
                name: 'Hybrid Rice Seeds',
                supplier: 'Green Seeds Co.',
                price: '$45/kg',
                quantity: '25 kg bags',
                deliveryTime: '2-3 days',
                rating: 4.8,
                status: 'available'
            },
            {
                id: 2,
                name: 'Wheat Seeds Premium',
                supplier: 'Harvest Grains',
                price: '$35/kg',
                quantity: '20 kg bags',
                deliveryTime: '2-3 days',
                rating: 4.6,
                status: 'available'
            },
            {
                id: 3,
                name: 'Corn Seeds Organic',
                supplier: 'Organic Farms',
                price: '$50/kg',
                quantity: '15 kg bags',
                deliveryTime: '3-4 days',
                rating: 4.7,
                status: 'available'
            },
            {
                id: 4,
                name: 'Vegetable Mix Seeds',
                supplier: 'Urban Crops',
                price: '$60/pack',
                quantity: 'Assorted pack',
                deliveryTime: '1-2 days',
                rating: 4.9,
                status: 'available'
            }
        ],
        fertilizer: [
            {
                id: 5,
                name: 'NPK 10-26-26 Fertilizer',
                supplier: 'Agro Nutrients',
                price: '$40/bag',
                quantity: '50 kg bags',
                deliveryTime: '2-3 days',
                rating: 4.7,
                status: 'available'
            },
            {
                id: 6,
                name: 'Organic Compost',
                supplier: 'Earth Care',
                price: '$25/bag',
                quantity: '25 kg bags',
                deliveryTime: '2-3 days',
                rating: 4.5,
                status: 'available'
            },
            {
                id: 7,
                name: 'Micronutrient Mix',
                supplier: 'Soil Science',
                price: '$55/kg',
                quantity: '10 kg packets',
                deliveryTime: '3-4 days',
                rating: 4.8,
                status: 'available'
            },
            {
                id: 8,
                name: 'Bio Fertilizer Consortium',
                supplier: 'BioTech Farms',
                price: '$35/liter',
                quantity: '5-liter cans',
                deliveryTime: '1-2 days',
                rating: 4.6,
                status: 'stock_low'
            }
        ],
        pesticide: [
            {
                id: 9,
                name: 'Neem Oil Spray',
                supplier: 'Natural Defense',
                price: '$28/liter',
                quantity: '1-5 liter bottles',
                deliveryTime: '2-3 days',
                rating: 4.8,
                status: 'available'
            },
            {
                id: 10,
                name: 'Fungicide Solution',
                supplier: 'Crop Guardian',
                price: '$38/liter',
                quantity: '500ml - 5L',
                deliveryTime: '2-3 days',
                rating: 4.7,
                status: 'available'
            },
            {
                id: 11,
                name: 'Insecticide Premium',
                supplier: 'Pest Control Plus',
                price: '$45/liter',
                quantity: '1-5 liter containers',
                deliveryTime: '1-2 days',
                rating: 4.9,
                status: 'available'
            },
            {
                id: 12,
                name: 'Herbicide Weed Killer',
                supplier: 'Green Guard',
                price: '$32/liter',
                quantity: '500ml bottles',
                deliveryTime: '2-3 days',
                rating: 4.6,
                status: 'available'
            }
        ],
        equipment: [
            {
                id: 13,
                name: 'Hand Spray Pump 16L',
                supplier: 'Farm Tools Pro',
                price: '$85/unit',
                quantity: 'Single unit',
                deliveryTime: '3-5 days',
                rating: 4.7,
                status: 'available'
            },
            {
                id: 14,
                name: 'Drip Irrigation Kit',
                supplier: 'Irrigation Solutions',
                price: '$280/set',
                quantity: 'Complete 500m² coverage',
                deliveryTime: '4-6 days',
                rating: 4.8,
                status: 'available'
            },
            {
                id: 15,
                name: 'Soil Testing Kit',
                supplier: 'Lab Equipment Inc',
                price: '$120/kit',
                quantity: 'Full testing equipment',
                deliveryTime: '2-3 days',
                rating: 4.6,
                status: 'available'
            },
            {
                id: 16,
                name: 'Mini Tiller Cultivator',
                supplier: 'Farm Machinery',
                price: '$450/unit',
                quantity: 'Motorized unit',
                deliveryTime: '5-7 days',
                rating: 4.8,
                status: 'stock_low'
            }
        ]
    };

    const activeOrders = [
        {
            id: 'ORD-2025-001',
            product: 'Hybrid Rice Seeds',
            quantity: '50 kg',
            orderDate: '2025-05-15',
            deliveryDate: '2025-05-17',
            status: 'in_transit',
            trackingNumber: 'TRK123456789'
        },
        {
            id: 'ORD-2025-002',
            product: 'NPK Fertilizer',
            quantity: '100 kg',
            orderDate: '2025-05-14',
            deliveryDate: '2025-05-16',
            status: 'delivered',
            trackingNumber: 'TRK987654321'
        },
        {
            id: 'ORD-2025-003',
            product: 'Neem Oil Spray',
            quantity: '10 L',
            orderDate: '2025-05-13',
            deliveryDate: '2025-05-15',
            status: 'pending',
            trackingNumber: 'TRK555666777'
        }
    ];

    const marketPrices = [
        {
            crop: 'Rice',
            region: 'Local Market',
            currentPrice: '$38/kg',
            change: '+3.2%',
            trend: 'Stable demand, better pricing this week'
        },
        {
            crop: 'Wheat',
            region: 'Regional Market',
            currentPrice: '$31/kg',
            change: '+1.8%',
            trend: 'Harvest season easing prices slightly'
        },
        {
            crop: 'Maize',
            region: 'National Average',
            currentPrice: '$28/kg',
            change: '-0.5%',
            trend: 'Lower demand from animal feed buyers'
        },
        {
            crop: 'Tomato',
            region: 'City Market',
            currentPrice: '$2.10/kg',
            change: '+5.4%',
            trend: 'Short supply due to weather conditions'
        }
    ];

    const farmingTips = [
        'Rotate crops every season to preserve soil nutrients.',
        'Use mulch to retain moisture and reduce weeds.',
        'Monitor weather forecasts before applying fertilizers.',
        'Collect market rates weekly to decide the best sale time.'
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            available: { bg: 'bg-green-100', text: 'text-green-800', label: 'Available' },
            stock_low: { bg: 'bg-orange-100', text: 'text-orange-800', label: 'Low Stock' },
            in_transit: { bg: 'bg-blue-100', text: 'text-blue-800', label: 'In Transit' },
            delivered: { bg: 'bg-green-100', text: 'text-green-800', label: 'Delivered' },
            pending: { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Pending' }
        };
        return statusConfig[status];
    };

    const products = deliveryProducts[selectedCategory];

    return (
        <div className="min-h-screen p-6 md:p-12">
            <div className="max-w-7xl mx-auto">
                {/* Header with Animation */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-16"
                >
                    <div className="flex flex-col gap-6 mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <Truck className="text-green-600" size={40} />
                            <div>
                                <h1 className="text-5xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                                    Delivery Services
                                </h1>
                                <p className="text-gray-700 text-lg mt-2">
                                    Fast and reliable delivery of farming supplies to your doorstep.
                                </p>
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
                                <h2 className="text-xl font-semibold text-gray-900 mb-3">Delivery Overview</h2>
                                <p className="text-gray-600 leading-relaxed">
                                    Browse product categories, track active deliveries, and order the farm supplies you need.
                                </p>
                            </div>

                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-3xl p-6 text-white shadow-xl border border-green-200">
                                <div className="flex flex-col justify-between h-full gap-4">
                                    <div>
                                        <p className="text-sm uppercase tracking-wide opacity-85">Market prices live elsewhere</p>
                                        <h2 className="text-2xl font-bold mt-2">Dedicated Market Price Screen</h2>
                                        <p className="mt-3 text-sm text-green-100">
                                            Open the new market price screen for crop rates, trend insights, and farming tips.
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => navigate('/marketprice')}
                                        className="inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-green-800 hover:bg-green-50 transition"
                                    >
                                        View Market Prices
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Category Tabs with Animation */}
                <motion.div
                    id="supplies"
                    layout
                    className="scroll-mt-6 grid grid-cols-1 md:grid-cols-4 gap-3 mb-14"
                >
                    {categories.map((category, index) => (
                        <motion.button
                            key={category.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4 }}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`relative overflow-hidden rounded-lg p-3 transition-all duration-300 bg-white text-gray-800 shadow-sm hover:shadow-md border-2 ${selectedCategory === category.id
                                ? 'border-green-600 bg-green-50'
                                : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <div className="relative z-10">
                                <motion.div
                                    animate={{ scale: selectedCategory === category.id ? 1.1 : 1 }}
                                    className="text-3xl mb-1"
                                >
                                    {category.icon}
                                </motion.div>
                                <h3 className="text-xs font-bold mb-0.5">{category.name}</h3>
                                <p className="text-xs text-gray-600 leading-tight">
                                    {category.description}
                                </p>
                            </div>

                            {selectedCategory === category.id && (
                                <motion.div
                                    layoutId="tabUnderline"
                                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-500 to-emerald-500"
                                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Products Section */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-14"
                >
                    <div className="mb-6">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="inline-block"
                        >
                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg px-4 py-2 inline-flex items-center gap-2 shadow-md">
                                <TrendingUp className="text-white" size={20} />
                                <h2 className="text-lg font-bold text-white">
                                    Available {categories.find(c => c.id === selectedCategory)?.name}
                                </h2>
                            </div>
                        </motion.div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedCategory}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {products.map((product, idx) => {
                                const statusConfig = getStatusBadge(product.status);
                                return (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05, duration: 0.4 }}
                                        onMouseEnter={() => setHoveredProduct(product.id)}
                                        onMouseLeave={() => setHoveredProduct(null)}
                                        whileHover={{ y: -10 }}
                                        className="group relative"
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                                        <div className="relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-100">
                                            {/* Header Background */}
                                            <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-20 relative overflow-hidden">
                                                <motion.div
                                                    animate={{ rotate: 360 }}
                                                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                                    className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full"
                                                />
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <Star className="text-white opacity-50" size={32} />
                                                </div>
                                            </div>

                                            <div className="p-6">
                                                {/* Status Badge */}
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
                                                        <p className="text-sm text-gray-600">{product.supplier}</p>
                                                    </div>
                                                    <motion.span
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusConfig.bg} ${statusConfig.text}`}
                                                    >
                                                        {statusConfig.label}
                                                    </motion.span>
                                                </div>

                                                {/* Price */}
                                                <motion.div
                                                    animate={{
                                                        scale: hoveredProduct === product.id ? 1.05 : 1
                                                    }}
                                                    className="mb-6"
                                                >
                                                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                                        {product.price}
                                                    </p>
                                                    <p className="text-sm text-gray-600 mt-1">{product.quantity}</p>
                                                </motion.div>

                                                {/* Details */}
                                                <div className="space-y-3 mb-6">
                                                    <motion.div
                                                        className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <Clock size={18} className="text-blue-500 flex-shrink-0" />
                                                        <span>Delivery: <span className="font-semibold">{product.deliveryTime}</span></span>
                                                    </motion.div>
                                                    <motion.div
                                                        className="flex items-center gap-3 text-sm text-gray-700 bg-gray-50 p-3 rounded-lg"
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        <Star size={18} className="text-yellow-500 flex-shrink-0" />
                                                        <span>Rating: <span className="font-semibold">{product.rating}/5</span></span>
                                                    </motion.div>
                                                </div>

                                                {/* Button */}
                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-lg font-bold transition-all duration-300 hover:shadow-lg relative overflow-hidden group/btn"
                                                >
                                                    <motion.span
                                                        className="absolute inset-0 bg-white/20 opacity-0 group-hover/btn:opacity-100"
                                                        layoutId="highlight"
                                                    />
                                                    <span className="relative flex items-center justify-center gap-2">
                                                        <Zap size={18} />
                                                        Order Now
                                                    </span>
                                                </motion.button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </motion.div>

                {/* Active Orders Section */}
                <motion.div
                    id="orders"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="scroll-mt-6 mb-16"
                >
                    <h2 className="text-3xl font-bold text-green-900 mb-8 inline-flex items-center gap-3">
                        <Truck className="text-green-600" size={32} />
                        Your Active Orders
                    </h2>
                    <div className="space-y-6">
                        {activeOrders.map((order, idx) => {
                            const orderStatusConfig = getStatusBadge(order.status);
                            const statusIcons = {
                                pending: <AlertCircle className="text-yellow-500" size={28} />,
                                in_transit: <Truck className="text-blue-500" size={28} />,
                                delivered: <CheckCircle className="text-green-500" size={28} />
                            };

                            return (
                                <motion.div
                                    key={order.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ x: 5 }}
                                    className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300"
                                >
                                    <div className="flex items-start justify-between gap-6">
                                        <div className="flex items-start gap-6 flex-1">
                                            <motion.div
                                                animate={{
                                                    scale: order.status === 'in_transit' ? [1, 1.1, 1] : 1
                                                }}
                                                transition={{ repeat: Infinity, duration: 2 }}
                                            >
                                                {statusIcons[order.status]}
                                            </motion.div>
                                            <div className="flex-1">
                                                <h3 className="text-xl font-bold text-gray-900 mb-3">{order.product}</h3>
                                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-gray-600">Order ID</p>
                                                        <p className="font-semibold text-gray-900">{order.id}</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-gray-600">Quantity</p>
                                                        <p className="font-semibold text-gray-900">{order.quantity}</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-gray-600">Order Date</p>
                                                        <p className="font-semibold text-gray-900">{order.orderDate}</p>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 rounded-lg">
                                                        <p className="text-gray-600">Est. Delivery</p>
                                                        <p className="font-semibold text-gray-900">{order.deliveryDate}</p>
                                                    </div>
                                                </div>
                                                <p className="text-sm text-gray-600 mt-4">📍 Tracking: {order.trackingNumber}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-4">
                                            <motion.span
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${orderStatusConfig.bg} ${orderStatusConfig.text}`}
                                            >
                                                {orderStatusConfig.label}
                                            </motion.span>
                                            <div className="flex gap-3">
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 border border-green-200 transition-all"
                                                >
                                                    <Phone size={20} className="text-green-600" />
                                                </motion.button>
                                                <motion.button
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg hover:from-green-100 hover:to-emerald-100 border border-green-200 transition-all"
                                                >
                                                    <MessageSquare size={20} className="text-green-600" />
                                                </motion.button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Delivery Info Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                >
                    {[
                        {
                            icon: Truck,
                            color: 'from-green-500 to-emerald-500',
                            title: 'Fast Delivery',
                            desc: 'Same day or next day delivery available for most items',
                            bgColor: 'bg-green-50'
                        },
                        {
                            icon: MapPin,
                            color: 'from-blue-500 to-cyan-500',
                            title: 'Real-time Tracking',
                            desc: 'Track your orders in real-time with GPS tracking',
                            bgColor: 'bg-blue-50'
                        },
                        {
                            icon: Package,
                            color: 'from-purple-500 to-pink-500',
                            title: 'Safe Packaging',
                            desc: 'All products safely packaged to ensure quality delivery',
                            bgColor: 'bg-purple-50'
                        }
                    ].map((item, idx) => {
                        const IconComponent = item.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + idx * 0.1 }}
                                whileHover={{ y: -8 }}
                                className={`${item.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-200 transition-all`}
                            >
                                <motion.div
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                    className={`w-16 h-16 rounded-xl bg-gradient-to-r ${item.color} flex items-center justify-center mb-6 shadow-lg`}
                                >
                                    <IconComponent className="text-white" size={32} />
                                </motion.div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{item.title}</h3>
                                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default Delivery;
