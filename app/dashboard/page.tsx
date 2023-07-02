'use client'
import Image from 'next/image'
import { viewModel } from './viewModel'

export default function Home() {
  const {sayHello} = viewModel()
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Ini Dashboard Page</h1>
      <button onClick={sayHello}>Say Hello</button>
    </main>
  )
}
