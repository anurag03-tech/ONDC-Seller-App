// // voiceContext.js
// import React, { createContext, useContext, useState, useEffect } from "react";
// import { Audio } from "expo-av";
// import axios from "axios";
// import { useMute } from "./MuteContext";

// const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

// const voiceContext = createContext();

// export const VoiceProvider = ({ children }) => {
//   const [sound, setSound] = useState(null);
//   const { isMuted } = useMute(); // Get the mute state from MuteContext

//   useEffect(() => {
//     if (isMuted && sound) {
//       // Stop audio immediately if muted
//       sound.stopAsync();
//       sound.unloadAsync();
//       setSound(null);
//     }
//   }, [isMuted, sound]);

//   const speakText = async (text, languageCode) => {
//     if (isMuted) return; // Exit if muted

//     try {
//       const response = await axios.post(
//         `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`,
//         {
//           input: { text },
//           voice: {
//             languageCode,
//             name: `${languageCode}-Wavenet-A`,
//             ssmlGender: "MALE",
//           },
//           audioConfig: { audioEncoding: "MP3" },
//         }
//       );

//       const audioContent = response.data.audioContent;
//       const audioUri = `data:audio/mp3;base64,${audioContent}`; // Create a data URI

//       // Load and play the sound
//       const { sound: newSound } = await Audio.Sound.createAsync({
//         uri: audioUri,
//       });
//       setSound(newSound);
//       await newSound.playAsync(); // Play the sound

//       // Set up playback status update
//       newSound.setOnPlaybackStatusUpdate((status) => {
//         if (status.didJustFinish) {
//           newSound.unloadAsync(); // Unload the sound after playback
//           setSound(null);
//         }
//       });
//     } catch (error) {
//       console.error("Error speaking text:", error);
//     }
//   };

//   const stopAudio = async () => {
//     if (sound) {
//       await sound.stopAsync();
//       await sound.unloadAsync();
//       setSound(null);
//     }
//   };

//   return (
//     <voiceContext.Provider value={{ speakText, stopAudio }}>
//       {children}
//     </voiceContext.Provider>
//   );
// };

// export const useVoice = () => {
//   return useContext(voiceContext);
// };

import React, { createContext, useContext, useState, useRef } from "react";
import { Audio } from "expo-av";
import axios from "axios";
import { useMute } from "./MuteContext";

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

const VoiceContext = createContext();

export const VoiceProvider = ({ children }) => {
  const soundRef = useRef(null);
  const { isMuted } = useMute();

  const stopAudio = async () => {
    try {
      if (soundRef.current) {
        // Force stop and unload
        await Audio.setIsEnabledAsync(false);
        await soundRef.current.stopAsync().catch(() => {});
        await soundRef.current.unloadAsync().catch(() => {});
        soundRef.current = null;
        await Audio.setIsEnabledAsync(true);
      }
    } catch (error) {
      console.error("Stop error:", error);
    }
  };

  const speakText = async (text, languageCode) => {
    if (isMuted) return;

    try {
      // Force stop any existing audio
      await stopAudio();

      const response = await axios.post(
        `https://texttospeech.googleapis.com/v1/text:synthesize?key=${GOOGLE_API_KEY}`,
        {
          input: { text },
          voice: {
            languageCode,
            name: `${languageCode}-Wavenet-A`,
            ssmlGender: "MALE",
          },
          audioConfig: { audioEncoding: "MP3", speakingRate: 0.9 },
        }
      );

      if (isMuted) return;

      const audioContent = response.data.audioContent;
      const audioUri = `data:audio/mp3;base64,${audioContent}`;

      const { sound } = await Audio.Sound.createAsync(
        { uri: audioUri },
        { shouldPlay: false }
      );

      soundRef.current = sound;

      await sound.playAsync();
    } catch (error) {
      console.error("Speak error:", error);
    }
  };

  return (
    <VoiceContext.Provider value={{ speakText, stopAudio }}>
      {children}
    </VoiceContext.Provider>
  );
};

export const useVoice = () => {
  return useContext(VoiceContext);
};

export default VoiceContext;
