import styles from '../styles/Home.module.css'
import { useAuthentication } from '../hooks/authentication'
import Link from 'next/link'

export default function Home() {
  const { user } = useAuthentication()

  return (
    <div className={styles.container}>
        <Link href="page2">
            <a>Go to page2</a>
        </Link>
        <p>{user?.uid || '未ログイン'}</p>
    </div>
  )
}
