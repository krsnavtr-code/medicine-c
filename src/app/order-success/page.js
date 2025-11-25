// client/src/app/order-success/page.js
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessPage() {
    const router = useRouter();

    return (
        <div className="container mx-auto px-4 py-16 text-center">
            <div className="max-w-2xl mx-auto">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="h-12 w-12 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-600 mb-8">
                    Thank you for your order. We&#39;ve sent a confirmation email with your order details.
                </p>

                <div className="bg-white rounded-lg shadow-md p-6 mb-8 text-left max-w-md mx-auto">
                    <h2 className="text-lg font-medium text-gray-900 mb-4">What&#39;s next?</h2>
                    <ul className="space-y-3">
                        <li className="flex items-start">
                            <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>You&apos;ll receive an order confirmation email shortly.</span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>We&apos;ll send you a shipping confirmation when your items are on their way.</span>
                        </li>
                        <li className="flex items-start">
                            <svg
                                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                            <span>You can track your order in your account.</span>
                        </li>
                    </ul>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <Link
                        href="/products"
                        className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                    >
                        Continue Shopping
                    </Link>
                    <Link
                        href="/account/orders"
                        className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                        View Orders
                    </Link>
                </div>
            </div>
        </div>
    );
}