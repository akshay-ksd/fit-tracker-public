import { create } from "zustand";

// Define the store interface
interface ExerciseStore {
    selectedCategory: string | null;
    setSelectedCategory: (category: string|null) => void;
    selectedExercise: string | null;
    setSelectedExercise: (exercise: string|null) => void;
    startExercise: boolean;
    setStartExercise: (start: boolean) => void;
    repsCount: number;
    setRepsCount: (count?:number) => void;
    progress: number;
    setProgress: (progress: number) => void;
    speaker: boolean;
    setSpeaker: (speaker: boolean) => void;
    pause: boolean;
    setPause: (pause: boolean) => void;
    userVisibility: boolean;
    setUserVisibility: (visible: boolean) => void;
    exerciseMedia: string|null;
    setExerciseMedia: (media: string|null) => void;
}

// Create the Zustand store
const useExerciseStore = create<ExerciseStore>((set) => ({
    selectedCategory: null,
    setSelectedCategory: (category) => set({ selectedCategory: category }),
    selectedExercise: null,
    setSelectedExercise: (exercise) => set({ selectedExercise: exercise }),
    startExercise: false,
    setStartExercise: (start) => set({ startExercise: start }),
    repsCount: 0,
    setRepsCount: (count) => set((state) => ({ repsCount: count == 0?count:state.repsCount + 1 })),
    progress: 0,
    setProgress: (progress) => set({ progress }),
    speaker: false,
    setSpeaker: (speaker) => set({ speaker }),
    pause: false,
    setPause: (pause) => set({ pause }),
    userVisibility: false,
    setUserVisibility: (visible) => set({ userVisibility: visible }),
    exerciseMedia: null,
    setExerciseMedia: (media) => set({ exerciseMedia: media }),
}));

export default useExerciseStore;
