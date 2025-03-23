'use client';

import React from 'react';
import Button from './button';
import Ripples from 'react-ripples';
import CountdownTimer from './CountdownTimer';

interface ExerciseTrackerUIProps {
  loading: boolean;
  progress: number;
  userVisibility: boolean;
  startExercise: boolean;
  pause: boolean;
  repsCount: number;
  storeProgress: number;
  selectedCategory: string | null;
  exerciseMedia: string | null;
  speaker: boolean;
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>;
  videoRef: React.MutableRefObject<HTMLVideoElement | null>;
  onClose: () => void;
  onToggleSpeaker: () => void;
  onStart: () => void;
  onTogglePause: () => void;
  onStop: () => void;
}

const ExerciseTrackerUI: React.FC<ExerciseTrackerUIProps> = ({
  loading,
  progress,
  userVisibility,
  startExercise,
  pause,
  repsCount,
  storeProgress,
  selectedCategory,
  exerciseMedia,
  speaker,
  canvasRef,
  videoRef,
  onClose,
  onToggleSpeaker,
  onStart,
  onTogglePause,
  onStop
}) => {
  return (
    <div className="h-full w-full absolute bottom-0 z-10 bg-black p-4">
      <div className='w-full absolute top-0 px-3 pt-7 flex items-center justify-between z-40 pr-12'>
        <Button shape="circle" size="small" icon="X" color="gray" onClick={onClose} />
        <Button shape="circle" size="small" icon={speaker ? "Volume2" : "VolumeOff"} color="#f04648" onClick={onToggleSpeaker} />
      </div>
      <div className="w-full h-3/5 relative flex items-center justify-center"
        style={{
          padding: '3px',
          background: userVisibility ? 'linear-gradient(90deg, #4CAF50, #81C784)' : 'linear-gradient(90deg, #FF5252, #FF8A80)',
          borderRadius: '16px',
          zIndex: -1,
        }}
      >
        {
          !startExercise &&
          <div className="absolute flex items-center justify-center z-50 bg-white h-full w-full rounded-lg">
            <img src={exerciseMedia || ""} style={{ height: 300, width: 300 }} />
          </div>
        }
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-60 z-40">
            <div className="relative w-16 h-16">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle className="text-gray-300" strokeWidth="8" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
                <circle className="text-neoRed" strokeWidth="8" strokeDasharray="251.2" strokeDashoffset={`${251.2 - (progress / 100) * 251.2}`} strokeLinecap="round" stroke="currentColor" fill="transparent" r="40" cx="50" cy="50" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">{progress}%</div>
            </div>
          </div>
        )}
        <video ref={videoRef} className="hidden" autoPlay playsInline />
        <canvas
          ref={canvasRef}
          className="w-full max-w-lg h-full relative"
          style={{
            aspectRatio: '640 / 480',
            background: 'white',
            borderRadius: '16px',
            zIndex: 0,
            boxShadow: userVisibility
              ? '0 0 15px 5px rgba(76, 175, 80, 0.5)'  // Green soft glow (if visible)
              : '0 0 15px 5px rgba(255, 82, 82, 0.5)', // Red soft glow (if hidden)
          }}
        />
      </div>

      <div className='w-full flex items-center justify-start h-16 text-3xl font-bold pl-3'>
        {selectedCategory}
      </div>

      <div className='w-full flex px-3 items-center justify-between'>
        <div className="w-28 h-32 bg-gray-700 rounded-lg flex flex-col items-center justify-center">
          <div className='text-2xl'>🔥</div>
          <div className='text-4xl font-bold'>{repsCount}</div>
          <div className='text-xs text-gray-400'>Reps</div>
        </div>
        <div className='h-28 bg-gray-300 flex flex-col-reverse w-4 rounded-sm'>
          <div className="w-4 bg-neoRed transition-all duration-200 border" style={{ height: `${storeProgress}%` }}></div>
        </div>

        <CountdownTimer />
      </div>

      <div className='p-3 flex items-center justify-evenly'>
        {
          !startExercise && (
            <Ripples
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              className='w-full h-10 bg-neoRed rounded-3xl text-white font-bold text-sm flex items-center justify-center'
              onClick={onStart}
            >
              Start Exercise
            </Ripples>
          )
        }
        {
          startExercise && (
            <Ripples
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              className='w-1/3 h-10 bg-neoRed rounded-3xl text-white font-bold text-sm flex items-center justify-center'
              onClick={onTogglePause}
            >
              {pause ? 'Resume' : 'Pause'}
            </Ripples>
          )
        }
        {
          startExercise && (
            <Ripples
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }}
              className='w-1/3 h-10 bg-neoRed rounded-3xl text-white font-bold text-sm flex items-center justify-center'
              onClick={onStop}
            >
              Stop
            </Ripples>
          )
        }
      </div>
    </div>
  );
};

export default ExerciseTrackerUI;