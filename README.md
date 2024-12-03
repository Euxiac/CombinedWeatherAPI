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
