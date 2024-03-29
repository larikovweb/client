import { useState, useRef, useEffect, useCallback } from 'react';

export const useAudioPlayer = (src: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(new Audio(src));

  const resetPlayer = useCallback(() => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  }, []);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error) => {
            console.error('Ошибка при попытке воспроизвести аудио:', error);
          });
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const updateProgress = useCallback(() => {
    const audio = audioRef.current;
    if (audio.duration) {
      const currentProgress = (audio.currentTime / audio.duration) * 100;
      setProgress(currentProgress);
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', resetPlayer);

    return () => {
      audio.removeEventListener('timeupdate', updateProgress);
      audio.removeEventListener('ended', resetPlayer);
    };
  }, [updateProgress, resetPlayer]);

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio.pause();
      resetPlayer();
    };
  }, [resetPlayer]);

  useEffect(() => {
    let isCancelled = false;

    const fetchAudioAsBlobUrl = async () => {
      try {
        const response = await fetch(src);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const audioBlob = await response.blob();
        const newAudioBlob = new Blob([audioBlob], { type: 'audio/wav' });
        const newAudioBlobUrl = URL.createObjectURL(newAudioBlob);

        if (!isCancelled) {
          setBlobUrl(newAudioBlobUrl);
        }
      } catch (error) {
        console.error('Ошибка при загрузке аудио Blob:', error);
        if (!isCancelled) {
          setBlobUrl(null);
        }
      }
    };

    fetchAudioAsBlobUrl();

    return () => {
      isCancelled = true;
      if (blobUrl) {
        URL.revokeObjectURL(blobUrl);
      }
    };
  }, [src]);

  const seek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  return {
    isPlaying,
    progress,
    togglePlayPause,
    seek,
    audioRef,
    blobUrl,
  };
};
