"use client";  // Ensure it's a client-side component

import { useRef } from 'react';
import toast from 'react-hot-toast';
import speakNumber from '../util/textToSpeech';

interface Landmark {
    x: number;
    y: number;
    z?: number;
    visibility?: number;
}

const BODY_PARTS: Record<number, string> = {
    0: 'Nose',
    1: 'Left Eye Inner',
    2: 'Left Eye',
    3: 'Left Eye Outer',
    4: 'Right Eye Inner',
    5: 'Right Eye',
    6: 'Right Eye Outer',
    7: 'Left Ear',
    8: 'Right Ear',
    9: 'Mouth Left',
    10: 'Mouth Right',
    11: 'Left Shoulder',
    12: 'Right Shoulder',
    13: 'Left Elbow',
    14: 'Right Elbow',
    15: 'Left Wrist',
    16: 'Right Wrist',
    17: 'Left Pinky',
    18: 'Right Pinky',
    19: 'Left Index',
    20: 'Right Index',
    21: 'Left Thumb',
    22: 'Right Thumb',
    23: 'Left Hip',
    24: 'Right Hip',
    25: 'Left Knee',
    26: 'Right Knee',
    27: 'Left Ankle',
    28: 'Right Ankle',
    29: 'Left Heel',
    30: 'Right Heel',
    31: 'Left Foot Index',
    32: 'Right Foot Index',
};

const usePointVisibilityTracking = () => {
    const hiddenParts = useRef<Set<number>>(new Set()); // Track hidden body parts
    const toastIds = useRef<Map<number, string>>(new Map()); // Track toast IDs

    const trackInvisibleParts = (landmarks: Landmark[], trackingPoints: number[]) => {
        if (!landmarks) return;

        trackingPoints.forEach((point) => {
            const landmark = landmarks[point];
            const isVisible = landmark?.visibility !== undefined ? landmark.visibility > 0.5 : false;

            if (!isVisible) {
                if (!hiddenParts.current.has(point)) {
                    // If part is newly hidden, show toast
                    hiddenParts.current.add(point);
                    const toastId = toast.error(`Tracking: ${BODY_PARTS[point]} is not visible`);
                    speakNumber(` ${BODY_PARTS[point]} is not visible`)
                    toastIds.current.set(point, toastId);
                }
            } else {
                if (hiddenParts.current.has(point)) {
                    // If part is visible again, remove toast
                    hiddenParts.current.delete(point);
                    const toastId = toastIds.current.get(point);
                    if (toastId) {
                        toast.dismiss(toastId);
                        toastIds.current.delete(point);
                    }
                }
            }
        });
    };

    return { trackInvisibleParts };
};

export default usePointVisibilityTracking;
