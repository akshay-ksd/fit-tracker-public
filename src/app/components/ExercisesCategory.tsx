import React, { FC } from "react";
import Ripples from "react-ripples";
import useExerciseStore from "../store/useExerciseStore";

const ExercisesCategory: FC<{ onClose: () => void }> = ({ onClose }) => {
    // Modified structure to hold exercise names as arrays under each category
    const exercises = [
        { category: "Chest", names: ["Push-ups", "Bench Press", "Chest Flys"] },
        { category: "Legs", names: ["Squats", "Lunges", "Leg Press"] },
        { category: "Back", names: ["Pull-ups", "Deadlift", "Rows"] },
        { category: "Core", names: ["Planks", "Sit-ups", "Leg Raises"] },
        { category: "Arms", names: ["Bicep Curls", "Tricep Dips", "Hammer Curls"] },
    ];

    const { selectedCategory, setSelectedCategory, selectedExercise, setSelectedExercise } = useExerciseStore();

    // Filter the exercises based on the selected category
    const filteredExercises = exercises.find(
        (exercise) => exercise.category === selectedCategory
    )?.names || [];

    return (
        <div>
            <h2 className="text-lg font-bold text-center mb-4 text-black">
                Exercises
            </h2>

            {/* Show exercise categories to select */}
            {!selectedCategory && (
                <div className="grid grid-cols-2 gap-4 p-2">
                    {exercises.map((exercise, index) => (
                        <Ripples
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                            key={index}
                            className={`h-24 flex flex-col items-center justify-center text-center text-white font-bold rounded-lg shadow-md cursor-pointer transition-all ${selectedCategory === exercise.category
                                ? "bg-green-500 scale-105 shadow-lg" // Highlight selected
                                : "bg-blue-500"
                                }`}
                        >
                            <div onClick={() => setSelectedCategory(exercise.category)}>
                                <span className="text-lg">{exercise.category}</span>
                            </div>
                        </Ripples>
                    ))}
                </div>
            )}

            {/* Show selected category and hide exercises */}

            {/* Show exercises for selected category */}
            {selectedCategory && filteredExercises.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold text-center text-black">
                        Exercises for {selectedCategory}
                    </h3>
                    <div className="grid grid-cols-2 gap-4 p-2">
                        {filteredExercises.map((exercise, index) => (
                            <Ripples
                                placeholder=""
                                onPointerEnterCapture={() => { }}
                                onPointerLeaveCapture={() => { }}
                                key={index}
                                className={`h-24 flex flex-col items-center justify-center text-center text-white font-bold rounded-lg shadow-md cursor-pointer transition-all ${selectedExercise === exercise
                                    ? "bg-green-500 scale-105 shadow-lg" // Highlight selected
                                    : "bg-blue-500"
                                    }`}
                                onClick={() => {
                                    setSelectedExercise(exercise)
                                    onClose()
                                }}
                            >
                                <div
                                >
                                    <span className="text-lg">{exercise}</span>
                                </div>
                            </Ripples>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExercisesCategory;
