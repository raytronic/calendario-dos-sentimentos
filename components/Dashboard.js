'use client'

import React, { useEffect, useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Calendar from './Calendar'
import { useAuth } from '@/context/AuthContext'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import Login from './Login'
import Loading from './Loading'





const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' })

export default function Dashboard() {
  const {currentUser,userDataObj,setUserDataObj, loading} = useAuth()
  const [data, setData] = useState({})
  const now = new Date()

  const calculateValues = ()=>{
    let  total_number_of_days = 0 
    let  sum_moods = 0
    for (let year in data ){
      for (let month in data[year]){
        for (let day in data[year][month]){
          let days_mood = data[year][month][day]
          total_number_of_days++
          sum_moods += days_mood
        }
      }
    }
    return{num_days: total_number_of_days, average_mood:sum_moods/total_number_of_days}
  }


  const statuses = {
    ...calculateValues(),
    
    time_remaining: `${23-now.getHours()}H ${60-now.getMinutes()}M`
  }

  const  handleSetMood = async(mood)=>{

    
    const day = now.getDate()
    const month = now.getMonth() 
    const year = now.getFullYear()

    try{
      const newData = {...userDataObj}
      if (!newData?.[year]){
        newData[year] = {}
      }
  
      if (!newData?.[year]?.[month]){
        newData[year][month] = {}
      }
      newData[year][month][day] = mood
      setData(newData)
      setUserDataObj(newData)
      const docRef = doc(db,'users', currentUser.uid)
      const res = await setDoc(docRef,{
        [year]:{
          [month]:{
            [day]:mood
          }
        }
      }, {merge: true})
      //update global state
      //update firebase
      //update local State

    }catch(err){
      console.log(err.message)
    }

  }

  
  const moods = {
    '#%!': '🤬',
    'Triste': '😢',
    'A existir': '😶',
    'Contente': '😊',
    'Apaixonad@': '😍'
  }


  useEffect(() => {
    if (!currentUser || !userDataObj){
      return
    }
    setData(userDataObj)
  
  }, [currentUser,userDataObj])
  


        if (loading){
          return <Loading />
        }

        if (!currentUser){
          return <Login/>
        }

  return (
    <div className='flex flex-col flex-1 lg:gap-8 sm:gap-12 md:gap-16'>
      <div className='grid bg-indigo-50 grid-cols-3 rounded-lg'>

      {Object.keys(statuses).map((status,statusIndex)=>{
        return(
          <div className='p-4 flex flex-col gap-1 sm:gap-2' key={statusIndex}>
            <p className='font-medium capitalize text-xs sm:text-sm truncate'>{status.replaceAll('_', ' ')}</p>
            <p className={'text-indigo-500 text-base sm:text-lg truncate ' + fugaz.className}>{statuses[status]}</p>
          </div>
        )
      })}
      </div>
      <h4 className={'lg:text-3xl sm:text-4xl md:text-5xl text-center ' + fugaz.className}>Como te sentes <span className='text-indigo-500'>hoje</span>?</h4>
      <div className='flex items-stretch flex-wrap gap-4'>
        {Object.keys(moods).map((mood,moodIndex)=>{
          return(
            <button onClick={() =>{
              const currentMoodValue = moodIndex +1
              handleSetMood(currentMoodValue)
            }} className={'p-4 px-5 rounded-lg purpleShadow duration-200 bg-indigo-50 hover:bg-indigo-100 flex-1' } key={moodIndex}>
              <p className='text-5xl mb-3'>{moods[mood]}</p>
              <p className={'text-indigo-500 text-sm ' + fugaz.className}>{mood}</p>
            </button>
          )
        })}
      </div>
      <Calendar completeData = {data} handleSetMood={handleSetMood}></Calendar>
      
    </div>
  )
}
