"use client";

import { useState } from "react";
import {
  Video,
  MessageSquare,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductExpertPage() {
  const [activeFaq, setActiveFaq] = useState(null);

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const experts = [
    {
      id: 1,
      name: "Amit Verma",
      title: "Electronics Specialist",
      experience: "7+ years",
      expertise: "Smartphones & Gadgets",
      image: "/images/experts/e1.jpg",
    },
    {
      id: 2,
      name: "Priya Sharma",
      title: "Home Appliances Expert",
      experience: "5+ years",
      expertise: "Kitchen & Home Appliances",
      image: "/images/experts/e2.jpg",
    },
    {
      id: 3,
      name: "Rohan Singh",
      title: "Fashion & Lifestyle Advisor",
      experience: "6+ years",
      expertise: "Clothing, Shoes & Accessories",
      image: "/images/experts/e3.jpg",
    },
  ];

  const faqs = [
    {
      question: "How can I talk to a product expert?",
      answer:
        'Choose an expert based on the category, click on "Ask Expert", and start a chat or schedule a call instantly.',
    },
    {
      question: "Is this service free?",
      answer:
        "Yes! Product consultation is completely free and helps you make the right buying decision.",
    },
    {
      question: "What kind of product questions can I ask?",
      answer:
        "You can ask about product comparison, features, durability, warranty, authenticity, or which model is best for your need.",
    },
    {
      question: "Will experts help me pick the right product?",
      answer:
        "Absolutely! Our experts analyze your need and recommend the best product under your budget.",
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: "Rahul Mehta",
      role: "Customer",
      content:
        "I was confused between two smartphones. Amit helped me choose the perfect one within my budget.",
    },
    {
      id: 2,
      name: "Sneha Patel",
      role: "Buyer",
      content:
        "I needed a washing machine for my home. Priya explained everything very clearly. Best service!",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className=" py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Talk to Product Experts
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Get the right buying advice from category specialists before you
            purchase anything.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#experts"
              className="text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] font-semibold py-3 px-8 rounded-lg transition duration-300"
            >
              Explore Experts
            </Link>
            <button className="flex items-center justify-center gap-2 bg-transparent border-2 border-[var(--border-color)] hover: hover:bg-opacity-10 font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
              <Video size={20} /> How it works
            </button>
          </div>
        </div>
      </div>

      {/* Why Section */}
      <div className="py-16 bg-[var(--container-color-in)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Take Expert Help?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-[var(--container-color)] hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Clear Recommendations
              </h3>
              <p className="text-[var(--text-color-light)]">
                Understand which product suits your needs the most.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-[var(--container-color)] hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Save Time & Money</h3>
              <p className="text-[var(--text-color-light)]">
                Avoid wrong purchases and get honest product guidance.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-[var(--container-color)] hover:shadow-md transition-shadow">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Experts You Can Trust
              </h3>
              <p className="text-[var(--text-color-light)]">
                Every expert is trained and experienced in product
                understanding.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Experts Section */}
      <div id="experts" className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Product Experts
          </h2>
          <p className="text-center text-[var(--text-color-light)] mb-12 max-w-2xl mx-auto">
            Ask anything about all products compatibility & more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className=" rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow bg-[var(--container-color-in)]"
              >
                <div className="h-64 bg-gray-200 relative">
                  <Image
                    src={expert.image}
                    alt={expert.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold">{expert.name}</h3>
                  <p className="text-blue-600 font-medium">{expert.title}</p>
                  <div className="mt-4 space-y-2">
                    <p className="text-[var(--text-color-light)]">
                      <span className="font-medium">Experience:</span>{" "}
                      {expert.experience}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-[var(--container-color-in)]">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[var(--border-color)]"></div>

              {[
                {
                  number: "1",
                  title: "Select an Expert",
                  description:
                    "Choose the expert who specializes in the category you need help with.",
                },
                {
                  number: "2",
                  title: "Start Chat or Call",
                  description:
                    "Get instant help through chat or schedule a call.",
                },
                {
                  number: "3",
                  title: "Ask Anything",
                  description:
                    "Product comparison, features, warranty, durability — ask freely.",
                },
                {
                  number: "4",
                  title: "Get the Best Recommendation",
                  description:
                    "Buy the perfect product based on expert advice.",
                },
              ].map((step, index) => (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center mb-12 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="flex-shrink-0 w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl mb-4 md:mb-0">
                    {step.number}
                  </div>
                  <div
                    className={`md:w-1/2 md:px-8 ${
                      index % 2 === 0
                        ? "md:text-right md:pr-16"
                        : "md:text-left md:pl-16"
                    }`}
                  >
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-[var(--text-color-light)]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className=" p-8 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-200 mr-4"></div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-[var(--container-color)]0 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
                <p className="text-[var(--text-color-light)] italic">
                  "{testimonial.content}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div className="py-16 bg-[var(--container-color-in)]">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-[var(--container-color)] transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {activeFaq === index ? (
                    <ChevronUp size={20} />
                  ) : (
                    <ChevronDown size={20} />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 pt-2 bg-[var(--container-color)]">
                    <p className="">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className=" py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Help Choosing the Right Product?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Talk to our experts now and buy the best product for your needs and
            budget.
          </p>
          <button className="text-[var(--button-color)] bg-[var(--button-bg-color)] hover:bg-[var(--button-hover-color)] font-semibold py-3 px-8 rounded-lg transition duration-300 cursor-pointer">
            Ask an Expert Now
          </button>
        </div>
      </div>
    </div>
  );
}
