'use client'
import React, { useState } from 'react'
import { Fugaz_One } from 'next/font/google'
import Button from './Button'
import { useAuth } from '@/context/AuthContext'
const fugaz = Fugaz_One({ subsets: ['latin'], weight: '400' })


export default function Login() {
  const [email, setEmail] = useState('') 
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [authenticating,setAuthenticating] = useState(false)

  const {signup, login} = useAuth()


async function handleSubmit(){

    if (!email || !password || password.length < 6){
      
      return
    }

    setAuthenticating(true)

    try{
      if (isRegister){
        console.log('Signing up a new user')
        await signup(email, password)
      }else{
        console.log('logging in a user')
        await login(email, password)
      }

    }catch(e){

      console.log('Error:', e.message)
      return
    } finally {
      setAuthenticating(false)
    }

}


  return (
    <div className='flex flex-col flex-1 justify-center items-center gap-4'>
      <h3 className={'lg:text-4xl md:text-6xl sm:text-5xl ' + fugaz.className}>{isRegister? 'Entrar':'Criar conta'}</h3>
      <p>Só mais um passo!</p>
      <input value={email} onChange={(e) =>{
        setEmail(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 outline-none rounded-full focus:border-indigo-600 duration-200 hover:shadow-lg' placeholder='E-mail'/>
      <input value={password} onChange={(e) =>{
        setPassword(e.target.value)
      }} className='w-full max-w-[400px] mx-auto px-4 py-2 sm:py-3 border border-solid border-indigo-400 outline-none rounded-full focus:border-indigo-600 duration-200 hover:shadow-lg' placeholder='Password' type='password'/>
      <div className='max-w-[400px] w-full mx-auto'>

      <Button clickHandler={handleSubmit} text={isRegister ? 'Entrar' : 'Criar Conta'} full></Button>
      </div>
      <p className='text-center'>{isRegister ?'Ainda não tens conta? -->' : 'Já tens conta? -->'} <button onClick={()=> setIsRegister(!isRegister)} className='text-indigo-500'>{isRegister ? 'Regista-te aqui' : 'Entrar'}</button></p>
    </div>
  )
}
