import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
//material theme
import BeastTheme from '../style/BeastTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { relative } from 'path';

const style = {
  height: 70,
  width: 50,
  margin: 1,
  marginBottom: 3,
  padding: 2,
  textAlign: 'center',
  display: 'inline-block',
};

const styleP = {
  margin: 1,
  fontSize: 9,
};

export default class InfoDisplay extends Component {
  _renderWeather(props) {
    return (
      <div className="dayWeather">
        <Paper style={style} zDepth={2}>
          <img
            src={require(`../img/Weather/${props.icon}-icon.png`)}
            alt={props.icon}
            width="75%"
          />
          <p style={styleP}>H {props.highTemp} &deg;F</p>
          <p style={styleP}>L {props.lowTemp} &deg;F</p>
          <p style={styleP}>W {props.windSpeed}</p>
        </Paper>
        {props.hourly &&
          props.hourly.map((val) => {
              return this._renderHourlyWeather(val);
          })}
      </div>
    );
  }

  _renderHourlyWeather(val) {
    var hour = moment(val[0].time * 1000).get('hour');

    if (hour == 0) hour = '12:00 AM';
    else if (hour == 12) hour = '12:00 PM';
    else if (hour < 12) hour = hour + ':00 AM';
    else hour = hour % 12 + ':00 PM';

    return (
      <Paper style={style} zDepth={2} key={val[0].time}>
        <p style={styleP}>{hour}</p>
        <img
          src={require(`../img/Weather/${val[0].icon}-icon.png`)}
          alt={val[0].icon}
          width="75%"
        />
        <p style={styleP}>{val[0].temp} &deg;F</p>
        <p style={styleP}>W {val[0].windSpeed}</p>
      </Paper>
    );
  }

  render() {
    // console.log('rendered info');
    var date = new Date(this.props.event.start);
    const collapseStlye = {
      maxHeight: '30vh',
      maxWidth: '30vw',
      overflow: 'hidden',
      position: 'relative',
    };
    const expandStlye = {
      maxHeight: '60vh',
      maxWidth: '60vw',
      overflowY: 'auto',
      overflowX: 'auto',
      position: 'relative',
    };
    // const click = {
    //   color: '#777',
    //   cursor: 'pointer',
    // };
    const container = {
      paddingTop: '14px',
      position: 'sticky',
      bottom: '0',
      background:
        'linear-gradient(rgba(255,255,255,0), rgba(255,255,255,1), rgba(255,255,255,1))',
    };
    return (
      <div style={{maxHeight:370, maxWidth:350}}>
      <h2>{this.props.event.name}</h2>

      <h3>Start time: {date.toLocaleString()}
      {this.props.canLike ? (
            <div>
            <span>Likes:</span>
            <span> {this.props.eventLikes}</span>
            <img src={require('../img/like/like.png')} style ={{height:'1em', cursor: 'pointer',marginLeft:'0.5em'}} id="like"/>
            </div>
          ) : (
            <div styles={{marginLeft: 20}}>
            <span>Likes:</span>
            <span> {this.props.eventLikes}</span>
            </div>
          )}
      </h3>
      
      {this.props.event.weather && <MuiThemeProvider muiTheme={getMuiTheme(BeastTheme)}>
          {this._renderWeather(this.props.event.weather)}
        </MuiThemeProvider>}
        {/* <div>{this._renderHourlyWeather(this.props.event.weather)}</div> */}
        <a href={this.props.event.link}>Learn More</a>
      </div>
    );
  }
}
