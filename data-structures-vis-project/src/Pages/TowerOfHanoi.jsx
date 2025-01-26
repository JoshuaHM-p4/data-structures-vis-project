import React, { useEffect, useState, useRef } from 'react';
import 'snes.css/dist/snes.min.css';
import useSound from "../hooks/useSound.js"
import winSound from "../assets/sounds/ToH-stageclear.mp3"
import moveSound from "../assets/sounds/ToH-move.mp3"
import bgSound from "../assets/sounds/ToH-bg.mp3"
import wrongSound from "../assets/sounds/ToH-wrong.mp3"

const TowerOfHanoi = () => {
  class TowersOfHanoi{
    constructor(){
        this.firstTower = [];
        this.secondTower = [];
        this.thirdTower = [];
        this.initialValues = {"A":1, "B":2, "C":3, "D":4, "E":5};
        this.recursionLogic(this.initialValues);
    }

    recursionLogic(list){

        if(Object.keys(list).length === 0){return this.firstTower};
    
        let index = Math.floor(Math.random()*Object.keys(list).length);
    
        let randomElement = Object.keys(list)[index];
        this.firstTower.push(randomElement);
        
        delete list[randomElement];
        this.recursionLogic(list);
    }

    isBigger(selectedDisk, selectedTower){
      let fromValue
      let toValue
      switch(selectedDisk){
          case "A":
              fromValue = 1
              break
          case "B":
              fromValue = 2
              break
          case "C":
              fromValue = 3
              break
          case "D":
              fromValue = 4
              break
          case "E":
              fromValue = 5
              break
      }
      switch(selectedTower[selectedTower.length-1]){
          case "A":
              toValue = 1
              break
          case "B":
              toValue = 2
              break
          case "C":
              toValue = 3
              break
          case "D":
              toValue = 4
              break
          case "E":
              toValue = 5
              break
      }
      if(fromValue > toValue || selectedTower.length==0){
            console.log("isBigger true") 
            return true
        }else{
          setNoticeBoard("Invalid Move!!!")
          new Audio(wrongSound).play()
          console.log("isBigger false")
          return false}
    }

    moveDisk(selectedTower, endTower){

      let temporarySelected
      let temporaryEnd

      switch(selectedTower){
        case this.firstTower:
          temporarySelected = "FT"
          break
        case this.secondTower:
          temporarySelected = "ST"
          break
        case this.thirdTower:
          temporarySelected = "TT"
      }
      switch(endTower){
        case this.firstTower:
          temporaryEnd = "FT"
          break
        case this.secondTower:
          temporaryEnd = "ST"
          break
        case this.thirdTower:
          temporaryEnd = "TT"
      }

      console.log("moveDisk start")
      if(this.isBigger(selectedTower[selectedTower.length-1], endTower)){
          let disk = selectedTower.pop()
          console.log("disk:", disk)
          endTower.push(disk)
          setNoticeBoard("Move Successful!!!")
          setMoves(m => m + 1)
          setMovingDisk(disk)
          new Audio(moveSound).play()
        }

      switch(temporarySelected){
        case "FT":
          this.firstTower = selectedTower
          break
        case "ST":
          this.secondTower = selectedTower
          break
        case "TT":
          this.thirdTower = selectedTower
      }
      switch(temporaryEnd){
        case "FT":
          this.firstTower = endTower
          break
        case "ST":
          this.secondTower = endTower
          break
        case "TT":
          this.thirdTower = endTower
      }
    }        
  }

  const { playSound} = useSound()
  const audioRef = useRef(null)

  const playBG = () => {
    audioRef.current = playSound(bgSound, {volume: 0.3, loop: true })
  }

  const stopMusic = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0
      audioRef.current = null
    }
  }

  useEffect(() => {
    playBG()
    return () => {stopMusic()}
  }, [])

  const [tower, setTower] = useState(new TowersOfHanoi());
  const [fromVar, setFromVar] = useState(null);
  const [toVar, setToVar] = useState(null);

  const FirstTower = () => {
    let revFirstTower = [...tower.firstTower].reverse()
    return ( 
      <>
      {revFirstTower.map((x) => determineDisk(x))}
      </>
    )
  }

  const SecondTower = () => {
    let revSecondTower = [...tower.secondTower].reverse()
    return ( 
      <>
      {revSecondTower.map((x) => determineDisk(x))}
      </>
    )
  }

  const ThirdTower = () => {
    let revThirdTower = [...tower.thirdTower].reverse()
    return ( 
      <>
      {revThirdTower.map((x) => determineDisk(x))}
      </>
    )
  }

  const determineDisk = (disk) => {
    switch(disk){
      case "A":
        return <DiskA/>
      case "B":
        return <DiskB/>
      case "C":
        return <DiskC/>
      case "D":
        return <DiskD/>
      case "E":
        return <DiskE/>
    }
  }

  const confirmAction = (from, to) => {
    console.log("confirmAction")
    console.log("from raw:", from)
    console.log("to raw:", to)
    setActiveFirstTower('bg-red-600')
    setActiveSecondTower('bg-gray-600')
    setActiveThirdTower('bg-emerald-500')
    setActiveFirstTower2('bg-red-600')
    setActiveSecondTower2('bg-gray-600')
    setActiveThirdTower2('bg-emerald-500')
    setDiskAAnimaState('paused')
    setDiskBAnimaState('paused')
    setDiskCAnimaState('paused')
    setDiskDAnimaState('paused')
    setDiskEAnimaState('paused')
    if(from && to){
      tower.moveDisk(from,to)
      const newTower = new TowersOfHanoi();
      newTower.firstTower = [...tower.firstTower];
      newTower.secondTower = [...tower.secondTower];
      newTower.thirdTower = [...tower.thirdTower];
      setTower(newTower);
      setFromVar(null)
      setToVar(null)
      console.log("from altered:", from)
      console.log("to altered:", to, "\n")
      console.log("firstTower:", tower.firstTower)
      console.log("secondTower:", tower.secondTower)
      console.log("thirdTower:", tower.thirdTower)
    }else{
      setNoticeBoard("Invalid Move!!!")
      new Audio(wrongSound).play()
    }
  }

  const changeFromVar = (value) => {
    switch(value){
      case tower.firstTower:
        setActiveFirstTower('bg-red-800')
        setActiveSecondTower('bg-gray-600')
        setActiveThirdTower('bg-emerald-500')
        determineDiskAnima(tower.firstTower)
        setMovingDisk(null)
        break
      case tower.secondTower:
        setActiveFirstTower('bg-red-600')
        setActiveSecondTower('bg-gray-800')
        setActiveThirdTower('bg-emerald-500')
        determineDiskAnima(tower.secondTower)
        setMovingDisk(null)
        break
      case tower.thirdTower:
        setActiveFirstTower('bg-red-600')
        setActiveSecondTower('bg-gray-600')
        setActiveThirdTower('bg-emerald-700')
        determineDiskAnima(tower.thirdTower)
        setMovingDisk(null)
        break
    }
    if(value.length == 0){
      setNoticeBoard("Invalid Move!!!")
      new Audio(wrongSound).play()
      return
    }
    console.log("from raw:", value)
    setFromVar(value)
    console.log("from altered:",fromVar, "\n")
  }

  const changeToVar = (value) => {
    switch(value){
      case tower.firstTower:
        setActiveFirstTower2('bg-red-800')
        setActiveSecondTower2('bg-gray-600')
        setActiveThirdTower2('bg-emerald-500')
        break
      case tower.secondTower:
        setActiveFirstTower2('bg-red-600')
        setActiveSecondTower2('bg-gray-800')
        setActiveThirdTower2('bg-emerald-500')
        break
      case tower.thirdTower:
        setActiveFirstTower2('bg-red-600')
        setActiveSecondTower2('bg-gray-600')
        setActiveThirdTower2('bg-emerald-700')
        break
    }
    console.log("to raw:", value)
    setToVar(value)
    console.log("to altered:",toVar, "\n")
  }

  const [noticeBoard, setNoticeBoard] = useState("Welcome to Towers of Hanoi!!!")
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    if(tower.thirdTower.length == 5){
      setNoticeBoard("Congratulations!!! You have won!!!")
      setResetLabel("Play Again")
      setDiskAAnimaState('running')
      setDiskBAnimaState('running')
      setDiskCAnimaState('running')
      setDiskDAnimaState('running')
      setDiskEAnimaState('running')
      new Audio(winSound).play()
    }
  }, [tower.thirdTower])

  useEffect(() => {
    if(moves == 0){
      setNoticeBoard("Welcome to Towers of Hanoi!!!")
      setResetLabel("Reset")
      setDiskAAnimaState('paused')
      setDiskBAnimaState('paused')
      setDiskCAnimaState('paused')
      setDiskDAnimaState('paused')
      setDiskEAnimaState('paused')
    }
  }, [tower.moveDisk])

  const [activeFirstTower, setActiveFirstTower] = useState('bg-red-600')
  const [activeSecondTower, setActiveSecondTower] = useState('bg-gray-600')
  const [activeThirdTower, setActiveThirdTower] = useState('bg-emerald-500')
  const [activeFirstTower2, setActiveFirstTower2] = useState('bg-red-600')
  const [activeSecondTower2, setActiveSecondTower2] = useState('bg-gray-600')
  const [activeThirdTower2, setActiveThirdTower2] = useState('bg-emerald-500')
  const [diskAAnimaState, setDiskAAnimaState] = useState('paused')
  const [diskBAnimaState, setDiskBAnimaState] = useState('paused')
  const [diskCAnimaState, setDiskCAnimaState] = useState('paused')
  const [diskDAnimaState, setDiskDAnimaState] = useState('paused')
  const [diskEAnimaState, setDiskEAnimaState] = useState('paused')
  const [movingDisk, setMovingDisk] = useState(null)

  const determineDiskAnima = (disk) => {
    switch(disk[disk.length-1]){
      case "A":
        setDiskAAnimaState('running')
        setDiskBAnimaState('paused')
        setDiskCAnimaState('paused')
        setDiskDAnimaState('paused')
        setDiskEAnimaState('paused')
        break
      case "B":
        setDiskBAnimaState('running')
        setDiskAAnimaState('paused')
        setDiskCAnimaState('paused')
        setDiskDAnimaState('paused')
        setDiskEAnimaState('paused')
        break
      case "C":
        setDiskCAnimaState('running')
        setDiskAAnimaState('paused')
        setDiskBAnimaState('paused')
        setDiskDAnimaState('paused')
        setDiskEAnimaState('paused')
        break
      case "D":
        setDiskDAnimaState('running')
        setDiskAAnimaState('paused')
        setDiskBAnimaState('paused')
        setDiskCAnimaState('paused')
        setDiskEAnimaState('paused')
        break
      case "E":
        setDiskEAnimaState('running')
        setDiskAAnimaState('paused')
        setDiskBAnimaState('paused')
        setDiskCAnimaState('paused')
        setDiskDAnimaState('paused')
        break
    }
  }

  const DiskA = () => {
    return (
      <>
        <div className='h-[15%] w-[86%] bg-[#313130] mx-auto' style={{ boxShadow: "12px 0px #313130, -12px 0px #313130, -6px 6px #313130, 6px 6px #313130, 6px -6px #313130, -6px -6px #313130, 0px 11px #313130, 0px -11px #313130", animation: `blink 0.5s infinite ${diskAAnimaState}${movingDisk === "A" ? ", fall 0.5s ease-out" : ""}`,
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }}
          }}>
        </div>
      </>
    ) 
  }

  const DiskB = () => {
    return (
      <>
        <div className='h-[15%] w-[76%] bg-[#313130] mx-auto' style={{ boxShadow: "12px 0px #313130, -12px 0px #313130, -6px 6px #313130, 6px 6px #313130, 6px -6px #313130, -6px -6px #313130, 0px 11px #313130, 0px -11px #313130", animation: `blink 0.5s infinite ${diskBAnimaState}${movingDisk === "B" ? ", fall 0.5s ease-out" : ""}`,
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }}
          }}>
        </div>
      </>
    ) 
  }

  const DiskC = () => {
    return (
      <>
        <div className='h-[15%] w-[66%] bg-[#313130] mx-auto' style={{ boxShadow: "12px 0px #313130, -12px 0px #313130, -6px 6px #313130, 6px 6px #313130, 6px -6px #313130, -6px -6px #313130, 0px 11px #313130, 0px -11px #313130", animation: `blink 0.5s infinite ${diskCAnimaState}${movingDisk === "C" ? ", fall 0.5s ease-out" : ""}`,
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }}
          }}>
        </div>
      </>
    ) 
  }

  const DiskD = () => {
    return (
      <>
        <div className='h-[15%] w-[56%] bg-[#313130] mx-auto' style={{ boxShadow: "12px 0px #313130, -12px 0px #313130, -6px 6px #313130, 6px 6px #313130, 6px -6px #313130, -6px -6px #313130, 0px 11px #313130, 0px -11px #313130", animation: `blink 0.5s infinite ${diskDAnimaState}${movingDisk === "D" ? ", fall 0.5s ease-out" : ""}`,
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }}
          }}>
        </div>
      </>
    ) 
  }

  const DiskE = () => {
    return (
      <>
        <div className='h-[15%] w-[46%] bg-[#313130] mx-auto' style={{ boxShadow: "12px 0px #313130, -12px 0px #313130, -6px 6px #313130, 6px 6px #313130, 6px -6px #313130, -6px -6px #313130, 0px 11px #313130, 0px -11px #313130", animation: `blink 0.5s infinite ${diskEAnimaState}${movingDisk === "E" ? ", fall 0.5s ease-out" : ""}`,
            '@keyframes blink': {
              '0%, 100%': { opacity: 1 },
              '50%': { opacity: 0 }}
          }}>
        </div>
      </>
    ) 
  }

  const [resetLabel, setResetLabel] = useState("Reset")

  const resetGame = () => {
    const newTower = new TowersOfHanoi();
    setTower(newTower)
    setMoves(0)
    setFromVar(null)
    setToVar(null)
    setNoticeBoard("Welcome to Towers of Hanoi!!!")
    setDiskAAnimaState('paused')
    setDiskBAnimaState('paused')
    setDiskCAnimaState('paused')
    setDiskDAnimaState('paused')
    setDiskEAnimaState('paused')
    setActiveFirstTower('bg-red-600')
    setActiveSecondTower('bg-gray-600')
    setActiveThirdTower('bg-emerald-500')
    setActiveFirstTower2('bg-red-600')
    setActiveSecondTower2('bg-gray-600')
    setActiveThirdTower2('bg-emerald-500')
    setMovingDisk(null)
  }

  return (
    <>
      <style>
        {`
          @keyframes fall {
            0% { transform: translateY(-100%); opacity: 1; }
            100% { transform: translateY(0); opacity: 1; }
          }
        `}
      </style>

      {/* PARENT */}
      <div className='h-full w-full flex flex-col md:flex-row bg-[#d2cfca]'>
        {/* LEFT */}
        <div className=' flex justify-center items-center bg-[#C1BEB9] md:border-r-4 lg:border-r-4 sm:max-md:border-b-4 border-[#d2cfca] h-[70%] lg:h-full md:h-full w-full place-content-center flex-shrink-0 lg:max-w-[70%] md:max-w-[70%]'>
          <div className='h-[95%] w-[95%] bg-[#899d58] flex snes-blockquote'>
            <div className='w-full h-full gap-1 flex flex-row justify-between bg-[#384849]'>
              <div className='w-full h-full pr-5 md:pr-7 lg:pr-10 flex items-center flex-col bg-[#899d58] justify-end gap-8 lg:gap-6'> <FirstTower/> </div>
              <div className='w-full h-full  px-5 md:pl-7 lg:px-10  flex items-center flex-col bg-[#899d58] justify-end gap-8 lg:gap-6'> <SecondTower/> </div>
              <div className='w-full h-full pl-5 md:pl-7 lg:pl-10 flex items-center flex-col bg-[#899d58] justify-end gap-8 lg:gap-6'> <ThirdTower/> </div>
            </div>
          </div>
        {/* LEFT */}
        </div>
        {/* RIGHT */} 
        <div className=' bg-[#C1BEB9] h-full w-full p-5 flex flex-col gap-1 justify-between flex-shrink-0 lg:max-w-[30%] md:max-w-[30%]'>
          <div className='w-full h-[30%] bg-[#899d58] p-2 snes-blockquote text-[#52686A] place-content-center text-lg'>{noticeBoard}</div>
          <p className='text-white'>Moves:</p>
          <div className='w-full h-[11%] flex justify-evenly gap-6'>
            <div className='w-[60%] h-full bg-[#899d58] p-2 snes-blockquote text-[#52686A] text-base flex justify-center items-center '>{moves}</div>
            <button className=' bg-[#807B81] snes-button w-[40%] h-full focus:outline-none hover:bg-[#a39ca4] text-white text-base flex justify-center md:text-sm' onClick={ () => resetGame()}>{resetLabel}</button>
          </div>
          <p className='text-white'>From:</p> 
          <div className='w-full h-[11%] flex p-1 gap-5 justify-evenly'>
            <button  className={`${activeFirstTower} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-red-400 text-white flex justify-center`} onClick={ () => changeFromVar(tower.firstTower)}>1</button>
            <button  className={`${activeSecondTower} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-gray-400 text-white flex justify-center`} onClick={ () => changeFromVar(tower.secondTower)}>2</button>  
            <button  className={`${activeThirdTower} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-emerald-400 text-white flex justify-center`} onClick={ () => changeFromVar(tower.thirdTower)}>3</button>  
          </div>  
          <p className='text-white'>To:</p>
          <div className='w-full h-[11%] flex p-1 gap-5 justify-evenly'>
            <button  className={`${activeFirstTower2} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-red-400 text-white flex justify-center`} onClick={ () => changeToVar(tower.firstTower)}>1</button>
            <button  className={`${activeSecondTower2} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-gray-400 text-white flex justify-center`} onClick={ () => changeToVar(tower.secondTower)}>2</button>
            <button  className={`${activeThirdTower2} w-full md:max-lg:w-[18%] snes-button focus:outline-none hover:bg-emerald-400 text-white flex justify-center`} onClick={ () => changeToVar(tower.thirdTower)}>3</button>
          </div>  
          <div className='w-full h-[11%] p-2 margin-top-2'>  
            <button className='flex justify-center items-center bg-[#807B81] w-full h-full snes-button focus:outline-none hover:bg-[#a39ca4] text-white' onClick={ () => confirmAction(fromVar, toVar)}>Confirm</button>
          </div>
        {/* RIGHT */}
        </div>
      </div>
    </>
  )
}

export default TowerOfHanoi;