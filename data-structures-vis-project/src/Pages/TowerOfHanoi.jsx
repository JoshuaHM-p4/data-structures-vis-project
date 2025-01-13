import React, { useEffect, useState } from 'react';
import MarioBlock from '../components/MarioComponent/MarioBlocks.jsx';
import { use } from 'react';

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

    isFinished(){
        if(this.thirdTower == this.initialValues){
            return true
        }
    }
        
  }

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
        return <div>5</div>
      case "B":
        return <div>4</div>
      case "C":
        return <div>3</div>
      case "D":
        return <div>2</div>
      case "E":
        return <div>1</div>
    }
  }

  const confirmAction = (from, to) => {
    console.log("confirmAction")
    console.log("from raw:", from)
    console.log("to raw:", to)
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
    }
  }

  const changeFromVar = (value) => {
    if(value.length == 0){
      setNoticeBoard("Invalid Move!!!")
      return
    }
    console.log("from raw:", value)
    setFromVar(value)
    console.log("from altered:",fromVar, "\n")
  }

  const changeToVar = (value) => {
    console.log("to raw:", value)
    setToVar(value)
    console.log("to altered:",toVar, "\n")
  }

  const [noticeBoard, setNoticeBoard] = useState("Welcome to Towers of Hanoi!!!")
  const [moves, setMoves] = useState(0)

  useEffect(() => {
    if(tower.thirdTower.length == 5){
      setNoticeBoard("Congratulations!!! You have won!!!")
      const newTower = new TowersOfHanoi();
      setTower(newTower)
      setMoves(0)
    }
  }, [tower.thirdTower])

  useEffect(() => {
    if(moves == 1){
      setNoticeBoard("Welcome to Towers of Hanoi!!!")
    }
  }, [tower.moveDisk])

  return (
    <>
      {/* PARENT */}
      <div className='h-full w-full flex flex-col md:flex-row'>
        {/* LEFT */}
        <div className='bg-red-500 h-full w-full place-content-center flex-shrink-0 lg:max-w-[70%] md:max-w-[70%] aspect-video'>
          <div className='h-[97%] w-[97%] bg-blue-500 mx-auto flex'>
            <div className='w-1/3 h-full bg-yellow-400 flex flex-col'> <FirstTower/> </div>
            <div className='w-1/3 h-full bg-pink-500 flex flex-col'> <SecondTower/> </div>
            <div className='w-1/3 h-full bg-slate-300 flex flex-col'> <ThirdTower/> </div>
          </div>
        {/* LEFT */}
        </div>
        {/* RIGHT */}
        <div className='bg-white h-full w-full hover:bg-green-400 p-5 flex flex-col gap-1 justify-between flex-shrink-0 lg:max-w-[30%] md:max-w-[30%]'>
          <div className='w-full h-[30%] bg-violet-500'>{noticeBoard}</div>
          <p className=''>Moves:</p>
          <div className='w-full h-[11%] bg-cyan-500'>{moves}</div>
          <p className=''>From:</p> 
          <div className='w-full h-[11%] bg-purple-600 flex p-1 gap-2 justify-evenly'>
            <button  className='bg-red-700 w-full' onClick={ () => changeFromVar(tower.firstTower)}>1</button>
            <button  className='bg-gray-500 w-full' onClick={ () => changeFromVar(tower.secondTower)}>2</button>  
            <button  className='bg-emerald-400 w-full' onClick={ () => changeFromVar(tower.thirdTower)}>3</button>
          </div>  
          <p className=''>To:</p>
          <div className='w-full h-[11%] bg-orange-600 flex p-1 gap-2 justify-evenly'>
            <button  className='bg-red-700 w-full' onClick={ () => changeToVar(tower.firstTower)}>1b</button>
            <button  className='bg-gray-500 w-full' onClick={ () => changeToVar(tower.secondTower)}>2</button>
            <button  className='bg-emerald-400 w-full' onClick={ () => changeToVar(tower.thirdTower)}>3</button>
          </div>
          <div className='w-full h-[11%] bg-black'>
            <button className='w-full h-full nes-btn' onClick={ () => confirmAction(fromVar, toVar)}>Confirm</button>
          </div>
        {/* RIGHT */}
        </div>
      </div>
    </>
  )
}

export default TowerOfHanoi;