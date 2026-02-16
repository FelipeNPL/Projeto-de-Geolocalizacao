import Banner from './components/Banner'
import Footer from './components/Footer'
import Header from './components/Header'
import Navbar from './components/Navbar'
import Reviews from './components/Reviews'
import Services from './components/Services'
import Team from './components/Team'
import useGeolocation from './hooks/useGeolocation'

function App() {

//armazenamos as coordinadas do hook personalizado
//usamos um destrturamento '{ coordinates }'
const { coordinates, permission } = useGeolocation()

  return (
    <> 
    <pre> {/* mostrando valor das coordenadas */} 
      { JSON.stringify(coordinates) }
    </pre>
    <pre>
      {permission} {/* como já é uma string nao precisamos do stringify */} 
    </pre>
      <Header>
        <Navbar />
        <Banner />
      </Header>
      <Services />
      <Team />
      <Reviews />
      <Footer />
    </>
  )
}

export default App
