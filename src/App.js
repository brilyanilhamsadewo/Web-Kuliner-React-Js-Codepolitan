import mainImage from "./assets/images/aneka-makanan.png";
import CityCard from "./components/CityCard";

function App() {

  const citiesDummy = [
    { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
    { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
    { id: 170, name: 'Bali', country_name: 'Indonesia' },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary sticky-top">
        <a className="navbar-brand text-white" href="/">FoodParadise</a>
      </nav>

      <div className="row" style={{ marginBottom: 30}}>
        <img src={mainImage} width="100%" alt="Aneka Makanan" />
      </div>

      <div className="row">
        <div className="col">
          <div className="card text-white bg-success mb-3 text-center">
            <div className="card-header"><h1>Welcome to FoodParadise</h1></div>
            <div className="card-body">
              <h4 className="card-title">The Easiest Way to Find Restaurants and Food</h4>
              <p className="card-text">You can grab information about restaurants, cafees, cuisines with just a few clicks.</p>
              <p className="card-text">Start by choosing the featured cities below, or search the city name.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
          <div className="row">
              <div className="col-12">
              <h3>Featured Cities</h3>
              </div>
          </div>
          <div className="row">
              {citiesDummy.map(city =>
                <CityCard key={city.id} city={city} />
              )}
          </div>
      </div>
    </>
  );
}

export default App;
