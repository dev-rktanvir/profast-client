import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const CARD_ELEMENT_OPTIONS = {
    style: {
        base: {
            color: '#1a202c', // Tailwind's gray-900
            fontSize: '16px',
            fontFamily: 'Inter, sans-serif',
            '::placeholder': {
                color: '#a0aec0', // Tailwind's gray-400
            },
        },
        invalid: {
            color: '#e53e3e', // Tailwind's red-600
        },
    },
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState("");
    const axiosSecure = useAxiosSecure();
    const { parcelId } = useParams();

    const { data: parcelInfo = {} } = useQuery({
        queryKey: ['parcels', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`)
            return res.data;
        }
    })
    const amount = parcelInfo?.cost?.totalCost;
    const amountInCents = amount * 100;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) return;

        const card = elements.getElement(CardElement);
        if (!card) return;

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            setError(error.message);
        } else {
            setError('');
            console.log('[PaymentMethod]', paymentMethod);
        }

        // create payment intant
        const res = await axiosSecure.post('/create-payment-intent', {
            amountInCents,
            parcelId
        })

        const clientSecret = res.data.clientSecret;
        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card,
                billing_details: {
                    name: 'Tanvir Ahmed',
                },
            },
        });
        if (result.error) {
            setError(result.error.message);
            setSuccess("");
        } else {
            if (result.paymentIntent.status === "succeeded") {
                setSuccess("Payment Successful!");
                setError("");
                // চাইলে এখানে MongoDB তে order info save করবে
            }
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-secondary mb-4">Payment</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="p-3 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500">
                    <CardElement options={CARD_ELEMENT_OPTIONS} />
                </div>

                <button
                    type="submit"
                    disabled={!stripe}
                    className="w-full bg-primary text-secondary py-2 px-4 rounded-md hover:bg-primary/80 font-bold transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Pay $ {amount}
                </button>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                {success && <p className="text-green-500 mt-2">{success}</p>}
            </form>
        </div>
    );
};

export default PaymentForm;
