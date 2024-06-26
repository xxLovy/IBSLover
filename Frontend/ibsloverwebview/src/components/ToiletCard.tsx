"use client"
import Link from 'next/link';
import React from 'react';
import { Button } from './ui/button';
import FeatureComponent from './FeatureComponent';

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
                <h2 className="text-2xl font-bold mb-4">{toilet.name}</h2>
                <div className="mb-2">
                    <Button>
                        <a
                            href={`https://www.google.com/maps/dir/?api=1&destination=${toilet.location?.coordinates[1]},${toilet.location?.coordinates[0]}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className=""
                        >
                            Directions
                        </a>
                    </Button>
                </div>
                <div className="grid grid-cols-3 gap-4">
                    <div>
                        <h3 className="text-lg font-semibold">Features</h3>
                        <ul className="list-none">
                            <FeatureComponent lable='Women' status={toilet.features?.women} Icon='' key={0} />
                            <FeatureComponent lable='Men' status={toilet.features?.men} Icon='' key={1} />
                            <FeatureComponent lable='Accessible' status={toilet.features?.accessible} Icon='' key={2} />
                            <FeatureComponent lable='Gender Neutral' status={toilet.features?.genderNeutral} Icon='' key={3} />
                            <FeatureComponent lable='Children' status={toilet.features?.children} Icon='' key={4} />
                            <FeatureComponent lable='Free' status={toilet.features?.free} Icon='' key={5} />
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Fee</h3>
                        <p>{toilet.features?.fee ? `${toilet.features.fee}p` : 'Free'}</p>
                        <h3 className="text-lg font-semibold mt-4">Notes</h3>
                        <p>{toilet.description || 'No additional notes'}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Opening Hours</h3>
                        <ul className="list-none">
                            <li className='flex justify-between pr-10' key="monday">
                                <span>Monday </span>
                                <span>{toilet.openingHours?.monday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="tuesday">
                                <span>Tuesday </span>
                                <span>{toilet.openingHours?.tuesday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="wednesday">
                                <span>Wednesday </span>
                                <span>{toilet.openingHours?.wednesday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="thursday">
                                <span>Thursday </span>
                                <span>{toilet.openingHours?.thursday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="friday">
                                <span>Friday </span>
                                <span>{toilet.openingHours?.friday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="saturday">
                                <span>Saturday </span>
                                <span>{toilet.openingHours?.saturday || 'Unknown'}</span>
                            </li>
                            <li className='flex justify-between pr-10' key="sunday">
                                <span>Sunday </span>
                                <span>{toilet.openingHours?.sunday || 'Unknown'}</span>
                            </li>
                        </ul>

                        <p className="text-gray-600 mt-2">Hours may vary with national holidays or seasonal changes. If you know these hours to be out of date, please edit this toilet.</p>
                    </div>
                </div>
                <p className="text-gray-700 mt-4">Last verified: {new Date(toilet.lastUpdateTime).toLocaleString()}</p>
                <p className="text-gray-700">Distance: {toilet.distance && toilet.distance * 1000} meters</p>
                <div className='flex mt-4'>
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
