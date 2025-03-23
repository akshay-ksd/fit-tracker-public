import React, { ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop (Click to Close) */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }} // Faster fade-in/out
          />

          {/* Bottom Sheet (Drag to Close) */}
          <motion.div
            className="fixed bottom-0 left-0 w-full bg-white rounded-t-2xl shadow-lg z-50"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 15, duration: 0.2 }} // Increased speed
            drag="y"
            dragConstraints={{ top: 0, bottom: 200 }} // Allows dragging down
            onDragEnd={(_, info) => {
              if (info.offset.y > 100) onClose(); // Close if dragged down enough
            }}
          >
            <div className="p-4">
              {/* Drag Handle */}
              <div className="w-12 h-1 bg-gray-300 rounded-full mx-auto mb-4 cursor-pointer"></div>
              
              {/* Content */}
              {children}

              {/* Close Button */}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BottomSheet;
