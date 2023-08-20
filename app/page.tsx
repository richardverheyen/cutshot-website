import Image from 'next/image'
import Hero from "./hero";
import About from "./about";
import Contact from "./contact";

export default function Home() {
  return (
    <main className="">
      <Hero />
      <About />
      <Contact />
    </main>
  )
}
