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
        <div className='h-[30%] w-[67%] mx-auto my-1 bg-[url("/about-page/MeetTheTeam.png")] bg-contain bg-no-repeat bg-center'></div>
      </>
    )
  }

  const GeroCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/GeroCard.png")] bg-contain bg-no-repeat bg-center gap-4'></div>
      </>
    )
  }

  const GeraldCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/GeraldCard.png")] bg-contain bg-no-repeat bg-center'></div>
      </>
    )
  }

  const EdwardCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/EdwardCard.png")] bg-contain bg-no-repeat bg-center'></div>
      </>
    )
  }

  const JoshuaCard = () => {
    return (
      <>
        <div className='h-full w-[80%] mx-auto my-3 bg-[url("/about-page/JoshuaCard.png")] bg-contain bg-no-repeat bg-center'></div>
      </>
    )
  }

  const ContactUsCard = () => {
    return (
      <>
        <div className='h-[86%] w-[80%] mx-auto my-3 bg-contain bg-no-repeat bg-center'>
          <div className='mt-20'>
            <img className='mx-auto my-5' src="/about-page/contact-us .png" alt="" />
            <div className='flex flex-row w-full h-auto gap-40 mt-10'>

              <div className='flex flex-col h-full w-full'>
                <img className='w-full my-2' src="/about-page/gero contacts profile.png" alt="" />
                <a href="https://github.com/Gero-B-Anonuevo" target='_blank'><img className='w-[94%] my-2' src="/about-page/github.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/gero-a%C3%B1onuevo-1224aa296/" target='_blank'><img className='w-full my-2' src="/about-page/linkedin.png" alt="" /></a>
              </div>

              <div className='flex flex-col h-full w-full'>
                <img className='w-full my-2' src="/about-page/gerald contacts profile.png" alt="" />
                <a href="https://github.com/geraldsberongoy" target='_blank'><img className='w-[94%] my-2' src="/about-page/github.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/gerald-berongoy-88a9b8306" target='_blank'><img className='w-full my-2' src="/about-page/linkedin.png" alt="" /></a>
              </div>

              <div className='flex flex-col h-full w-full'>
                <img className='w-full my-2' src="/about-page/edward contacts profile.png" alt="" />
                <a href="https://github.com/EdwardMaverickBorboran" target='_blank'><img className='w-[94%] my-2' src="/about-page/github.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/borboran-edward-maverick-c-b15833329" target='_blank'><img className='w-full my-2' src="/about-page/linkedin.png" alt="" /></a>
              </div>

              <div className='flex flex-col h-full w-full'>
                <img className='w-full my-2' src="/about-page/joshua contacts profile.png" alt="" />
                <a href="https://github.com/JoshuaHM-p4" target='_blank'><img className='w-[94%] my-2' src="/about-page/github.png" alt="" /></a>
                <a href="https://www.linkedin.com/in/joshua-h-mistal-3a5aab294" target='_blank'><img className='w-full my-2' src="/about-page/linkedin.png" alt="" /></a>
              </div>

            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className='h-full w-full mx-auto bg-[url("/about-page/stardew.jpg")] bg-center bg-cover gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar-track]:bg-red [&::-webkit-scrollbar-thumb]:bg-[url("/background/smb3-map.png")]'>
        <MeetTheTeamCard/>
        <GeroCard/>
        <GeraldCard/>
        <EdwardCard/>
        <JoshuaCard/>
        <ContactUsCard/>
      </div>
    </>
  )
}

export default About;