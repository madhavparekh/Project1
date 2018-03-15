import { Component } from 'react';
import {
    parseMeetup,
    MeetUpCategories,
  } from '../api/MeetUpAPI';
import PropTypes from 'prop-types';

const propTypes = {
    search: PropTypes.object,
    getMeetUps: PropTypes.func,
    geocoder: PropTypes.object
}

export default class MeetUp extends Component{
    didSearchChange(s1, s2){
        if(s1.loc !== s2.loc || s1.rad !== s2.rad || s1.cat !== s2.cat)
            return true;
        else
            return false
    }
    fetchData(){
        const {search} = this.props;
        const location = search.loc;
        const radius = search.rad;
        const category = search.cat;
        var circleOptions = null;
        var meetupArray = null;
        this.props.geocoder.geocode({address: location}, (results, status) => {
          if(status === 'OK'){
            var lat = results[0].geometry.location.lat();
            var lng = results[0].geometry.location.lng();
            var circleOptions = {
                center: {
                    lat: lat,
                    lng: lng
                },
                radius: radius
              };
            MeetUpCategories[category].updateParam({
              lat: lat,
              lon: lng,
              radius: radius
            });
            MeetUpCategories[category].fetchP(data=>{
              meetupArray = parseMeetup(data.data);
              this.props.getMeetUps(status, circleOptions, meetupArray);
            });
          }
          else{
            this.props.getMeetUps(status, null, null);
          }
        });
    }
    componentDidUpdate(prevProps, prevState){
        if(this.props.search.update){
            this.fetchData();
        }
    }
    componentDidMount(){
        if(this.props.search.update){
            this.fetchData();
        }
    }
    render(){
        return null;
    }
}

MeetUp.propTypes = propTypes;