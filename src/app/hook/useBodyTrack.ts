import { useState, useRef, useEffect } from 'react';
import useExerciseStore from '../store/useExerciseStore';
import { Landmark } from '../types/landmark';
import { exerciseImports } from '../constants/trackFile';

interface TrackingState {
    leftLock: React.RefObject<boolean>;
    rightLock: React.RefObject<boolean>;
    setLeftRepCount: React.Dispatch<React.SetStateAction<number>>;
    setRightRepCount: React.Dispatch<React.SetStateAction<number>>;
    setLeftProgress: React.Dispatch<React.SetStateAction<number>>;
    setRightProgress: React.Dispatch<React.SetStateAction<number>>;
    stopCounting: React.RefObject<boolean>;
}

type TrackingFunction = (landmarks: Landmark[], state: TrackingState) => void;

type ExerciseKey = keyof typeof exerciseImports;

const useBodyTrack = () => {
    const [leftRepCount, setLeftRepCount] = useState<number>(0);
    const [rightRepCount, setRightRepCount] = useState<number>(0);
    const [leftProgress, setLeftProgress] = useState<number>(0);
    const [rightProgress, setRightProgress] = useState<number>(0);
    const { setRepsCount, setProgress, pause, startExercise, selectedExercise } = useExerciseStore();
    const [trackingModule, setTrackingModule] = useState<{ track: TrackingFunction } | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const leftLock = useRef<boolean>(true);
    const rightLock = useRef<boolean>(true);
    const stopCounting = useRef<boolean>(false);

    // Load the tracking module dynamically
    useEffect(() => {
        const loadTrackingModule = async () => {
            try {
                setIsLoading(true);

                if (selectedExercise && selectedExercise in exerciseImports) {
                    const importFn = exerciseImports[selectedExercise as ExerciseKey];
                    const trackModule = await importFn();
                    setTrackingModule(trackModule);
                } else {
                    console.warn(`Exercise "${selectedExercise}" not found in import map`);
                    setTrackingModule(null);
                }
            } catch (error) {
                console.error('Failed to load tracking module:', error);
                setTrackingModule(null);
            } finally {
                setIsLoading(false);
            }
        };

        loadTrackingModule();
    }, [selectedExercise]);

    useEffect(() => {
        if (stopCounting.current) return;
        setRepsCount(leftRepCount + rightRepCount);
    }, [leftRepCount, rightRepCount]);

    useEffect(() => {
        if (!startExercise) {
            setRepsCount(0);
        }
    }, [startExercise]);

    useEffect(() => {
        stopCounting.current = pause;
    }, [pause]);

    useEffect(() => {
        if (!stopCounting.current) {
            setProgress((leftProgress || rightProgress));
        }
    }, [leftProgress, rightProgress]);
    const trackBodyParts = (landmarks: Landmark[]) => {
        if (!landmarks || landmarks.length === 0 || isLoading || !trackingModule) return;

        // Track biceps curl using the dynamically loaded module
        if (trackingModule.track) {
            trackingModule.track(
                landmarks,
                {
                    leftLock,
                    rightLock,
                    setLeftRepCount,
                    setRightRepCount,
                    setLeftProgress,
                    setRightProgress,
                    stopCounting
                }
            );
        }

        if (!stopCounting.current) {
            setProgress((leftProgress + rightProgress) / 2);
        }
    };

    return {
        leftRepCount,
        rightRepCount,
        leftProgress,
        rightProgress,
        trackBodyParts,
        isLoading
    };
};

export default useBodyTrack;