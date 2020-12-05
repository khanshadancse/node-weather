const request = require('postman-request');

const location = (address,locationCb) => {
const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1Ijoic2hhZGFuazciLCJhIjoiY2tocm50ZDM5MTR3dzJ6cDVzcTV5bTR2OCJ9.v81LjlY0xCIhOyOdpnrxTQ`;    
request({url: url, json: true}, (error,response)=> {
    if(error) {
        return locationCb('Please Check your network',undefined)
    }
    if(!response.body.features[0]){
        return locationCb('You are entering wrong city');
    }
    locationCb(undefined,response.body.features[0]);
})
}

module.exports = location;