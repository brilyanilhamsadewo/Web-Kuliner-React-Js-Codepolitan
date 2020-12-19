import React, { Component } from 'react';
import axios from 'axios';
import { API } from '../config/api';
import CategoryList from '../components/CategoryList'
import SearchKeyword from '../components/SearchKeyword'
import SearchCriteria from '../components/SearchCriteria'
import { Link } from 'react-router-dom' 

const restaurants = [
    {
      "restaurant": {
        "id": "18875696",
        "name": "Kintaro Sushi",
        "location": {
          "address": "Jl. Suryo No. 20, Senopati, Jakarta",
          "locality": "Senopati",
        },
        "cuisines": "Sushi, Japanese",
        "average_cost_for_two": 200000,
        "currency": "IDR",
        "thumb": "https://b.zmtcdn.com/data/pictures/chains/5/18530405/0feeddcbe877a8e27526a8cf5b501edf.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "user_rating": {
          "aggregate_rating": "4.9",
          "rating_text": "Excellent",
          "rating_color": "3F7E00",
          "votes": "1358"
        },
      }
    },
    {
      "restaurant": {
        "id": "18875696",
        "name": "Kintaro Sushi",
        "location": {
          "address": "Jl. Suryo No. 20, Senopati, Jakarta",
          "locality": "Senopati",
        },
        "cuisines": "Sushi, Japanese",
        "average_cost_for_two": 200000,
        "currency": "IDR",
        "thumb": "https://b.zmtcdn.com/data/pictures/chains/5/18530405/0feeddcbe877a8e27526a8cf5b501edf.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
        "user_rating": {
          "aggregate_rating": "4.9",
          "rating_text": "Excellent",
          "rating_color": "3F7E00",
          "votes": "1358"
        },
      }
    }
]

const categoriesDummy = [
    {
      "categories": {
        "id": 1,
        "name": "Delivery"
      }
    },
    {
      "categories": {
        "id": 2,
        "name": "Dine-out"
      }
    },
    {
      "categories": {
        "id": 3,
        "name": "Nightlife"
      }
    },
    {
      "categories": {
        "id": 4,
        "name": "Catching-up"
      }
    }
  ]

class City extends Component {
    constructor() {
        super()
        this.state = {
            city: null,
            categories: null,
            categorySelected: null,
            keyword: '',
            criteria: [],
        }
    }

    transformCategoriesData(categories) {
        let categoriesTransformed = categories.map(category => { 
          return category.categories
        })
    
        return categoriesTransformed
    };

    getCityData = (city_id) => {
        let url = `${API.zomato.baseUrl}/cities`
        axios.get(url, {
          headers: {
            'user-key': API.zomato.api_key
          },
          params: {
            city_ids: `${city_id}`
          }
        })
        .then(({ data }) => {
            let city = data.location_suggestions[0]
            let newCriteria = {
                criteriaName: 'City',
                data: city
            }
            let criteria = [...this.state.criteria]
            criteria.push(newCriteria)
            this.setState({ city, criteria })
        })
          .catch(err => console.log(err))
      }

      componentDidMount () {
        // cara mendapatkan parameter city_id dari url / route
        let { city_id } = this.props.match.params
        this.getCityData(city_id)

        let categories = this.transformCategoriesData(categoriesDummy)
        this.setState({ categories });
        }

        categoryClickHandler = (category) => {
            let criteria = [...this.state.criteria]
            // ambil element array selain element dengan criteriaName 'Category' 
            criteria = criteria.filter(cri => cri.criteriaName !== 'Category')
            let newCriteria = {
              criteriaName: 'Category',
              data: category
            }
            criteria.push(newCriteria)
            this.setState({ categorySelected: category, criteria })
        }

        changeKeywordHandler = (event) => {
            this.setState({ keyword: event.target.value });
        }

        addToCriteriaHandler = () => {
            let criteria = [...this.state.criteria]
            criteria = criteria.filter(cri => cri.criteriaName !== 'Keyword')
            let newCriteria = {
              criteriaName  : 'Keyword',
              data          : {
                name: this.state.keyword
              }
            }
        
            criteria.push(newCriteria)
            this.setState({ keyword: '', criteria })
        }

        removeCriteriaHandler = (index) => {
            let criteria = [...this.state.criteria]
            criteria.splice(index, 1)
            this.setState({ criteria })
        }
    

  render(){
    return (
        <div className="container-fluid" style={{ marginTop: 30, marginBottom: 30 }}>
            { this.state.city && (
                <div className="row">
                    <div className="col">
                        <h4 className="text-success">
                        Restaurant in { this.state.city.name }, { this.state.city.country_name }
                        </h4>
                    </div>
                </div>
            )}

            <div className="row">
                <div className="col-3">
                <h5>Categories</h5>
                <CategoryList 
                    categories={this.state.categories}
                    categorySelected={this.state.categorySelected}
                    categoryClickHandler={(category) => this.categoryClickHandler(category)}
                />
                </div>
                <div className="col">
                <SearchKeyword
                    keyword={this.state.keyword}
                    changeKeywordHandler={this.changeKeywordHandler}
                    onClickAddToCriteria={this.addToCriteriaHandler}
                />

                <SearchCriteria 
                    criteria={this.state.criteria}
                    removeCriteriaHandler={(index) => this.removeCriteriaHandler(index)}
                />

                <div className="row">
                    <div className="col" style={{ marginBottom: 10 }}>
                        <h4 className="text-success">Restaurant List</h4>
                    </div>
                </div>
                <div className="row">
                {
                restaurants.map(({ restaurant }) => (
                    <div className="col-6" style={{ marginBottom: 20 }}>
                    <div className="card">
                        <div className="card-header">
                        <div className="row">
                            <div className="col-3">
                            <img className="img-responsive" src={restaurant.thumb} alt="" style={{ borderRadius: 5, width: 100 }} ></img>
                            </div>
                            <div className="col-9">
                            <h4 className="text-success" style={{ fontWeight: 800 }}>{restaurant.name}</h4>
                            <h6>{restaurant.location.locality}</h6>
                            <h6 className="text-muted">{restaurant.location.address}</h6>
                            </div>
                        </div>
                        </div>
                        <div className="card-body">
                        <table className="table">
                            <tbody>
                            <tr>
                                <td>Rating</td>
                                <td>
                                <div className="btn btn-sm"
                                    style={{
                                    color: 'white',
                                    backgroundColor: `#${restaurant.user_rating.rating_color}`,
                                    borderColor: `#${restaurant.user_rating.rating_color}`,
                                    }}
                                >
                                    {`${restaurant.user_rating.aggregate_rating} (${restaurant.user_rating.rating_text})`}
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td>Cuisines</td>
                                <td>
                                {restaurant.cuisines}
                                </td>
                            </tr>
                            <tr>
                                <td>Cost for two</td>
                                <td>
                                {restaurant.currency + ' ' + restaurant.average_cost_for_two}
                                </td>
                            </tr>
                            </tbody>
                        </table>

                        </div>
                        <div className="card-footer">
                        <Link to={`/restaurant/${restaurant.id}`} style={{ textDecoration: 'none' }}>
                            <button type="button" className="btn btn-outline-success btn-block">
                            View Restaurant Details
                            </button>
                        </Link>
                        </div>
                    </div>
                    </div>
                ))
            }
                </div>
            </div>      
            </div>
        </div>
    )
  }
}

export default City