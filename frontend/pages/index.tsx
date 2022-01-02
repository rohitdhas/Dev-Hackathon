import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
// import { useState } from 'react'

const Home: NextPage = () => {
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
      </Head>
      <main className='mt-10 flex'>
        <div className="mx-auto">
          <input className='border-green-500 border-2 p-2 rounded-md focus:border-blue-500 outline-none' type="text" placeholder='message'/>
          <button className='bg-blue-500 text-white font-bold p-2 mx-2 rounded-md hover:bg-blue-600'>Search</button>
        </div>
      </main>
    </div>
  )
}

export default Home;
