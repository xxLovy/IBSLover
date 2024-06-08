"use client"
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';

interface ToiletCardProps {
    toilet: Toilet;
    onClose: () => void;
}

const ToiletCard: React.FC<ToiletCardProps> = ({ toilet, onClose }) => {
    return (
        <div className="fixed bottom-0 left-0 w-full bg-white p-5 rounded-t-2xl shadow-lg transition-transform transform translate-y-full animate-slide-up z-50">
            <div className="relative">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-1 px-2 rounded-full z-10"
                >
                    ✕
                </button>
                <h2 className="text-xl font-bold mb-2">{toilet.name}</h2>
                <p className="mb-4 text-gray-700">Last verified: {new Date(toilet.lastUpdateTime).toLocaleString()}</p>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Features</h3>
                    <ul className="list-disc list-inside">
                        <li key={0}>Women: {toilet.features?.women}</li>
                        <li key={1}>Men: {toilet.features?.men}</li>
                        <li key={2}>Accessible: {toilet.features?.accessible}</li>
                        <li key={3}>Children: {toilet.features?.children}</li>
                        <li key={4}>Free: {toilet.features?.free ? 'Yes' : `No, Fee: ${toilet.features?.fee}p`}</li>
                        <li key={5}>Gender Neutral: {toilet.features?.genderNeutral}</li>
                        {/* <li>Baby Changing: {toilet.features?.babyChanging}</li>
                        <li>Urinal Only: {toilet.features?.urinalOnly}</li>
                        <li>Automatic: {toilet.features?.automatic}</li> */}
                    </ul>
                </div>
                <div className="mb-4">
                    <h3 className="text-lg font-semibold">Notes</h3>
                    {/* <p>{toilet.notes || 'No additional notes'}</p> */}
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Opening Hours</h3>
                    {/* <ul className="list-none">
                        <li>Monday: {toilet.openingHours?.monday || 'Unknown'}</li>
                        <li>Tuesday: {toilet.openingHours?.tuesday || 'Unknown'}</li>
                        <li>Wednesday: {toilet.openingHours?.wednesday || 'Unknown'}</li>
                        <li>Thursday: {toilet.openingHours?.thursday || 'Unknown'}</li>
                        <li>Friday: {toilet.openingHours?.friday || 'Unknown'}</li>
                        <li>Saturday: {toilet.openingHours?.saturday || 'Unknown'}</li>
                        <li>Sunday: {toilet.openingHours?.sunday || 'Unknown'}</li>
                    </ul> */}
                    <p className="text-gray-600 mt-2">Hours may vary with national holidays or seasonal changes. If you know these hours to be out of date, please edit this toilet.</p>
                </div>
                <div>Distance: {toilet.distance && toilet.distance * 1000} meters</div>
                <div className='flex'>
                    {toilet.isFromUser &&
                        <Button>
                            <Link href={`/${toilet._id}/editToilet`}>
                                Edit
                            </Link>
                        </Button>
                    }
                </div>
            </div>
            <style jsx>{`
                @keyframes slide-up {
                    0% {
                        transform: translateY(100%);
                    }
                    100% {
                        transform: translateY(0);
                    }
                }
                .animate-slide-up {
                    animation: slide-up 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default ToiletCard;
