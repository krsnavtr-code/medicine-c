"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { productAPI } from "@/services/api";
import { toast } from "react-toastify";
import ProductForm from "@/components/admin/ProductForm";

export default function AddProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories if needed
    const fetchCategories = async () => {
      try {
        const response = await productAPI.getCategories();
        setCategories(response.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (productData) => {
    try {
      setLoading(true);
      const response = await productAPI.createProduct(productData);
      toast.success("Product created successfully!");
      router.push(`/admin/products/${response.data._id}/edit`);
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error(error.response?.data?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto ">
      <ProductForm
        onSubmit={handleSubmit}
        loading={loading}
        categories={categories}
      />
    </div>
  );
}
