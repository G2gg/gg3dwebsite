import React from 'react'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import About from './sections/About'
import Projects from './sections/Projects'
import Contact from './sections/Contact'
import Experience from './sections/Experience'
import Robots_Components from './sections/Robots_Components'
import Social from './sections/Social'

const App = () => {
  return (
    <main className="max-w-7xl mx-auto">
      <Navbar />
      <Hero />
      <About />
      <Robots_Components />
      <Projects />
      <Experience />
      <Social />
      <Contact />
    </main>
  )
}

export default App