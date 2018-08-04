import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class Vets extends Component {
  constructor(props) {
    super(props);
    this.getVetsId = this.getVetsId.bind(this);
    this.state = {
      vets: []
    };
  }

  componentDidMount() {
    this.getVetsId();
  }

  getVetsId() {
    const { mapEl } = this.refs;
    const google = window.google;

    if (mapEl) {
      var pyrmont = new google.maps.LatLng(49.2812, -123.114843);

      const map = new google.maps.Map(mapEl, {
        center: pyrmont,
        zoom: 15
      });

      var request = {
        location: pyrmont,
        radius: "1000",
        keyword: "veterinarian"
      };

      const service = new google.maps.places.PlacesService(map);
      service.nearbySearch(request, (results, status) => {
        var request2 = {
          placeId: results[0].place_id,
          fields: ["name", "rating", "formatted_phone_number", "geometry"]
        };

        const service2 = new google.maps.places.PlacesService(map);
        service2.getDetails(request2, (results2, status) => {
          this.setState({ vets: results2 });
          console.log("Result of Vets2 from Google Places Api:", results2);
          console.log("Coordinates1", this.state.vets.geometry.location.lat() )
          console.log("Coordinates1", this.state.vets.geometry.location.lng() )
          console.log("Coordinates2", this.state.vets.geometry)
        });
      });
    }
  }
  
  render() {
    return (
      <div>
        <h1> Nearby Vets. </h1>
        <p>Name: {this.state.vets.name} </p>
        <a href="tel:+1(778)995-2295"> {this.state.vets.formatted_phone_number} </a>
        <p>Rating: {this.state.vets.rating} </p>
        <div ref="mapEl" />
        <img src="https://maps.googleapis.com/maps/api/staticmap?center=49.2812,-123.114843&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:A%7C49.276331,-123.1143591&key=AIzaSyBzUa58duivm90HMoCzjaj02ow0krsvkn8"/>
      </div>
    );
  }
}

export default Vets;