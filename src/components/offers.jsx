import React from "react";
import {
  FaPills,
  FaStethoscope,
  FaHeartbeat,
  FaAmbulance,
} from "react-icons/fa";

const offers = [
  {
    id: 1,
    title: "Free Health Checkup",
    description:
      "Get a complete health checkup package at 50% off. Includes blood tests, ECG, and doctor consultation.",
    icon: <FaStethoscope className="text-4xl" />,
    validUntil: "2024-12-31",
  },
  {
    id: 2,
    title: "Cardiac Care Package",
    description:
      "Comprehensive cardiac screening with 30% discount. Includes ECG, Echo, and Cardiologist consultation.",
    icon: <FaHeartbeat className="text-4xl" />,
    validUntil: "2024-11-30",
  },
  {
    id: 3,
    title: "Medication Discount",
    description:
      "20% off on all chronic medications. Valid on minimum purchase of ₹1000.",
    icon: <FaPills className="text-4xl" />,
    validUntil: "2024-12-15",
  },
  {
    id: 4,
    title: "Ambulance Service",
    description:
      "Free ambulance service within city limits on all emergency hospitalizations.",
    icon: <FaAmbulance className="text-4xl" />,
    validUntil: "2025-01-31",
  },
];

const OfferCard = ({ offer }) => {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Check if expired
  const getValidDate = (dateString) => {
    const today = new Date();
    const originalDate = new Date(dateString);

    // Agar date past ho chuki ho → +5 days add kar do
    if (originalDate < today) {
      const newDate = new Date();
      newDate.setDate(today.getDate() + 5);
      return newDate;
    }

    // Otherwise original date hi return
    return originalDate;
  };

  const validDate = getValidDate(offer.validUntil);

  return (
    <div className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-[var(--border-color)] bg-[var(--container-color-in)] flex gap-5 items-start">
      <div className="p-4 rounded-xl bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 flex items-center justify-center shadow-md">
        {offer.icon}
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">{offer.title}</h3>
        <p className=" text-sm leading-relaxed">{offer.description}</p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm mt-2">
          <span className=" ">Valid until: {formatDate(validDate)}</span>
        </div>
      </div>
    </div>
  );
};

const Offers = () => {
  return (
    <div className="py-12 px-4 md:px-10 lg:px-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-extrabold  sm:text-4xl">
          Exclusive deals for you.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </div>
  );
};

export default Offers;
