import Navbar from './components/Navbar';
import ImageAndWelcome from './components/ImageAndWelcome';
import CityList from './components/CityList';
import { Component } from 'react';
import SearchCity from './components/SearchCity';

class App extends Component{
  constructor() {
    super();
    this.state = {
      keyword: ""
    };
  }
  changeKeywordHandler = (event) => {
    this.setState({ keyword: event.target.value });
  };
  render() {
    const citiesDummy = [
      { id: 74, name: 'Jakarta', country_name: 'Indonesia' },
      { id: 11052, name: 'Bandung', country_name: 'Indonesia' },
      { id: 170, name: 'Bali', country_name: 'Indonesia' },
    ];
  
    return (
      <>
        <Navbar />
        <ImageAndWelcome />
        {/* start of container */}
        <div className="container" style={{ marginTop: 30, marginBottom: 30 }}>
          <CityList title={'Featured Cities'} cities={citiesDummy} />
  
          {/* start of search section */}
          <SearchCity 
            value={this.state.keyword}
            onChange={this.changeKeywordHandler}
            />
          {/* end of search section */}
          <CityList title={'Search Result'} cities={citiesDummy} />
        </div> 
        {/* end of container */}
      </>
    );
  }
}
export default App;
