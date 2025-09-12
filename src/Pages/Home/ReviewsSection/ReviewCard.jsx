import React from "react";

const ReviewCard = ({ image, review, name, position }) => {
    return (
        <div className="flex items-center border-2 border-dashed border-gray-300 rounded-xl p-6 bg-white shadow-md">
            {/* Left - Reviewer Image */}
            <div className="flex-shrink-0">
                <img
                    src={image}
                    alt={name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                />
            </div>

            {/* Right - Text */}
            <div className="ml-6 text-left">
                <p className="text-gray-700 italic mb-4">“{review}”</p>
                <h4 className="text-lg font-semibold">{name}</h4>
                <p className="text-sm text-gray-500">{position}</p>
            </div>
        </div>
    );
};

export default ReviewCard;
