import Navbar from './components/Navbar';
import ImageAndWelcome from './components/ImageAndWelcome';
import FeaturedCities from './components/FeaturedCities';

function App() {

  const citiesDummy = [
    { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
    { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
    { id: 170, name: 'Bali', country_name: 'Indonesia' },
  ];

  return (
    <>
      <Navbar />

      <ImageAndWelcome />  

      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
        <FeaturedCities cities={citiesDummy} />
      </div>
    </>
  );
}

export default App;
