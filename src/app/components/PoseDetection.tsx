// import { useState, useRef, useEffect } from 'react';
// import useExerciseStore from '../store/useExerciseStore';
// import usePointVisibilityTracking from './usePointVisibilityTracking';
// interface Landmark {
//     x: number;
//     y: number;
//     z?: number;  // Add z-coordinate for depth tracking
//     visibility?: number;
// }

// const useBicepTracking = () => {
//     const [leftRepCount, setLeftRepCount] = useState<number>(0);
//     const [rightRepCount, setRightRepCount] = useState<number>(0);
//     const [isReady, setIsReady] = useState<boolean>(false);
//     const [leftProgress, setLeftProgress] = useState<number>(0);
//     const [rightProgress, setRightProgress] = useState<number>(0);
//     const { setRepsCount, setProgress } = useExerciseStore();
//     const {trackInvisibleParts} = usePointVisibilityTracking();

//     const leftLock = useRef<boolean>(false);
//     const rightLock = useRef<boolean>(false);

//     useEffect(() => {
//         setRepsCount(leftRepCount + rightRepCount);  // Ensure total reps are updated
//     }, [leftRepCount, rightRepCount]);

//     const checkReadyState = (landmarks: Landmark[]) => {
//         const leftElbow = landmarks[13];
//         const leftWrist = landmarks[15];
//         const rightElbow = landmarks[14];
//         const rightWrist = landmarks[16];

//         if (leftWrist.y > leftElbow.y + 0.1 && rightWrist.y > rightElbow.y + 0.1) {
//             setIsReady(true);
//         }
//     };

//     const trackLeftBicepCurl = (landmarks: Landmark[]) => {
//         const leftShoulder = landmarks[11];
//         const leftElbow = landmarks[13];
//         const leftWrist = landmarks[15];
//         trackInvisibleParts(landmarks, [11,12, 13,14, 15,16]);
//         if (!leftShoulder || !leftElbow || !leftWrist) return;  // Avoid undefined errors

//         // Ensure visibility threshold is met
//         if (
//             leftShoulder.visibility! > 0.5 &&
//             leftElbow.visibility! > 0.5 &&
//             leftWrist.visibility! > 0.5
//         ) {
//             const leftAngle = getAngle3D(leftShoulder, leftElbow, leftWrist); // Use 3D angle calculation

//             if (leftAngle > 140) {  
//                 leftLock.current = false;  // Unlock when arm is fully extended
//             }

//             if (leftAngle < 50 && !leftLock.current) {  
//                 leftLock.current = true;   // Lock when fully curled
//                 setLeftRepCount((prev) => prev + 1);
//             }

//             const progress = Math.max(0, Math.min(100, (1 - (leftWrist.y - leftShoulder.y) * 5) * 100));
//             setLeftProgress(progress);
//             setProgress(progress);
//         }
//     };

//     const trackRightBicepCurl = (landmarks: Landmark[]) => {
//         const rightShoulder = landmarks[12];
//         const rightElbow = landmarks[14];
//         const rightWrist = landmarks[16];

//         if (!rightShoulder || !rightElbow || !rightWrist) return;  // Avoid undefined errors

//         // Ensure visibility threshold is met
//         if (
//             rightShoulder.visibility! > 0.5 &&
//             rightElbow.visibility! > 0.5 &&
//             rightWrist.visibility! > 0.5
//         ) {
//             const rightAngle = getAngle3D(rightShoulder, rightElbow, rightWrist); // Use 3D angle calculation

//             if (rightAngle > 140) {  
//                 rightLock.current = false;  // Unlock when arm is fully extended
//             }

//             if (rightAngle < 50 && !rightLock.current) {  
//                 rightLock.current = true;   // Lock when fully curled
//                 setRightRepCount((prev) => prev + 1);
//             }

//             const progress = Math.max(0, Math.min(100, (1 - (rightWrist.y - rightShoulder.y) * 5) * 100));
//             setRightProgress(progress);
//             setProgress(progress);
//         }
//     };

//     /**
//      * Calculates the angle between three points in 3D space
//      */
//     const getAngle3D = (A: Landmark, B: Landmark, C: Landmark): number => {
//         const AB = { x: B.x - A.x, y: B.y - A.y };
//         const BC = { x: C.x - B.x, y: C.y - B.y };

//         const dotProduct = AB.x * BC.x + AB.y * BC.y;
//         const magAB = Math.sqrt(AB.x ** 2 + AB.y ** 2);
//         const magBC = Math.sqrt(BC.x ** 2 + BC.y ** 2);

//         const angleRad = Math.acos(dotProduct / (magAB * magBC));
//         return (angleRad * 180) / Math.PI;
//     };


//     return {
//         leftRepCount,
//         rightRepCount,
//         leftProgress,
//         rightProgress,
//         isReady,
//         checkReadyState,
//         trackLeftBicepCurl,
//         trackRightBicepCurl,
//     };
// };

// export default useBicepTracking;


//     if (!poseLandmarks || !canvas) return;

    //     const nose = poseLandmarks[0];  // Nose
    //     const leftEar = poseLandmarks[7];
    //     const rightEar = poseLandmarks[8];
    //     // const leftEye = poseLandmarks[2];
    //     // const rightEye = poseLandmarks[5];

    //     const canvasHeight = canvas.height;

    //     // Head out of frame
    //     if (!nose || !leftEar || !rightEar) {
    //         setUserVisibility(false);
    //         speakNumber('⚠️ Head is out of frame!')
    //         console.log("⚠️ Head is out of frame!");
    //         return;
    //     } else {
    //         setTimeout(() => {
    //             setUserVisibility(true);

    //         }, 5000)
    //     }

    //     // Top of head might be cut off
    //     if (nose.y * canvasHeight < 50) {
    //         speakNumber('Head not in frame!')
    //         setUserVisibility(false);

    //         console.log("Head not in frame!");
    //     } else {
    //         setTimeout(() => {
    //             setUserVisibility(true);

    //         }, 5000)
    //     }

    //     // Ears missing - head might be cropped from the sides
    //     if (!leftEar || !rightEar) {
    //         speakNumber('⚠️ Move head to center!')
    //         setUserVisibility(false);

    //         console.log("⚠️ Move head to center!");
    //     } else {
    //         setTimeout(() => {
    //             setUserVisibility(true);

    //         }, 5000)
    //     }
    // };


