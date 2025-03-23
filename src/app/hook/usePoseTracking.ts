import { useState } from 'react';

interface Landmark {
    x: number;
    y: number;
    z?: number;
    visibility?: number;
}

const usePoseTracking = () => {
    const [trackingStatus, setTrackingStatus] = useState<string>('Tracking...');  
    const [isUserVisible, setIsUserVisible] = useState<boolean>(true);

    const checkUserVisibility = (landmarks: Landmark[]) => {
        if (!landmarks || landmarks.length < 33) {
            setTrackingStatus('Not Detected');
            setIsUserVisible(false);
            return;
        }

        // Key landmarks for visibility check
        const head = landmarks[0]; // Nose
        const leftShoulder = landmarks[11];
        const rightShoulder = landmarks[12];

        // If key points are missing or visibility is low
        if (
            !head || !leftShoulder || !rightShoulder ||
            (head.visibility !== undefined && head.visibility < 0.3) ||  
            (leftShoulder.visibility !== undefined && leftShoulder.visibility < 0.3) ||
            (rightShoulder.visibility !== undefined && rightShoulder.visibility < 0.3)
        ) {
            setTrackingStatus('Stay in Frame!');
            setIsUserVisible(false);
            return;
        }

        // If the shoulders are too close together, user might be turned
        if (Math.abs(leftShoulder.x - rightShoulder.x) < 0.05) {
            setTrackingStatus('Face Forward');
            setIsUserVisible(false);
            return;
        }

        setTrackingStatus('Tracking...');
        setIsUserVisible(true);
    };

    return { trackingStatus, isUserVisible, checkUserVisibility };
};

export default usePoseTracking;
