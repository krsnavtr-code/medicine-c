"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function ProfileInfo() {
  const { user, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    gender: user?.gender || "",
    email: user?.email || "",
    phone: user?.phone || "",
    country: user?.country || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (!user) return null;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center">
        <h2 className="text-lg font-medium">
          Personal Information
        </h2>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-3 py-1 text-sm text-[var(--button-color)] bg-[var(--button-bg-color)] rounded-md hover:bg-[var(--button-hover-color)] cursor-pointer"
          >
            Edit Profile
          </button>
        )}
      </div>

      {isEditing ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="name"
              className="block w-28 text-sm font-medium "
            >
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="gender"
              className="block w-28 text-sm font-medium "
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="email"
              className="block w-28 text-sm font-medium "
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm p-2 border bg-[var(--container-color-in)]"
              disabled
              title="Contact Customer Support to change your email address"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="phone"
              className="block w-28 text-sm font-medium "
            >
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div className="flex items-center gap-2">
            <label
              htmlFor="country"
              className="block w-28 text-sm font-medium "
            >
              Country
            </label>
            <input
              type="text"
              id="country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border"
            />
          </div>

          <div className="flex justify-end space-x-3 pt-2">
            <button
              type="button"
              onClick={() => {
                setIsEditing(false);
                setFormData({
                  name: user.name || "",
                  gender: user.gender || "",
                  email: user.email || "",
                  phone: user.phone || "",
                  country: user.country || "",
                });
              }}
              className="px-4 py-2 text-sm font-medium text-[var(--button-color)]  bg-[var(--button-bg-color)] border border-[var(--border-color)] rounded-md shadow-sm hover:bg-[var(--button-hover-color)] cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 cursor-pointer"
            >
              Save Changes
            </button>
          </div>
        </form>
      ) : (
        <div className="space-y-4">
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium ">Full Name:-</h3>
            <p className="text-sm ">{user.name || ""}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium ">Gender:-</h3>
            <p className="text-sm ">
              {user.gender
                ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                : ""}
            </p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium ">Email:-</h3>
            <p className="text-sm ">{user.email}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium ">
              Phone Number:-
            </h3>
            <p className="text-sm ">{user.phone || ""}</p>
          </div>
          <div className="flex items-baseline gap-2">
            <h3 className="text-sm font-medium ">Country:-</h3>
            <p className="text-sm ">{user.country || ""}</p>
          </div>
        </div>
      )}
    </div>
  );
}
