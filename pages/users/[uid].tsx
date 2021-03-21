import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { User } from '../../models/User'
import firebase from 'firebase/app'

type Query = {
    uid: string
}

export default function UserShow() {
    const [user, setUser] = useState<User>(null)
    const router = useRouter()
    const query = router.query as Query

    useEffect(() => {
        async function loadUser() {
            const doc = await firebase
                .firestore()
                .collection('users')
                .doc(query.uid)
                .get()

            if (!doc.exists) {
                return
            }

            const gotUser = doc.data() as User
            gotUser.uid = doc.id
            setUser(gotUser)
        }
        loadUser()
    }, [query.uid])

    return (
        <div>
            <nav
                className="navbar navbar-expand-lg navbar-light mb-3"
                style={{ backgroundColor: '#e3f2fd' }}
            >
                <div className="container">
                    <div className="mr-auto">
                        <a className="navbar-brand" href="#">
                            Navbar
                        </a>
                    </div>
                    <form className="d-flex">
                        <button className="btn btn-outline-primary" type="submit">
                            Search
                        </button>
                    </form>
                </div>
            </nav>
            <div className="container">
                <div>{user ? user.name : 'ロード中…'}</div>
                <button className="btn btn-primary">ボタン</button>
            </div>
        </div>
    )
}