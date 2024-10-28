'use client'

import { signInWithEmailAndPassword,createUserWithEmailAndPassword,signOut, onAuthStateChanged } from 'firebase/auth'
import { auth, db } from '@/firebase'
import React, { useEffect, useState, useContext } from 'react'
import { doc, getDoc } from 'firebase/firestore'


const AuthContext = React.createContext()

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const [currentUser,setCurrentUser] = useState(null)
    const [userDataObj,setUserDataObj] = useState(null)
    const [loading,setLoading] = useState(true)

    //auth handlers
    function signup(email,password){
        return createUserWithEmailAndPassword(auth, email, password)
    }

    function login(email,password){
        return signInWithEmailAndPassword(auth, email, password)
    }


    function logout(){
        setUserDataObj(null)
        setCurrentUser(null)
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async user=>{
            try{
                setLoading(true)
                setCurrentUser(user)
                if(!user){
                    console.log('no user found')
                    return
                }
                console.log('fetching user data')
                const docRef = doc(db, 'users', user.uid)
                const docSnap = await getDoc(docRef)
                let firebaseData = {}
                if (docSnap.exists()){
                    console.log('found user data')
                    firebaseData = docSnap.data()
                    console.log(firebaseData)
                }

                setUserDataObj(firebaseData)

            }catch(err){
                console.log(err.message)
            }finally{
                setLoading(false)
            }

        })
        return unsubscribe
    },[])

    const value = {
        currentUser,
        userDataObj,
        signup,
        login,
        logout,
        loading,
        setUserDataObj,
    }

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}