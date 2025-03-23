import { useState, useEffect, useRef } from "react";
import useExerciseStore from "../store/useExerciseStore";

const CountdownTimer: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const { startExercise, pause } = useExerciseStore();
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (startExercise && !pause) {
            timerRef.current = setInterval(() => {
                setCount((prevCount) => prevCount + 1);
            }, 1000);
        } else if (pause && timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [startExercise, pause]);

    useEffect(() => {
        if (!startExercise) {
            setCount(0); // Reset counter when exercise stops
        }
    }, [startExercise]);

    return (
        <div className="w-28 h-32 bg-gray-700 rounded-lg flex flex-col items-center justify-center">
            <div className='text-2xl'>⏰</div>
            <div className='text-4xl font-bold'>{count}</div>
            <div className='text-xs text-gray-400'>Timer</div>
        </div>
    );
};

export default CountdownTimer;
