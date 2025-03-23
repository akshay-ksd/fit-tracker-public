'use client';

import React, { useRef, useEffect, useState } from 'react';
import useExerciseStore from '../store/useExerciseStore';
import speakNumber from '../util/textToSpeech';
import ExerciseTrackerUI from './ExerciseTrackerUI';

import useBodyTrack from '../hook/useBodyTrack';

const BodyTracker: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isCameraOn] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    
    const {
        startExercise,
        setStartExercise,
        repsCount,
        speaker,
        setSpeaker,
        progress: storeProgress,
        pause,
        setPause,
        setUserVisibility,
        userVisibility,
        setSelectedExercise,
        selectedCategory,
        setSelectedCategory,
        exerciseMedia
    } = useExerciseStore();

    const disSpeech = useRef<boolean>(false);
    const stopCounting = useRef<boolean>(false);
    

    const {
        trackBodyParts
    } = useBodyTrack();
    
    useEffect(() => {
        let pose: any = null;
        let camera: any = null;
        let progressInterval: any = null;

        const loadPoseDetection = async () => {
            const { Pose } = await import('@mediapipe/pose');
            const { Camera } = await import('@mediapipe/camera_utils');

            pose = new Pose({
                locateFile: (file: string) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
            });

            pose.setOptions({
                modelComplexity: 1,
                smoothLandmarks: true,
                enableSegmentation: true,
                smoothSegmentation: true,
                minDetectionConfidence: 0.7,
                minTrackingConfidence: 0.7,
            });

            pose.onResults((results: any) => {
                if (!videoRef.current || !canvasRef.current) return;

                const video = videoRef.current;
                const canvas = canvasRef.current;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                canvas.width = video.videoWidth;
                canvas.height = video.videoHeight;

                ctx.save();
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

                if (results.poseLandmarks) {
                    if (pause || !startExercise) {
                        return
                    }
                    getBoundingBox(results.poseLandmarks);
                    
                    if (startExercise && !stopCounting.current) {
                        trackBodyParts(results.poseLandmarks);
                    }
                } else {
                    setTimeout(() => {
                        setUserVisibility(false)
                    }, 1000)
                }
                ctx.restore();
                setLoading(false);
            });

            if (isCameraOn && videoRef.current) {
                camera = new Camera(videoRef.current, {
                    onFrame: async () => {
                        if (videoRef.current) await pose.send({ image: videoRef.current });
                    },
                    width: 640,
                    height: 480,
                });
                camera.start();
            }

            progressInterval = setInterval(() => {
                setProgress((prev) => (prev < 100 ? prev + 5 : 100));
            }, 300);
        };

        loadPoseDetection();

        return () => {
            if (camera) {
                camera.stop();
            }
            clearInterval(progressInterval);
        };
    }, [isCameraOn, startExercise, pause]);

    useEffect(() => {
        if (repsCount > 0 && startExercise && speaker) {
            speakNumber(repsCount)
        }
    }, [repsCount, startExercise, speaker]);

    useEffect(() => {
        stopCounting.current = !userVisibility
    }, [userVisibility])

    const getBoundingBox = (landmarks: any) => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        for (const landmark of landmarks) {
            minX = Math.min(minX, landmark.x);
            minY = Math.min(minY, landmark.y);
            maxX = Math.max(maxX, landmark.x);
            maxY = Math.max(maxY, landmark.y);
        }

        const { width, height } = { width: maxX - minX, height: maxY - minY };
        const estimatedDistance = 1 / (width * height);  // Example scale, needs tuning
        if (estimatedDistance > 1) {
            setUserVisibility(true)
            disSpeech.current = false
        } else {
            if (disSpeech.current) return
            disSpeech.current = true
            speakNumber('Too close to camera! stay back')
            setUserVisibility(false)
        }
    };

    const handleClose = () => {
        setSelectedExercise(null);
        setSelectedCategory(null);
        setStartExercise(false);
        setPause(true);
    };

    const handleToggleSpeaker = () => {
        setSpeaker(!speaker);
    };

    const handleStart = () => {
        setStartExercise(true);
        setPause(false);
        setSpeaker(true);
        setUserVisibility(true);
    };

    const handleTogglePause = () => {
        setPause(!pause);
    };

    const handleStop = () => {
        setStartExercise(false);
        setPause(true);
    };

    return (
        <ExerciseTrackerUI
            loading={loading}
            progress={progress}
            userVisibility={userVisibility}
            startExercise={startExercise}
            pause={pause}
            repsCount={repsCount}
            storeProgress={storeProgress}
            selectedCategory={selectedCategory}
            exerciseMedia={exerciseMedia}
            speaker={speaker}
            canvasRef={canvasRef}
            videoRef={videoRef}
            onClose={handleClose}
            onToggleSpeaker={handleToggleSpeaker}
            onStart={handleStart}
            onTogglePause={handleTogglePause}
            onStop={handleStop}
        />
    );
};

export default BodyTracker;