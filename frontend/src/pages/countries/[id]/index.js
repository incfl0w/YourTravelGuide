import { useRouter } from 'next/router'
import Link from 'next/link'
import React from 'react'
// import Header from '../../../components/header'

export default function PostPage() {
  const router = useRouter()
  const id = router.query.id

  return (
    <>
      {/* <Header /> */}
      <h1>Post: {id}</h1>
      <ul>
        <li>
          <Link href={`/post/${id}/first-comment`}>
            <a>First comment</a>
          </Link>
        </li>
        <li>
          <Link href={`/post/${id}/second-comment`}>
            <a>Second comment</a>
          </Link>
        </li>
      </ul>
    </>
  )
}