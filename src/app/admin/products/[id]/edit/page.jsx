"use client";

import { useRouter, useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { productAPI } from "@/services/api";
import { toast } from "react-toastify";
import ProductForm from "@/components/admin/ProductForm";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productResponse = await productAPI.getProduct(params.id);
        setProduct(productResponse.data);
        
        // Fetch categories
        const categoriesResponse = await productAPI.getCategories();
        setCategories(categoriesResponse.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load product data");
        router.push("/admin/products");
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchData();
    }
  }, [params.id, router]);

  const handleSubmit = async (productData) => {
    try {
      setLoading(true);
      await productAPI.updateProduct(params.id, productData);
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.message || "Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-6">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Product not found
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <ProductForm
        product={product}
        categories={categories}
        onSave={handleSubmit}
        loading={loading}
        isEdit={true}
      />
    </div>
  );
}
