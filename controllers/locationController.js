import * as locationService from "../services/locationService.js";
import { fetchCoordinatesReturn } from "./apiController.js";
import axios from "axios";

export const fetchAllCountries = async (req, res) => {
  try {
    const data = await locationService.getAllCountries();

    const transformedCountryData = data.map((country, index) => {
      return {
        id: (index + 1).toString(), // Creating an ID starting from 1
        country: country.country_name,
        code: country.iso3, // Using iso3 as the code
        states: [], // Empty array for states
      };
    });
    res.json({ transformedCountryData });
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const fetchAllCountriesFormatted = async (req, res) => {
  try {
    const data = await locationService.getAllCountries();

    const transformedCountryData = data.map((country, index) => {
      return {
        id: (index + 1).toString(), // Creating an ID starting from 1
        country: country.country_name,
        code: country.iso3, // Using iso3 as the code
        states: [], // Empty array for states
      };
    });
    return transformedCountryData;
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const fetchAllStates = async (req, res) => {
  try {
    const data = await locationService.getAllStates();
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const fetchStatesByCountry = async (req, res) => {
  try {
    const country = req.params.country;
    const stateData = await locationService.getStatesByCountry(country);

    const transformedStateData = stateData.map((state, index) => {
      return {
        id: (index + 1).toString(), // Creating an ID starting from 1
        state: state.state_name,
        cities: [], // Empty array for states
      };
    });
    //return transformedStateData;
    res.json({ transformedStateData });
  } catch (error) {
    res
      .status(500)
      .json({ message: `error fetching state by country : ${error.message}` });
  }
};

export const fetchStatesByCountryFormatted = async (country) => {
  try {
    const stateData = await locationService.getStatesByCountry(country);

    const transformedStateData = stateData.map((state, index) => {
      return {
        id: (index + 1).toString(), // Creating an ID starting from 1
        state: state.state_name,
        cities: [], // Empty array for states
      };
    });
    return transformedStateData;
    //res.json({transformedStateData});
  } catch (error) {
    res
      .status(500)
      .json({ message: `error fetching state by country : ${error.message}` });
  }
};

export const fetchAllCities = async (req, res) => {
  try {
    const limit = req.params.limit;
    const page = req.params.page;
    const data = await locationService.getAllCities(limit, page);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const fetchCitiesByState = async (req, res) => {
  try {
    const country = req.params.country;
    const state = req.params.state;
    const limit = req.params.limit;
    const page = req.params.page;
    const data = await locationService.getCitiesByState(
      country,
      state,
      limit,
      page
    );
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const fetchCitiesByStateFormatted = async (country, state) => {
  try {
    const data = await locationService.getCitiesByState(country, state);

    const transformedCityData = data.map((city, index) => {
      return {
        id: index + 1,
        city: city.city_name,
      };
    });

    return transformedCityData;
  } catch (error) {
    message: `error ${error.message}`;
  }
};

export const fetchFromQuery = async (req, res) => {
  try {
    console.log("---------------------------------LAT LON EMPTY");
    const country = req.params.country;
    const state = req.params.state;
    const city = req.params.city;

    const data = await locationService.getFromQuery(country, state, city);

    //Checks if the DB contains lat and lon for entry and fills the entry if not
    if (data[0].lat === null || data[0].lon === null) {
      console.log("---------------------------------LAT LON EMPTY");
      const coordsData = await fetchCoordinatesReturn(country, state, city);
      //send the right data anyway
      data[0].lat = coordsData[0].lat;
      data[0].lon = coordsData[0].lon;

      //calls the update entry route to update the entry
      const apiURL = `http://localhost:8000/database/entries/update-city`;
      // The data (body parameters) to send in the POST request
      const bodyParams = {
        city_name: city,
        country_iso3: country,
        state_name: state,
        lat: `${coordsData[0].lat}`,
        lon: `${coordsData[0].lon}`,
      };
      console.log(bodyParams);

      // Sending the POST request with body parameters
      try {
        const apiResponse = await axios.post(apiURL, bodyParams, {
          headers: {
            'X-Internal-Request': 'true',  // Custom header to indicate internal request
            'Content-Type': 'application/json', // Ensure the body is sent as JSON
          }
        });
        //console.log(apiResponse.data); // handle the response here
      } catch (error) {
        console.error("Error updating city:");
      }
    }

    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: `test ${error.message}` });
  }
};

export const convert = async (req, res) => {
  try {
    const operation = req.params.operation;
    const query = req.params.query;

    const data = await locationService.convertCountry(operation, query);
    res.json({ data });
  } catch (error) {
    res.status(500).json({ message: `error ${error.message}` });
  }
};

export const fetchLocationData = async (req, res) => {
  try {
    const countryData = await fetchAllCountriesFormatted();
    for (let coi = 0; coi < countryData.length; coi++) {
      const stateData = await fetchStatesByCountryFormatted(
        countryData[coi].country
      );
      countryData[coi].states = stateData;
    }
    for (let i = 0; i < countryData.length; i++) {
      //console.log("country" + i);
      for (let i2 = 0; i2 < countryData[i].states.length; i2++) {
        const country = countryData[i].country;
        const state = countryData[i].states[i2].state;
        //console.log(i2 + " " + country + " " + state);
        const cityData = await fetchCitiesByStateFormatted(country, state);
        //console.log(cityData);
        countryData[i].states[i2].cities = cityData;
      }
    }

    res.json({ countryData });
  } catch (error) {
    res
      .status(500)
      .json({ message: `error fetch by country ${error.message}` });
  }
};
