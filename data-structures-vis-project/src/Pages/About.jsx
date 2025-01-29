import React, { useRef, useEffect } from 'react';
import aboutMusic from '/music/stardew_valley.mp3';
import useSound from '../hooks/useSound.js';


const About = () => {
  const { playSound } = useSound();
  const aboutMusicRef = useRef(null);
  
    const playAboutMusic = () => {
      aboutMusicRef.current = playSound(aboutMusic, { volume: 0.3, loop: true });
    }
  
    const stopMapMusic = () => {
      if (aboutMusicRef.current) {
        aboutMusicRef.current.pause();
        aboutMusicRef.current.currentTime = 0;
        aboutMusicRef.current = null;
      }
    };
  
    useEffect(() => {
      playAboutMusic();
      return () => {
        stopMapMusic();
      }
    }, []);

  const MeetTheTeamCard = () => {
    return (
      <>
        <div className='h-[30%] w-[67%] mx-auto my-1 bg-[url("/about-page/MeetTheTeam.png")] bg-contain bg-no-repeat bg-center pixelated'></div>
      </>
    )
  }

  const GeroCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/GeroCard.png")] bg-contain bg-no-repeat bg-center gap-4 pixelated'></div>
      </>
    )
  }

  const GeraldCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/GeraldCard.png")] bg-contain bg-no-repeat bg-center pixelated'></div>
      </>
    )
  }

  const EdwardCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/EdwardCard.png")] bg-contain bg-no-repeat bg-center pixelated'></div>
      </>
    )
  }

  const JoshuaCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/JoshuaCard.png")] bg-contain bg-no-repeat bg-center pixelated'></div>
      </>
    )
  }

  return (
    <>
      <div className='h-full w-full mx-auto bg-[url("/about-page/stardew.jpg")] bg-center bg-contain gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-red [&::-webkit-scrollbar-thumb]:bg-[url("/background/smb3-map.png")] pixelated'>
        <MeetTheTeamCard/>
        <GeroCard/>
        <GeraldCard/>
        <EdwardCard/>
        <JoshuaCard/>
      </div>
    </>
  )
}

export default About;