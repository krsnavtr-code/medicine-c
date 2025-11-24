import { Suspense } from "react";
import ProductList from "@/components/products/ProductList";
import { productAPI } from "@/services/api";

// SERVER SIDE FETCHING
async function getProducts() {
  try {
    const { data } = await productAPI.getProducts({
      limit: 12,
      page: 1,
      sort: "-createdAt",
      status: "active",
    });
    return data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ProductsPage() {
  const initialProducts = await getProducts();

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
            Discover our wide range of high-quality products
          </p>
        </div>

        <Suspense
          fallback={
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          }
        >
          <ProductList initialProducts={initialProducts} />
        </Suspense>
      </div>
    </div>
  );
}

export const dynamic = "force-static";
