import Navbar from './components/Navbar';
import { Component } from 'react';
import Footer from './components/Footer/Footer';
import Home from './pages/Home'

class App extends Component{
  
  render() {
    
  
    return (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    );
  }
}
export default App;
