// File: /exercises/.ts
import { Landmark } from '../../../types/landmark';

interface TrackingState {
    leftLock: React.RefObject<boolean>;
    rightLock: React.RefObject<boolean>;
    setLeftRepCount: React.Dispatch<React.SetStateAction<number>>;
    setRightRepCount: React.Dispatch<React.SetStateAction<number>>;
    setLeftProgress: React.Dispatch<React.SetStateAction<number>>;
    setRightProgress: React.Dispatch<React.SetStateAction<number>>;
    stopCounting: React.RefObject<boolean>;
}

export const track = (landmarks: Landmark[], state: TrackingState) => {
    const bodyParts = [
        { shoulder: 11, elbow: 13, wrist: 15, lock: state.leftLock, setRepCount: state.setLeftRepCount, setProgress: state.setLeftProgress },
        { shoulder: 12, elbow: 14, wrist: 16, lock: state.rightLock, setRepCount: state.setRightRepCount, setProgress: state.setRightProgress }
    ];
    
    bodyParts.forEach(({ shoulder, elbow, wrist, lock, setRepCount, setProgress }) => {
        const shoulderPoint = landmarks[shoulder];
        const elbowPoint = landmarks[elbow];
        const wristPoint = landmarks[wrist];
        
        if (!shoulderPoint || !elbowPoint || !wristPoint) return;
        
        if (
            shoulderPoint.visibility! > 0.5 &&
            elbowPoint.visibility! > 0.5 &&
            wristPoint.visibility! > 0.5
        ) {
            const angle = getAngle3D(shoulderPoint, elbowPoint, wristPoint);
            
            if (angle > 140) {
                lock.current = false;
            }
            if (angle < 50 && !lock.current) {
                lock.current = true;
                setRepCount(prev => prev + 1);
            }
            
            const progress = Math.max(0, Math.min(100, (1 - (wristPoint.y - shoulderPoint.y) * 5) * 100));
            setProgress(progress);
        }
    });
};

const getAngle3D = (A: Landmark, B: Landmark, C: Landmark): number => {
    const AB = { x: B.x - A.x, y: B.y - A.y };
    const BC = { x: C.x - B.x, y: C.y - B.y };
    
    const dotProduct = AB.x * BC.x + AB.y * BC.y;
    const magAB = Math.sqrt(AB.x ** 2 + AB.y ** 2);
    const magBC = Math.sqrt(BC.x ** 2 + BC.y ** 2);
    
    const angleRad = Math.acos(dotProduct / (magAB * magBC));
    return (angleRad * 180) / Math.PI;
};