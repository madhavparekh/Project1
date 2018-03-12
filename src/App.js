import React, { Component } from "react";
import "./App.css";
// import Map from './Components/Map'
import GoogleMap from "./Components/GoogleMap";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Nav from "./Components/nav.jsx";
import BottomNav from "./Components/bottomNav.jsx";
import SideBar from "./Components/sideBar.jsx";
import EventCard from "./Components/EventCard.jsx";
import ToggleEventCard from "./Components/ToggleEventCard.jsx";
import AboutUsIcon from "./Components/AboutUs.jsx";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentSelection: {
        name: "",
        id: "",
      },
      markers: [],
    };
    this.getClick = this.getClick.bind(this);
    this.onClick = this.onClick.bind(this);
    this.setMarker = this.setMarker.bind(this);
  }
  getClick(selection) {
    this.setState({
      currentSelection: {
        name: selection.name,
        id: selection.id,
      },
    });
  }
  setMarker(marker) {
    this.setState({
      markers: marker.markers,
    });
  }
  onClick(event) {
    var markers = this.state.markers;
    markers.splice(this.state.currentSelection.id, 1);
    this.setState({
      markers: markers,
      currentSelection: {
        name: "",
        id: "",
      },
    });
  }
  render() {
    const style = {
      width: "500px",
      height: "500px",
      zIndex: -1,
    };
    return (
      <div className="App">
        {/* Navigation bar from nav.js */}
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <Nav />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <AboutUsIcon />
        </MuiThemeProvider>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <ToggleEventCard />
        </MuiThemeProvider>

        <div id="container" style={style}>
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <SideBar>
              <MuiThemeProvider muiTheme={getMuiTheme()}>
                <EventCard />
              </MuiThemeProvider>
            </SideBar>
          </MuiThemeProvider>

          <GoogleMap
            getClick={this.getClick}
            setMarker={this.setMarker}
            markers={this.state.markers}
          />
        </div>
        <div>Current Selection: {this.state.currentSelection.name}</div>
        {this.state.currentSelection.name !== "" && (
          <a onClick={this.onClick} href="#">
            Delete Marker
          </a>
        )}

        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <BottomNav />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
