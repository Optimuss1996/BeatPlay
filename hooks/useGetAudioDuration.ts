import { useCallback } from "react";

export default function useGetAudioDuration() {
  const getAudioDuration = useCallback((file: File): Promise<number> => {
    return new Promise((resolve, reject) => {
      const audio = new Audio();
      audio.src = URL.createObjectURL(file);

      audio.addEventListener("loadedmetadata", () => {
        resolve(audio.duration);
      });

      audio.addEventListener("error", (error) => {
        reject(new Error("Failed to load audio metadata"));
      });
    });
  }, []);

  return { getAudioDuration };
}
