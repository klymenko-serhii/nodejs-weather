const YQL = require('yql');

module.exports = {
  getCitiesWeather
}

function getCitiesWeather(cities) {
  return new Promise((resolve, reject) => {
    let citiesStr = "";
    for (let i = 0; i < cities.length; i++) {
      citiesStr += `"${cities[i]}"${i < cities.length - 1 ? "," : ""}`
    }
    const query = new YQL(`select * from weather.forecast where woeid in (select woeid from geo.places(1) where text IN (${citiesStr}))`);
    query.exec(function(err, data) {
      if (err) {
        console.log(err);
        reject(err);
      }
      resolve(data.query.results);
    });
  });
}