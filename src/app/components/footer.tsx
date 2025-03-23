import React, { FC } from 'react';
import Button from './button';
import Ripples from 'react-ripples';
import useExerciseStore from '../store/useExerciseStore';

const Footer: FC<{ handleExercise: () => void }> = ({ handleExercise }) => {

    const { selectedExercise, startExercise, setStartExercise, repsCount, progress, setRepsCount } = useExerciseStore();


    return (
        <div className='w-screen h-20 flex absolute bottom-0 items-center justify-between z-20'>
            {
                !startExercise ?
                    <div className='pl-2'>
                        <Ripples
                            placeholder=""
                            onPointerEnterCapture={() => { }}
                            onPointerLeaveCapture={() => { }}
                        >
                            <div className='h-12 w-12 rounded-full bg-slate-500 flex items-center justify-center text-xs' onClick={handleExercise}>
                                {selectedExercise}
                            </div>
                        </Ripples>
                    </div>
                    :
                    <div />
            }
            {
                !startExercise ?
                    <Ripples
                        placeholder=""
                        onPointerEnterCapture={() => { }}
                        onPointerLeaveCapture={() => { }}
                    >
                        <div className='w-56 h-8 bg-green-500 flex items-center justify-center rounded-md text-white' onClick={() => setStartExercise(true)}>
                            START
                        </div>
                    </Ripples>

                    :
                    <div className='flex w-1/2 items-center justify-between'>
                        <Button shape="circle" size="small" icon="CirclePause" color="gray" />
                        <div className='h-14 w-14 rounded-full bg-neoRed text-[30px] bold text-white flex items-center justify-center'>
                            {repsCount}
                        </div>
                        <Button shape="circle" size="small" icon="CircleStop" color="gray" onClick={() => {
                            setStartExercise(false)
                            setRepsCount(0)
                        }} />
                    </div>
            }
            {
                startExercise ?
                    <div className='h-20 bg-gray-300 flex flex-col-reverse w-4 rounded-lg mr-2 mb-4'>
                        <div className="w-4 bg-neoRed transition-all duration-200 border" style={{ height: `${progress}%` }}></div>
                    </div>
                    : <div className='w-12' />
            }


        </div>
    );
};

export default Footer;

