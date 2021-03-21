import { useEffect } from 'react'
import { User } from '../models/User'
import { atom, useRecoilState } from 'recoil'
import firebase from 'firebase/app'

const userState = atom<User>({
    key: 'user',
    default: null,
})

export function useAuthentication() {
    const [user, setUser] = useRecoilState(userState)
    console.log('Start useEffect')

    useEffect(() => {
        if (user !== null) {
            return
        }

        firebase
            .auth()
            .signInAnonymously()
            .catch(function (error) {
                // Handle Errors here.
                console.error(error)
            })

        firebase.auth().onAuthStateChanged(function (firebaseUser) {
            if (firebaseUser) {
                console.log('Set user')
                const loginUser: User = {
                    uid: firebaseUser.uid,
                    isAnonymous: firebaseUser.isAnonymous,
                    name: '',
                }
                setUser(loginUser)
                createUserIfNotFound(loginUser)
            } else {
                // User is signed out.
                setUser(null)
            }
        })
    }, [])

    return { user }
}

async function createUserIfNotFound(user: User) {
    const userRef = firebase.firestore().collection('users').doc(user.uid)
    const doc = await userRef.get()
    if (doc.exists) {
        // 書き込みの方が高いので！
        return
    }

    await userRef.set({
        name: 'taro' + new Date().getTime(),
    })
}
