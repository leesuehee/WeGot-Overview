import React from 'react';
import axios from 'axios';
import BasicDetails from './BasicDetails.jsx';
import DividerLine from './WeGotDividerLine.jsx';
import WeGotReview from './WeGotReview.jsx';
import LongDescription from './LongDescription.jsx';

export default class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      renderBool: false,
      restaurantTitle: 'Title Placeholder',
      restaurantTagline: 'Tagline Placeholder',
      restaurantType: 'Restaurant',
      restaurantVicinity: 'Vicinity Placeholder',
      restaurantPriceLevel: 'Price Level Placeholder',
      weGotFoodRating: '3.3',
      weGotDecorRating: '3.3',
      weGotServiceRating: '3.3',
      restaurantDescription: 'Description Placeholder',
    };
  };

  componentDidMount() {
    this.fetchRestaurantInfo();
  }

  fetchRestaurantInfo () {
    let context = this;
    // let id = window.location.href.split('/')[4];
    let id = this.props.id || window.location.href.split('/')[4]; 
    axios.get(`/api/restaurants/${id}/overview`)
      .then((response) => {

        this.handleRestaurantChange(response.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleRestaurantChange(restaurantDetails) {
    this.setState({
      renderBool: true,
      restaurantTitle: restaurantDetails.title,
      restaurantTagline: restaurantDetails.tagline,
      restaurantVicinity: restaurantDetails.vicinity,
      restaurantPriceLevel: restaurantDetails.pricelevel,
      weGotFoodRating: restaurantDetails.zagatfood,
      weGotDecorRating: restaurantDetails.zagatdecor,
      weGotServiceRating: restaurantDetails.zagatservice,
      restaurantDescription: restaurantDetails.longdescription,
    });
  }

  render() {
    if (this.state.renderBool) {
      return (
        <div id="overview-wrapper">
          <div id="overview-restaurant-title">{this.state.restaurantTitle}</div>
          <div id="overview-restaurant-tagline">{this.state.restaurantTagline}</div>
          <BasicDetails
            type={this.state.restaurantType}
            vicinity={this.state.restaurantVicinity}
            priceLevel={this.state.restaurantPriceLevel}
          />
          <DividerLine />
          <div className="overview-wegot-review-title">THE WEGOT REVIEW</div>
          <WeGotReview
            food={this.state.weGotFoodRating}
            decor={this.state.weGotDecorRating}
            service={this.state.weGotServiceRating}
          />
          <LongDescription
            description={this.state.restaurantDescription}
          />
        </div>
      );
    }
    return <div>Loading Restaurant Info...</div>;
  }
};

// export default Overview;
