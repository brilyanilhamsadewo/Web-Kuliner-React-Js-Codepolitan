// import logo from './logo.svg';
// import './App.css';

import mainImage from "./assets/images/aneka-makanan.png";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
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
    </>
  );
}

export default App;
