import DarkSkyApi from 'dark-sky-api';
import moment from 'moment';

var key1 = '14b5a5c2f280fc478f8ba68d62362efd';

var key2 = '52d1ed03a42fafea9dc3e1605f11ac05';

var position = {
  latitude: 38.3350887,
  longitude: -121.9302447,
};
var params = {
  eventDate: moment('2018-03-15', 'YYYY-MM-DD'),
  eventStartTime: moment('2018-03-15 15:00', 'YYYY-MM-DD HH:MM'),
  eventEndTime: moment('2018-03-15 18:00', 'YYYY-MM-DD HH:MM'),
};

export function getWeatherData(meet) {
  // console.log(meet);
  //if weather data exsists

  return new Promise((resolve, reject) => {
    if (meet.weather) {
      resolve(meet);
    } else {
      var pos = {
        latitude: meet.lat,
        longitude: meet.lng,
      };
      var time = moment(meet.start);
      var eventStartTime = meet.start / 1000;
      var eventEndTime = eventStartTime + meet.duration / 1000;
      // console.log(`${time}   ${eventStartTime}   ${eventEndTime}`);

      //switching keys
      DarkSkyApi.apiKey = key2;

      if (meet.start) {
        DarkSkyApi.loadTime(time, pos).then((data) => {
          // console.log(data);
          var weather = {
            highTemp: parseFloat(data.daily.data[0].temperatureHigh).toFixed(2),
            lowTemp: parseFloat(data.daily.data[0].temperatureLow).toFixed(2),
            summary: data.daily.data[0].summary,
            icon: data.daily.data[0].icon,
            windSpeed: parseFloat(data.daily.data[0].windSpeed).toFixed(2),
          };
          var secInHr = 60 * 60;
          var hourBeforeStart = eventStartTime - secInHr;
          var hourAfterEnd = eventEndTime + secInHr;

          if (meet.duration) {
            var hourly = [];
            data.hourly.data.forEach((e) => {
              if (e.time >= hourBeforeStart && e.time < hourAfterEnd) {
                var hrWeather = [];
                hrWeather.push({
                  time: e.time,
                  temp: parseFloat(e.temperature).toFixed(2),
                  summary: e.summary,
                  icon: e.icon,
                  windSpeed: parseFloat(e.windSpeed).toFixed(2),
                });
                hourly.push(hrWeather);
              }
            });
            weather.hourly = hourly;
          }
          // console.log(weather);
          //   return array;
          meet.weather = weather;
          // console.log(meet);
          resolve(meet);
        });
      }
    }
  });
}
