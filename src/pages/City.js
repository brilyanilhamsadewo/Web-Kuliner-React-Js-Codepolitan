import React, { Component } from 'react';
import axios from 'axios';
import { API } from '../config/api';
import CategoryList from '../components/CategoryList'
import SearchKeyword from '../components/SearchKeyword'

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
            this.setState({ categorySelected: category })
        }

        changeKeywordHandler = (event) => {
            this.setState({ keyword: event.target.value });
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
                />

                <div className="card bg-light mb-3" style={{ marginTop: 20 }}>
                    <div className="card-body">
                        <p className="card-title">Find Restaurants based on criteria : </p>
                        <table className="table table-hover">
                            <tbody>
                                {this.state.criteria.map((cri, index) => (
                                    <tr key={index} className="table-active">
                                        <td width="40%">{cri.criteriaName}</td>
                                        <td width="50%">{cri.data.name}</td>
                                        <td>
                                            <i
                                                className="fa fa-times"
                                                aria-hidden="true"
                                                style={{ color: 'red' }}
                                            >
                                            </i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="pull-right">
                            <button
                                className="btn btn-primary"
                                type="button"
                            >
                                Search
                            </button>
                        </div>

                    </div>
                </div>
            </div>      
            </div>
        </div>
    )
  }
}

export default City