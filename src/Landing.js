import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SearchBar from "./Components/SearchBar";
import { categories } from "./api/MeetUpAPI";
import GoogleMap from "./Components/GoogleMap";
import queryString from "query-string";
import Nav from "./Components/NavBar";

//Theme and styling
import BeastTheme from "./style/BeastTheme";
import NewZIndex from "./style/NewZIndex";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import "./style/App.css";
import { CSSTransitionGroup } from "react-transition-group"; // ES6//entering animation
import  {stylePaper, styleContainer} from './style/LandingPageTheme'

export default class Landing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: {
        city: "",
        radius: 1,
        category: 0,
      },
      searchError: "",
      redirect: {
        yes: false,
        pathname: "/project1/search",
        search: "",
      },
    };
    this.callBack = this.callBack.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onCategoryChange = this.onCategoryChange.bind(this);
    this.onRadiusChange = this.onRadiusChange.bind(this);
    this.setPlace = this.setPlace.bind(this);
    this.createServices = this.createServices.bind(this);
  }
  callBack() {
    var searchQuery = {
      loc: this.state.search.city,
      rad: this.state.search.radius,
      cat: this.state.search.category,
    };
    var qstr = queryString.stringify(searchQuery);
    this.geocoder.geocode({ address: searchQuery.loc }, (results, status) => {
      if (status === "OK") {
        this.setState({
          redirect: {
            yes: true,
            pathname: "/project1/search",
            search: qstr,
          },
        });
      } else {
        this.setState({ searchError: status });
      }
    });
  }
  onSearchChange(event) {
    this.setState({
      search: {
        city: event.target.value,
        radius: this.state.search.radius,
        category: this.state.search.category,
      },
    });
  }
  onCategoryChange(event, index, value) {
    this.setState({
      search: {
        city: this.state.search.city,
        radius: this.state.search.radius,
        category: value,
      },
    });
  }
  onRadiusChange(event, index, value) {
    this.setState({
      search: {
        city: this.state.search.city,
        radius: value,
        category: this.state.search.category,
      },
    });
  }
  setPlace() {
    if (this.autoComplete.getPlace().formatted_address) {
      this.setState({
        search: {
          city: this.autoComplete.getPlace().formatted_address,
          radius: this.state.search.radius,
          category: this.state.search.category,
        },
      });
    }
  }
  createServices(mapProps, map) {
    const { google } = mapProps;
    this.google = google;
    this.map = map;
    this.autoComplete = new google.maps.places.Autocomplete(
      document.getElementById("citySearchField")
    );
    this.autoComplete.addListener("place_changed", this.setPlace);
    this.geocoder = new google.maps.Geocoder();
  }
  render() {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(BeastTheme)}>
          <Nav className="navBar" />
        </MuiThemeProvider>
        <GoogleMap createServices={this.createServices} visible={false} />
        <MuiThemeProvider muiTheme={getMuiTheme(BeastTheme, NewZIndex)}>
          <SearchBar
            callback={this.callBack}
            onSearchChange={this.onSearchChange}
            onCategoryChange={this.onCategoryChange}
            onRadiusChange={this.onRadiusChange}
            search={this.state.search}
            searchError={this.state.searchError}
            categories={categories}
          />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={getMuiTheme(BeastTheme)}>
          <BannerCard />
        </MuiThemeProvider>

        {this.state.redirect.yes && <Redirect push to={this.state.redirect} />}
      </div>
    );
  }
}
