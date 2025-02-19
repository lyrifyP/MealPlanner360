import React from 'react';

const CreatorMarketplace = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-center mb-6">Creator Marketplace for Recipe Books</h1>
            <p className="text-lg text-center mb-8">Welcome to the Creator Marketplace! Here you can promote your recipe books.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Placeholder Card 1 */}
                <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-2">Advertise Your Recipe Book Here</h2>
                    <p className="text-zinc-400 mb-4">Description of your recipe book goes here.</p>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded">Promote This Book</button>
                </div>

                {/* Placeholder Card 2 */}
                <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-2">Advertise Your Recipe Book Here</h2>
                    <p className="text-zinc-400 mb-4">Description of your recipe book goes here.</p>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded">Promote This Book</button>
                </div>

                {/* Placeholder Card 3 */}
                <div className="bg-zinc-800 rounded-lg p-6 hover:bg-zinc-700 transition-colors">
                    <h2 className="text-xl font-bold text-white mb-2">Advertise Your Recipe Book Here</h2>
                    <p className="text-zinc-400 mb-4">Description of your recipe book goes here.</p>
                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded">Promote This Book</button>
                </div>
            </div>
        </div>
    );
};

export default CreatorMarketplace;
