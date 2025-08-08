"use client";

import { useForm } from "react-hook-form";

export default function ItemForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    // send to your API
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6 bg-white p-6 rounded shadow max-w-2xl mx-auto"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Product</h2>

      {/* Product Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          {...register("name", { required: "Product name is required" })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.name && (
          <p className="text-red-500 text-sm">{errors.name.message}</p>
        )}
      </div>

      {/* SKU */}
      <div>
        <label className="block text-sm font-medium text-gray-700">SKU</label>
        <input
          type="text"
          {...register("sku", { required: "SKU is required" })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        />
        {errors.sku && (
          <p className="text-red-500 text-sm">{errors.sku.message}</p>
        )}
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          {...register("category", { required: "Category is required" })}
          className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="food">Food</option>
        </select>
        {errors.category && (
          <p className="text-red-500 text-sm">{errors.category.message}</p>
        )}
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Cost Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("costPrice", { required: "Cost price is required" })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.costPrice && (
            <p className="text-red-500 text-sm">{errors.costPrice.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Sale Price
          </label>
          <input
            type="number"
            step="0.01"
            {...register("salePrice", { required: "Sale price is required" })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.salePrice && (
            <p className="text-red-500 text-sm">{errors.salePrice.message}</p>
          )}
        </div>
      </div>

      {/* Stock */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Stock Quantity
          </label>
          <input
            type="number"
            {...register("stock", { required: "Stock quantity is required" })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.stock && (
            <p className="text-red-500 text-sm">{errors.stock.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Low Stock Alert
          </label>
          <input
            type="number"
            {...register("lowStock", {
              required: "Low stock value is required",
            })}
            className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
          />
          {errors.lowStock && (
            <p className="text-red-500 text-sm">{errors.lowStock.message}</p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <input
          type="file"
          {...register("image")}
          className="mt-1 block w-full"
        />
      </div>

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}
