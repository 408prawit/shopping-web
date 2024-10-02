import React, { useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, ShoppingBag, Sun, Moon } from 'lucide-react';

const products = [
  { id: 1, name: 'เสื้อกันหนาว', price: 250, image: 'https://i.pinimg.com/564x/37/aa/20/37aa205f7ac23d57ee1f82f14a21164c.jpg' },
  { id: 2, name: 'กางเกงยีนส์', price: 990, image: 'https://i.pinimg.com/564x/39/45/dc/3945dc9e33d280d8ed2792a9cc3173bf.jpg' },
  { id: 3, name: 'รองเท้าหนัง', price: 1590, image: 'https://i.pinimg.com/564x/1b/82/1b/1b821ba899939b54c0b2e30956ddf7f4.jpg' },
  { id: 4, name: 'หมวกแก๊ป', price: 350, image: 'https://i.pinimg.com/736x/ca/d3/c0/cad3c06d71127a58f256a8eb765f2e47.jpg' },
  { id: 5, name: 'กระเป๋าสะพาย', price: 790, image: 'https://i.pinimg.com/564x/2a/56/d5/2a56d539853652b73ad4424332fd47c4.jpg' },
  { id: 6, name: 'นาฬิกาข้อมือ', price: 2990, image: 'https://i.pinimg.com/564x/8f/48/98/8f4898a2dbda7bf694eebbd42ea485ac.jpg' },
  { id: 7, name: 'แว่นตากันแดด', price: 590, image: 'https://i.pinimg.com/736x/3c/1f/32/3c1f3212ca25d4f369dd07045a116358.jpg' },
  { id: 8, name: 'เข็มขัดหนัง', price: 450, image: 'https://i.pinimg.com/564x/ba/5c/5f/ba5c5f2277fb523b6dd4fbeed1c3723f.jpg' },
  { id: 9, name: 'ต่างหู', price: 290, image: 'https://i.pinimg.com/564x/dd/28/c4/dd28c4fef66abf818ec8ffcc0a316237.jpg' },
  { id: 10, name: 'สร้อยคอ', price: 890, image: 'https://i.pinimg.com/564x/a5/81/36/a581360db06f2759cd40c08cbd405256.jpg' },
];

const App = () => {
  const [cart, setCart] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (showNotification) {
      const timer = setTimeout(() => setShowNotification(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showNotification]);

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
    setShowNotification(true);
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const applyCoupon = () => {
    if (coupon === 'SAVE10') {
      setDiscount(0.1);
    } else {
      setDiscount(0);
      alert('คูปองไม่ถูกต้อง');
    }
  };

  const calculateTotal = () => {
    const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const discountAmount = subtotal * discount;
    const shipping = cart.length > 0 ? 100 : 0;
    return (subtotal - discountAmount + shipping).toFixed(2);
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-pink-100 to-blue-200'}`}>
      <nav className={`${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-purple-500 to-pink-500'} text-white p-4 sticky top-0 z-10`}>
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold font-extrabold">🛍️ Trendy Shop</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-full hover:bg-opacity-20 hover:bg-white transition duration-300"
            >
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center bg-white text-purple-600 px-4 py-2 rounded-full hover:bg-opacity-90 transition duration-300"
            >
              <ShoppingCart size={24} className="mr-2" />
              <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)}</span>
            </button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-8">
        <h2 className="text-4xl font-extrabold mb-8 text-center animate-bounce">สินค้าสุดฮิต! 🔥</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {products.map(product => (
            <div key={product.id} className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden transition transform hover:scale-105 hover:shadow-2xl`}>
              <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>฿{product.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
                >
                  เพิ่มลงตะกร้า
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50">
          <div className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-full max-w-md h-full overflow-y-auto p-6 animate-slide-in`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">ตะกร้าสินค้า</h2>
              <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <ShoppingBag size={64} className={`${isDarkMode ? 'text-gray-600' : 'text-gray-400'} mb-4 animate-bounce`} />
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} text-lg`}>ตะกร้าของคุณว่างเปล่า</p>
              </div>
            ) : (
              <>
                {cart.map(item => (
                  <div key={item.id} className={`flex items-center justify-between border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} py-4`}>
                    <div className="flex items-center">
                      <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded mr-4" />
                      <div>
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>฿{item.price.toLocaleString()} x {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <Minus size={20} />
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        <Plus size={20} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="ml-4 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
                
                <div className="mt-6">
                  <div className="flex items-center mb-4">
                    <input
                      type="text"
                      value={coupon}
                      onChange={(e) => setCoupon(e.target.value)}
                      placeholder="รหัสคูปอง"
                      className={`border p-2 rounded-l flex-grow ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'}`}
                    />
                    <button
                      onClick={applyCoupon}
                      className="bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 rounded-r hover:from-green-500 hover:to-blue-600 transition duration-300"
                    >
                      ใช้คูปอง
                    </button>
                  </div>
                  {discount > 0 && <p className="text-green-500 mb-4 animate-pulse">ใช้คูปองส่วนลด 10% แล้ว</p>}
                  
                  <div className={`border-t ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} pt-4`}>
                    <p className="flex justify-between mb-2">
                      <span>ค่าจัดส่ง:</span>
                      <span>฿100</span>
                    </p>
                    <p className="flex justify-between text-xl font-semibold">
                      <span>ยอดรวมทั้งหมด:</span>
                      <span>฿{calculateTotal()}</span>
                    </p>
                  </div>
                  
                  <button className="mt-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full hover:from-purple-600 hover:to-pink-600 transition duration-300 w-full transform hover:scale-105">
                    ดำเนินการชำระเงิน
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full animate-fade-in-out">
          เพิ่มสินค้าลงตะกร้าแล้ว!
        </div>
      )}
    </div>
  );
};

export default App;