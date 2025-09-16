import React from "react";

const Loader = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
            <div className="flex flex-col items-center">
                {/* Circle Spinner */}
                <div className="w-16 h-16 border-4 border-red-500 border-dashed rounded-full animate-spin"></div>

                {/* Text */}
                <p className="mt-4 text-lg font-semibold text-gray-700">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loader;
