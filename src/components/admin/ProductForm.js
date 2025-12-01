'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { productAPI } from '@/services/api';
import { PRODUCT_BRANDS, PRODUCT_CATEGORIES, PRODUCT_SUB_CATEGORIES, PRODUCT_DOSAGE_FORMS, PRODUCT_UNITS, PRODUCT_TYPES, USE_FOR_GENDER } from '@/config/productConfig';

const ProductForm = ({ product: initialProduct }) => {
  const router = useRouter();
  const isEditMode = !!initialProduct?._id;
  
  // Form state
  const [formData, setFormData] = useState({
    productType: 'single',
    images: [],
    name: '',
    brand: '',
    description: '',
    shortDescription: '',
    category: '',
    subCategory: '',
    price: '',
    mrp: '',
    discount: 0,
    stock: 0,
    unit: 'Strip',
    isPrescriptionRequired: false,
    requiresUpload: false,
    saltComposition: '',
    manufacturer: '',
    packSize: '',
    dosageForm: '',
    expiryDate: '',
    storageInfo: '',
    safetyInformation: '',
    howToUse: '',
    useFor: '',
    benefits: [],
    sideEffects: [],
    isFeatured: false,
    isActive: true,
    metaTitle: '',
    metaDescription: '',
    metaKeywords: []
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [currentBenefit, setCurrentBenefit] = useState('');
  const [currentSideEffect, setCurrentSideEffect] = useState('');
  const [currentKeyword, setCurrentKeyword] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  // Set form data if in edit mode
  useEffect(() => {
    if (isEditMode && initialProduct) {
      const { 
        _id, 
        __v, 
        createdAt, 
        updatedAt, 
        slug, 
        rating, 
        numReviews, 
        reviews, 
        inStock, 
        sellingPrice,
        ...productData 
      } = initialProduct;
      
      // Convert Date object to YYYY-MM-DD format for the date input
      if (productData.expiryDate) {
        const date = new Date(productData.expiryDate);
        productData.expiryDate = date.toISOString().split('T')[0];
      }
      
      // Set image preview if images array exists and has at least one image
      if (productData.images && productData.images.length > 0) {
        setImagePreview(productData.images[0].url);
      }

      // Use functional update to avoid dependency on formData
      setFormData(prevFormData => ({
        ...prevFormData,
        ...productData
      }));
      
    }
  }, [initialProduct, isEditMode]);

  // Handle image URL change and preview
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setFormData({
      ...formData,
      images: url ? [{ url }] : []
    });
    setImagePreview(url);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Auto-calculate discount if both price and MRP are provided
    if ((name === 'price' || name === 'mrp') && formData.price && formData.mrp) {
      const price = parseFloat(name === 'price' ? value : formData.price);
      const mrp = parseFloat(name === 'mrp' ? value : formData.mrp);
      
      if (mrp > 0 && price <= mrp) {
        const discount = ((mrp - price) / mrp) * 100;
        setFormData(prev => ({
          ...prev,
          discount: Math.round(discount * 100) / 100 // Round to 2 decimal places
        }));
      }
    }
  };

  // Handle adding a benefit
  const addBenefit = (e) => {
    e.preventDefault();
    if (currentBenefit.trim() && !formData.benefits.includes(currentBenefit)) {
      setFormData({
        ...formData,
        benefits: [...formData.benefits, currentBenefit.trim()]
      });
      setCurrentBenefit('');
    }
  };

  // Handle removing a benefit
  const removeBenefit = (index) => {
    const newBenefits = [...formData.benefits];
    newBenefits.splice(index, 1);
    setFormData({
      ...formData,
      benefits: newBenefits
    });
  };

  // Handle adding a side effect
  const addSideEffect = (e) => {
    e.preventDefault();
    if (currentSideEffect.trim() && !formData.sideEffects.includes(currentSideEffect)) {
      setFormData({
        ...formData,
        sideEffects: [...formData.sideEffects, currentSideEffect.trim()]
      });
      setCurrentSideEffect('');
    }
  };

  // Handle removing a side effect
  const removeSideEffect = (index) => {
    const newSideEffects = [...formData.sideEffects];
    newSideEffects.splice(index, 1);
    setFormData({
      ...formData,
      sideEffects: newSideEffects
    });
  };

  // Handle adding a keyword
  const addKeyword = (e) => {
    e.preventDefault();
    if (currentKeyword.trim() && !formData.metaKeywords.includes(currentKeyword)) {
      setFormData({
        ...formData,
        metaKeywords: [...formData.metaKeywords, currentKeyword.trim()]
      });
      setCurrentKeyword('');
    }
  };

  // Handle removing a keyword
  const removeKeyword = (index) => {
    const newKeywords = [...formData.metaKeywords];
    newKeywords.splice(index, 1);
    setFormData({
      ...formData,
      metaKeywords: newKeywords
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Prepare the data to send
      const productData = { ...formData };
      
      // Convert price and mrp to numbers
      productData.price = parseFloat(productData.price);
      productData.mrp = parseFloat(productData.mrp);
      productData.stock = parseInt(productData.stock, 10);
      
      // Convert expiryDate to a Date object
      if (productData.expiryDate) {
        productData.expiryDate = new Date(productData.expiryDate);
      }
      
      // Create or update the product
      let result;
      if (isEditMode) {
        result = await productAPI.updateProduct(initialProduct._id, productData);
        setSuccess('Product updated successfully!');
      } else {
        result = await productAPI.createProduct(productData);
        setSuccess('Product created successfully!');
        
        // Redirect to products page
        setTimeout(() => {
          router.push(`/admin/products`);
        }, 1500);
      }
      
      // Reset form if not in edit mode
      if (!isEditMode) {
        setFormData({
          imageUrl: '',
          name: '',
          brand: '',
          description: '',
          shortDescription: '',
          category: '',
          subCategory: '',
          price: '',
          mrp: '',
          discount: 0,
          stock: 0,
          unit: 'Strip',
          isPrescriptionRequired: false,
          requiresUpload: false,
          saltComposition: '',
          manufacturer: '',
          packSize: '',
          dosageForm: '',
          expiryDate: '',
          storageInfo: '',
          safetyInformation: '',
          howToUse: '',
          useFor: '',
          benefits: [],
          sideEffects: [],
          isFeatured: false,
          isActive: true,
          metaTitle: '',
          metaDescription: '',
          metaKeywords: [],
          imageUrl: ''
        });
        setImages([]);
      }
    } catch (err) {
      console.error('Error saving product:', err);
      setError(err.message || 'Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  // Using imported constants from config
  const categories = PRODUCT_CATEGORIES;
  const subCategories = PRODUCT_SUB_CATEGORIES;
  const brand = PRODUCT_BRANDS;
  const units = PRODUCT_UNITS;
  const dosageForms = PRODUCT_DOSAGE_FORMS;
  const productTypes = PRODUCT_TYPES;
  const useFor = USE_FOR_GENDER;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="md:flex md:items-center md:justify-between mb-8">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 sm:text-3xl sm:truncate">
            {isEditMode ? 'Edit Product' : 'Add New Product'}
          </h2>
        </div>
        <div className="mt-4 flex md:mt-0 md:ml-4">
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="inline-flex items-center px-4 py-2 border border-[var(--border-color)] shadow-sm text-sm font-medium rounded-md text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--button-color)] cursor-pointer"
          >
            Back to Products
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
          <p>{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 bg-green-100 border-l-4 border-green-500 text-green-700 p-4" role="alert">
          <p>{success}</p>
        </div>
      )}

      <div className="bg-[var(--container-color-in)] shadow overflow-hidden sm:rounded-lg">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {/* Image Upload */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Product Image</h3>
              <div className="space-y-4">
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mt-2">
                    <p className="block text-sm font-medium text-gray-700 mb-1">Preview:</p>
                    <div className="mt-1 flex items-center">
                      <img
                        src={imagePreview}
                        alt="Product Preview"
                        className="h-40 w-40 object-cover rounded-md border border-gray-300"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://via.placeholder.com/200x200?text=Image+Not+Found';
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Image URL Input */}
                <div>
                  <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
                    Image URL
                  </label>
                  <div className="mt-1 flex rounded-md shadow-sm">
                    <input
                      type="url"
                      name="imageUrl"
                      id="imageUrl"
                      value={formData.images && formData.images[0] ? formData.images[0].url : ''}
                      onChange={handleImageUrlChange}
                      className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-md sm:text-sm border-gray-300"
                      placeholder="https://example.com/image.jpg"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, images: [] });
                        setImagePreview('');
                      }}
                      className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Clear
                    </button>
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Enter the URL of the product image
                  </p>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="col-span-2">
              <h3 className="text-lg leading-6 font-medium ">Basic Information</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Basic product information and identification.</p>
              {/* </label> */}
              <select
                id="productType"
                name="productType"
                required
                value={formData.productType}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {productTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium ">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                id="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium ">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Detailed product description"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium ">
                Product Brand 
              </label>
              <select
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[var(--container-color)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a brand</option>
                {brand.map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="brand" className="block text-sm font-medium ">
                Use For (Gender)
              </label>
              <select
                id="useFor"
                name="useFor"
                value={formData.useFor}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[var(--container-color)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select Gender</option>
                {useFor.map((gender) => (
                  <option key={gender} value={gender}>
                    {gender}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium ">
                Category 
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[var(--container-color)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="subCategory" className="block text-sm font-medium ">
                Subcategory
              </label>
              <select
                id="subCategory"
                name="subCategory"
                value={formData.subCategory}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[var(--container-color)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a subcategory</option>
                {subCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Pricing */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">Pricing & Inventory</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Pricing and stock information.</p>
            </div>

            <div>
              <label htmlFor="mrp" className="block text-sm font-medium ">
                MRP (Maximum Retail Price)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-[var(--text-color-light)] sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="mrp"
                  id="mrp"
                  min="0"
                  step="0.01"
                  value={formData.mrp}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md bg-[var(--container-color)]"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label htmlFor="price" className="block text-sm font-medium ">
                Selling Price
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-[var(--text-color-light)] sm:text-sm">₹</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full py-2 pl-7 pr-12 sm:text-sm border-gray-300 rounded-md bg-[var(--container-color)]"
                  placeholder="0.00"
                />
              </div>
              {formData.mrp && formData.price && (
                <p className="mt-1 text-sm text-[var(--text-color-light)]">
                  Discount: {Math.round(((formData.mrp - formData.price) / formData.mrp) * 100)}%
                </p>
              )}
            </div>

            <div>
              <label htmlFor="stock" className="block text-sm font-medium ">
                Stock (storage)
              </label>
              <input
                type="number"
                name="stock"
                id="stock"
                min="0"
                value={formData.stock}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div className="">
              <label htmlFor="name" className="block text-sm font-medium ">
                Product storage Info
              </label>
              <input
                type="text"
                name="storageInfo"
                id="storageInfo"
                value={formData.storageInfo}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            

            <div>
              <label htmlFor="unit" className="block text-sm font-medium ">
                Unit
              </label>
              <select
                id="unit"
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>

            {/* Images */}
            

            {/* Prescription Info */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">Prescription Information</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Prescription requirements for this product.</p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isPrescriptionRequired"
                  name="isPrescriptionRequired"
                  type="checkbox"
                  checked={formData.isPrescriptionRequired}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isPrescriptionRequired" className="font-medium ">
                  Prescription Required
                </label>
                <p className="text-[var(--text-color-light)]">This product requires a prescription.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="requiresUpload"
                  name="requiresUpload"
                  type="checkbox"
                  checked={formData.requiresUpload}
                  onChange={handleChange}
                  disabled={!formData.isPrescriptionRequired}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded disabled:opacity-50"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="requiresUpload" className="font-medium ">
                  Requires Prescription Upload
                </label>
                <p className="text-[var(--text-color-light)]">Customer must upload a prescription to purchase.</p>
              </div>
            </div>

            {/* Medicine Details */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">Medicine Details</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Specific details for medicines.</p>
            </div>

            <div>
              <label htmlFor="saltComposition" className="block text-sm font-medium ">
                Salt Composition
              </label>
              <input
                type="text"
                name="saltComposition"
                id="saltComposition"
                value={formData.saltComposition}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium ">
                Manufacturer
              </label>
              <input
                type="text"
                name="manufacturer"
                id="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="packSize" className="block text-sm font-medium ">
                Pack Size
              </label>
              <input
                type="text"
                name="packSize"
                id="packSize"
                value={formData.packSize}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            <div>
              <label htmlFor="dosageForm" className="block text-sm font-medium ">
                Dosage Form
              </label>
              <select
                id="dosageForm"
                name="dosageForm"
                value={formData.dosageForm}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 bg-[var(--container-color)] focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="">Select a form</option>
                {dosageForms.map((form) => (
                  <option key={form} value={form}>
                    {form}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="expiryDate" className="block text-sm font-medium ">
                Expiry Date
              </label>
              <input
                type="date"
                name="expiryDate"
                id="expiryDate"
                value={formData.expiryDate}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>

            {/* Benefits & Side Effects */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">Benefits & Side Effects</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Key benefits and potential side effects.</p>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium ">
                Product Safety Information
              </label>
              <textarea
                id="safetyInformation"
                name="safetyInformation"
                rows={3}
                value={formData.safetyInformation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Detailed product description"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="description" className="block text-sm font-medium ">
                howToUse Guide
              </label>
              <textarea
                id="howToUse"
                name="howToUse"
                rows={3}
                value={formData.howToUse}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Detailed product description"
              />
            </div>

            <div>
              <label className="block text-sm font-medium ">Benefits</label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  value={currentBenefit}
                  onChange={(e) => setCurrentBenefit(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addBenefit(e))}
                  className="flex-1 block w-full border border-gray-300 bg-[var(--container-color)] rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add benefit"
                />
                <button
                  type="button"
                  onClick={addBenefit}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-[var(--button-bg-color)] text-[var(--button-color)] text-sm font-medium  hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.benefits.map((benefit, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                  >
                    {benefit}
                    <button
                      type="button"
                      onClick={() => removeBenefit(index)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-indigo-400 hover:bg-indigo-200 hover:text-indigo-500 focus:outline-none focus:bg-indigo-500 focus:text-white"
                    >
                      <span className="sr-only">Remove benefit</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium ">Side Effects</label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  value={currentSideEffect}
                  onChange={(e) => setCurrentSideEffect(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSideEffect(e))}
                  className="flex-1 block w-full border border-gray-300 bg-[var(--container-color)] rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add side effect"
                />
                <button
                  type="button"
                  onClick={addSideEffect}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-[var(--button-bg-color)] text-[var(--button-color)] text-sm font-medium  hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.sideEffects.map((effect, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800"
                  >
                    {effect}
                    <button
                      type="button"
                      onClick={() => removeSideEffect(index)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-red-400 hover:bg-red-200 hover:text-red-500 focus:outline-none focus:bg-red-500 focus:text-white"
                    >
                      <span className="sr-only">Remove side effect</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* Meta Information */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">SEO & Meta Information</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Optimize for search engines.</p>
            </div>

            <div>
              <label htmlFor="metaTitle" className="block text-sm font-medium ">
                Meta Title
              </label>
              <input
                type="text"
                name="metaTitle"
                id="metaTitle"
                value={formData.metaTitle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Meta title for SEO"
              />
            </div>

            <div className="">
              <label className="block text-sm font-medium ">Meta Keywords</label>
              <div className="mt-1 flex">
                <input
                  type="text"
                  value={currentKeyword}
                  onChange={(e) => setCurrentKeyword(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addKeyword(e))}
                  className="flex-1 block w-full border border-gray-300 bg-[var(--container-color)] rounded-l-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Add keyword"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="inline-flex items-center px-4 py-2 border border-l-0 border-gray-300 bg-[var(--button-bg-color)] text-[var(--button-color)] text-sm font-medium  hover:bg-[var(--button-hover-color)] focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 rounded-r-md"
                >
                  Add
                </button>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.metaKeywords.map((keyword, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(index)}
                      className="ml-1.5 inline-flex items-center justify-center h-4 w-4 rounded-full text-gray-400 hover:bg-gray-200 hover:text-[var(--text-color-light)] focus:outline-none focus:bg-gray-500 focus:text-white"
                    >
                      <span className="sr-only">Remove keyword</span>
                      <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                        <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className='col-span-2'>
              <label htmlFor="metaDescription" className="block text-sm font-medium ">
                Meta Description
              </label>
              <textarea
                id="metaDescription"
                name="metaDescription"
                rows={5}
                value={formData.metaDescription}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md bg-[var(--container-color)] shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Meta description for SEO"
              />
            </div>

            {/* Status */}
            <div className="col-span-2 mt-6">
              <h3 className="text-lg leading-6 font-medium ">Status</h3>
              <p className="mt-1 text-sm text-[var(--text-color-light)]">Product visibility and status.</p>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isActive"
                  name="isActive"
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isActive" className="font-medium ">
                  Active
                </label>
                <p className="text-[var(--text-color-light)]">This product will be visible on the store.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="isFeatured"
                  name="isFeatured"
                  type="checkbox"
                  checked={formData.isFeatured}
                  onChange={handleChange}
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="isFeatured" className="font-medium ">
                  Featured
                </label>
                <p className="text-[var(--text-color-light)]">This product will appear in featured sections.</p>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className={`ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-[var(--button-color)] bg-[var(--button-bg-color)] cursor-pointer ${loading ? 'bg-indigo-400' : 'bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)]'} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--button-color)]`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : isEditMode ? (
                  'Update Product'
                ) : (
                  'Create Product'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
