# Combined Weather API

Weather.me is a modular, personalizable weather application designed to empower users by giving them full control over their weather dashboard. It allows users to choose what information they want to see and organize it in a way that best suits their needs.  

The application is built with **React** and styled using the **Material UI** library, offering a sleek, seamless design that enhances the user experience. The front end is supported by the **CombinedWeatherAPI** on the back end, which handles the heavy lifting by efficiently retrieving and processing weather data, delivering it to users in a clear and user-friendly format.  

**Combined Weather API** combines the information gathered from several other APIs to output relevant information for the front end. It also accesses and stores country, state and city data into a local database that it self-populates and self-manages.

This repository holds the Back end of Weather.me, the **Combined Weather API**
To view the front end this application supports, visit: [CombinedWeatherAPI](https://github.com/Euxiac/Weather.me).  

---
## How to Get Combined Weather API Running  
This API makes calls to a few different APIs so you will need to get the auth keys for those APIs yourself. You will need keys to access:
[Open Weather API] (https://openweathermap.org/)
[World Time API](https://www.api-ninjas.com/api/worldtime)
As well as a random string containing 128 characters which will be your API_TOKEN.

1. **Download or pull the repository.**  
2. **Install the NPM packages:**  
   ```bash
   npm install
   ```
3. **Create a .env file** at the root directory of the repo that looks like:
   ```bash
    OPEN_WEATHER_KEY= “your weather key”
    WORLD_TIME_KEY= ”your time key”
    API_TOKEN= "your api Token"
   ```
5. **Fill data** with your keys and tokens
6. **Run app using:**
   ```bash
   npm start
   ```
---

## Testing the routes via postman
  I would recommend testing the routes via [postman](https://www.postman.com/) if you do not have access to the **Weather.me** front end. Refer to the route documentation section for more information on individual routes but if you want to access all my testing routes you can do so by importing into the collections section of your postman.
  1. **Set up and open your Postman**
  2. **In the Collections View, click import**
  3. **Grab the postman_collection file** from `/references/weather.me.postman_collection.json`
  4. **Drop it into postman** your collection should populate
  5. **Grab your new authentification token** by running in Postmasn /External API request/getAuth` this should return a random string.
  6. **Go into Authorization in Postman and set up a new bearer token**
     ![3](https://github.com/user-attachments/assets/813e5eee-7b06-42f6-bb9a-e8019f9e2800)

  8. Note that if you set up Authorization on the collection level, it will apply to everything within that collection.

---

## Route Documentation

**getAuth**
- Generates an encryted user token to use as a bearer token to access the API
- Request format: `http://APIAddress/auth/get`
- Example Response:
   ```bash
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJEVUNLIjoiRFVDSyIsImlhdCI6MTczMzI0NDI3NCwiZXhwIjoxNzMzMjYyMjc0fQ.aUunocsI4ZdkP9scn8Tpx2HAj-ckEOy0mwamk6oJ-Rg"
   ```
---

**combinedRequest**
- Returns combined data about a city, including location and coordinate data
- Request format: `http://APIAddress/location/query/<country iso3 code>/<state name>/<city name>`
- Example request: `http:/APIAddress/location/query/aus/western australia/abbey`
- Example response:
   ```bash
      {
          "data": [
              {
                  "city_name": "Abbey",
                  "state_name": "western australia",
                  "country_name": "australia",
                  "iso3": "aus",
                  "lat": "-33.6602000",
                  "lon": "115.2596000"
              }
          ]
      }
   ```
---

**convertCountry**
- Converts country names to iso3 codes and vice versa
- Request format: `http://APIAddress/location/convert/<targetType>/<query>`
- Example Request format: `http://APIAddress/location/convert/iso3/australia`
- Example Response:
   ```bash
      {
          "data": [
              {
               "iso3": "aus"
              }
          ]
      }
   ```
---

## Super list

**External API calls**
- Gets coordinates of location `http://APIAddress/api/fetch-coordinates/<country iso3 code>/<state name>/<city name>`
- Gets the current weather for location `http://APIAddress/api/fetch-weather/current/<latitude>,<longitude>`
- Get the forecast for the coming week for location `http://APIAddress/api/fetch-weather/coming-week/<latitude>,<longitude>`
- Gets the current time for the location `http://APIAddress/api/fetch-time/<latitude>,<longitude>`

**Calls utilising the database**
- Gets all countries database `http://APIAddress/location/countries`
- Gets all states in database `http://APIAddress/location/countries`
- Gets all cities in database `http://APIAddress/location/cities/all/limit-20/page-0`
- Gets the states within a country `http://APIAddress/location/states/<country name>`
- Gets all cities within a state `http://APIAddress/location/cities/<country name>/<state name>/limit-20/page-0`
