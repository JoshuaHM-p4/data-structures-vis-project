import React from 'react';

const About = () => {

  const MeetTheTeamCard = () => {
    return (
      <>
        <div className='h-[30%] w-[70%] mx-auto my-1 bg-[url("/about-page/MeetTheTeam.png")] bg-contain bg-no-repeat bg-center'></div>
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

  return (
    <>
      <div className='h-full w-full mx-auto bg-[url("/about-page/stardew.jpg")] bg-center bg-contain gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-red [&::-webkit-scrollbar-thumb]:bg-[url("/background/smb3-map.png")]'>
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