import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({

      // state variables
      title: "ScorePad!",
     
      // derived functions
      someFunction: () => {
        
      },

      // actions
      setTitle: (title) => set(({ title: title })),
    }),
    {
      name: 'ScorePad',
      storage: createJSONStorage(() => localStorage)
    },
  ),
);

export const useTitle = () => useAppStore(state => state.title);
export default useAppStore;