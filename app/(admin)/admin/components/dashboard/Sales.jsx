'use client';
import { GetProducts } from '../../../../../actions/Products';
import { useState, useEffect } from 'react';


export default function SalesForm() {
  const [products, setProducts] = useState([]);
  const [items, setItems] = useState([{ productId: '', quantity: 1 }]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await GetProducts();
        setProducts(res?.products);
      } catch (error) {
        console.log(error);
      }
    }
    getProducts();
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...items];
    updated[index] = { ...updated[index], [field]: value };
    setItems(updated);
  };

  const handleAddItem = () => {
    setItems([...items, { productId: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    if (items.length > 1) {
      const updated = [...items];
      updated.splice(index, 1);
      setItems(updated);
    }
  };

  const getPrice = (productId) =>
    products?.find(p => p.id === productId)?.price || 0;

  const getTotal = () =>
    items.reduce((sum, item) => {
      const price = getPrice(item.productId);
      return sum + price * item.quantity;
    }, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedItems = items
      .filter(item => item.productId)
      .map(item => ({
        productId: item.productId,
        quantity: item.quantity,
        price: getPrice(item.productId),
      }));

    if (!formattedItems.length) return alert("Add at least one valid product");

    const payload = {
      items: formattedItems,
      total: getTotal(),
    };

    setSubmitting(true);
    const res = await fetch('/api/orders', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
    setSubmitting(false);

    if (res.ok) {
      alert('Sale completed!');
      setItems([{ productId: '', quantity: 1 }]);
    } else {
      alert('Sale failed.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl p-6 bg-white shadow-md rounded space-y-6">
      <h2 className="text-xl font-bold">New Sale</h2>

      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6">
            <label className="block text-sm font-medium">Product</label>
            <select
              value={item.productId}
              onChange={(e) => handleChange(idx, 'productId', e.target.value)}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">-- Select --</option>
              {products?.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} - ₦{p.price}
                </option>
              ))}
            </select>
          </div>

          <div className="col-span-3">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              min={1}
              value={item.quantity}
              onChange={(e) => handleChange(idx, 'quantity', Number(e.target.value))}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="col-span-2 text-sm mt-6">
            ₦{(getPrice(item.productId) * item.quantity).toFixed(2)}
          </div>

          <div className="col-span-1 mt-6">
            <button
              type="button"
              onClick={() => handleRemoveItem(idx)}
              className="text-red-500 hover:text-red-700"
            >
              ✕
            </button>
          </div>
        </div>
      ))}

      <div>
        <button
          type="button"
          onClick={handleAddItem}
          className="text-blue-600 hover:underline"
        >
          + Add another item
        </button>
      </div>

      <div className="text-right font-semibold text-lg">
        Total: ₦{getTotal().toFixed(2)}
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        {submitting ? "Submitting..." : "Submit Sale"}
      </button>
    </form>
  );
}
