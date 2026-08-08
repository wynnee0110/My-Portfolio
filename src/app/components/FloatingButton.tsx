import { HiQuestionMarkCircle } from "react-icons/hi";
import { useState } from "react";


export default function FloatingButton() {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModal = () => {
        setModalOpen((prev) => !prev);
    };


    return (
        <div className="fixed bottom-8 right-8 z-50">
            {modalOpen && (
                <div className="absolute bottom-16 right-0 w-64 h-64 bg-white rounded-lg shadow-lg">
                    <div className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Modal
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            This is a modal.
                        </p>
                    </div>
                </div>
            )}

            <button
                onClick={handleModal}
                className="glass-card px-3 py-3 rounded-full"
            >
                <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                    <HiQuestionMarkCircle />
                </span>
            </button>
        </div>


    )

}