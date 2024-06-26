import React, {useEffect, useState} from 'react'
import { auth } from '../firebase/firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'

export const AuthDetails = () => {
    const [authUser, setAuthUser] = useState(null)

    useEffect(() =>{
        const listen = onAuthStateChanged(auth, (user) => {
            if (user) {
                setAuthUser(user)
            } else {
                setAuthUser(null)
            }
        });
            return () => {
                listen();
            }
    }, []);

    const userSignOut = () => {
        signOut(auth).then(() => {
            console.log('sign out succesful')
        }).catch(error => console,log(error))
    }
  return (
    <div>
        {
            authUser ? 
            <>
                <p>{`Signed In as ${authUser.email}`}</p>
                <button onClick={userSignOut} className="flex mr-auto text-white bg-black border-0 py-1 px-3 focus:outline-none hover:bg-indigo-600 rounded">Sign Out</button>
            </> : <p>Not signed</p>
        }
    </div>
  )
}

export default AuthDetails