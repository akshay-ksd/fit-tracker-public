import React from 'react'
import { LucideIcon, icons } from "lucide-react";
import useExerciseStore from '../store/useExerciseStore';
import Ripples from 'react-ripples'

const ExerciseList = () => {
  //hooks
  const {setSelectedExercise,setSelectedCategory,setExerciseMedia} = useExerciseStore();

  const IconComponent: LucideIcon | null = icons["Search"];

  const exerciseList = [
    {
      id:"1-BicepCurls",
      name: "Bicep Curls",
      description: "A classic upper body exercise for strengthening the chest, shoulders, and triceps. Start in a plank position with hands shoulder-width apart, then lower your body until your chest almost touches the ground and push back up to the starting position.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Dumbbell-Curl.gif"
    },
    {
      id:"2-HammerCurls",
      name: "Hammer Curls",
      description: "A great exercise for strengthening the back and arms. Find a pull-up bar and hang from it with your hands shoulder-width apart. Then, pull yourself up until your chin is above the bar and slowly lower yourself back down.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Hammer-Curl.gif"
    },
    {
      id:"3-ConcentrationCurl",
      name: "Concentration Curl",
      description: "A compound exercise for strengthening the legs, glutes and core. Stand with your feet shoulder-width apart, then lower your body down into a seated position before pushing back up to the starting position. Keep your back straight and your knees in line with your toes.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Concentration-Curl.gif"
    },
    {
      id:"4-ZottmanCurls",
      name: "Zottman Curls",
      description: "A classic upper body exercise for strengthening the chest, shoulders, and triceps. Lie on a flat bench and grip the barbell with your hands shoulder-width apart. Lower the bar down to your chest, then push it back up to the starting position.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/04/zottman-curl.gif"
    },
    {
      id:"5-InclineDumbbellCurls",
      name: "Incline Dumbbell Curls",
      description: "An exercise for strengthening the shoulders and triceps. Stand or sit with your feet shoulder-width apart and hold a dumbbell or barbell above your head. Lower the weight down to your shoulders, then press it back up to the starting position.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2022/02/Flexor-Incline-Dumbbell-Curls.gif"
    },
    {
      id:"6-BarbellBicepCurls",
      name: "Barbell Bicep Curls",
      description: "A compound exercise for strengthening the legs, glutes and core. Stand with your feet shoulder-width apart, then lower your body down into a seated position before pushing back up to the starting position. Keep your back straight and your knees in line with your toes.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif"
    },
    {
      id:"7-EZ Bar Curls",
      name: "Z Bar Curls",
      description: "A classic upper body exercise for strengthening the chest, shoulders, and triceps. Lie on a flat bench and grip the barbell with your hands shoulder-width apart. Lower the bar down to your chest, then push it back up to the starting position.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Barbell-Curl.gif"
    },
    {
      id:"8-Preacher Curls",
      name: "Preacher Curls",
      description: "An exercise for strengthening the shoulders and triceps. Stand or sit with your feet shoulder-width apart and hold a dumbbell or barbell above your head. Lower the weight down to your shoulders, then press it back up to the starting position.",
      thumbnail: "https://fitnessprogramer.com/wp-content/uploads/2021/02/Z-Bar-Preacher-Curl.gif"
    },
  ]

  return (
    <div style={{ width: '100%', height: '95%' }}>
      <div className='w-full h-16 items-center justify-center flex px-2 py-2'>
        <div className='w-full h-full bg-gray-200 rounded-xl flex items-center justify-start px-3'>
          <IconComponent size={20} color='gray' />
          <input type="text" placeholder="Search Workouts" className='ml-2 bg-transparent outline-none text-black w-60' />
          {/* <Button shape="circle" size="small" icon="SlidersHorizontal" color="black" /> */}
        </div>
      </div>
      <div className='w-full h-5/6 overflow-y-scroll'>
        {
          exerciseList.map((item, index) => {
            return (
              <Ripples
              onClick={() => { setSelectedExercise(item.id) 
                setExerciseMedia(item.thumbnail)
                setSelectedCategory(item.name)
              }}
              placeholder=""
              onPointerEnterCapture={() => { }}
              onPointerLeaveCapture={() => { }} 
              key={index} className='w-full h-26 items-center flex px-2 py-2'>
                <div className='w-20 h-20 flex items-center justify-center'>
                  <img src={item.thumbnail} className='w-20 h-20 rounded-lg' />
                </div>
                <div className='w-52 h-full flex flex-col items-start justify-center ml-4'>
                  <div className='text-lg text-black font-bold '>{item.name}</div>
                  <div className="text-sm text-gray-600 font-bold">
                    Upper Body
                  </div>
                  <div className="text-sm text-gray-600 line-clamp-2">
                    {item.description}
                  </div>
                </div>
              </Ripples>
            )
          })
        }
      </div>


    </div>
  )
}

export default ExerciseList