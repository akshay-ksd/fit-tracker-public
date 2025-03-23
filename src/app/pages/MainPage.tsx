import React, { useState, useEffect } from "react";
import Header from "../components/header";
import useExerciseStore from "../store/useExerciseStore";
import BodyTracker from "../components/BodyTracker";
import ExerciseList from "../components/ExerciseList";

const MainPage = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const { selectedExercise } = useExerciseStore();



  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });

      const handleResize = () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return (
    <div
      className="w-screen h-screen bg-gray-100"
      style={{ height: dimensions.height, width: dimensions.width }}
    >
      {
        selectedExercise && <BodyTracker />
      }
      <Header />
      <ExerciseList />
    </div>
  );
};

export default MainPage;
