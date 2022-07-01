// const request=require('request')
// const forecast = (lat,long,callback) => {
//     const url='http://api.weatherstack.com/current?access_key=34baab2e9fb55d6aff917ee2dc8fbfe0&query=&api.weatherstack.com/current?access_key=34baab2e9fb55d6aff917ee2dc8fbfe0&query='+lat+','+long+'&units=f'
//     request({url:url, json:true},(error,response) => {
//         if (error) {
//             callback('Unable to connect to forecast service', undefined)
//         } else if(response.body.error) {
//             callback('Unable to get a location',undefined)
//         } else {
//             callback(undefined,response.body.current.weather_descriptions+'. It is currrently '+response.body.current.temperature+' degrees out. It feels like '+response.body.current.feelslike+' degrees out.')
//         }
//     })
// }
// With Object shorthand and destructuring
const request=require('request')
const forecast = (lat,long,callback) => {
    const url='http://api.weatherstack.com/current?access_key=34baab2e9fb55d6aff917ee2dc8fbfe0&query=&api.weatherstack.com/current?access_key=34baab2e9fb55d6aff917ee2dc8fbfe0&query='+lat+','+long+'&units=f'
    request({url, json:true},(error,{body}) => {
        if (error) {
            callback('Unable to connect to forecast service', undefined)
        } else if(body.error) {
            callback('Unable to get a location',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+'. It is currrently '+body.current.temperature+' degrees out. It feels like '+body.current.feelslike+' degrees out.')
        }
    })
}
module.exports=forecast