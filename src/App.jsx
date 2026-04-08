import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductGrid from './components/ProductGrid'
import OurStory from './components/OurStory'
import Footer from './components/Footer'
import FloatingActions from './components/FloatingActions'

export default function App() {
  return (
    <div style={{ background: '#FCFCFC', minHeight: '100vh' }}>
      <Navbar />
      <main>
        <Hero />
        <ProductGrid />
        <OurStory />
      </main>
      <Footer />
      <FloatingActions />
    </div>
  )
}
