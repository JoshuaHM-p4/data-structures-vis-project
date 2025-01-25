import React from 'react';

const About = () => {

  const TeamCard = () => {
    return (
      <>
        <div className='bg-blue-500 h-[90%] w-[80%] mx-auto my-5 bg-[url("/background/smb3-map.png")]' style={{boxShadow: "0px 5px black, 0px -5px black, 5px 0px black, -5px 0px black, -3px -3px black, 3px 3px black, 3px -3px black, -3px 3px black", flex: "1 0 200px"}}></div>
      </>
    )
  }

  return (
    <>
      <h1 className='text-lg'>Meet the team</h1>

      <div className=' bg-white my-6 mx-auto w-[90%] h-[80%] gap-4 overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-[url("/background/smb3-map.png")]'>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
        <TeamCard/>
      </div>
    </>
  )
}

export default About;