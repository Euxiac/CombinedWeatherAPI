import express from 'express';
import * as apiController from '../controllers/apiController.js';
import { authenticateToken } from '../controllers/authController.js';

const router = express.Router();

// Define the POST route
router.post('/fetch-states/:country', apiController.fetchStatesInCountry);

router.post('/fetch-cities/:country/:state', apiController.fetchCitiesInState);

router.get('/fetch-coordinates/:country/:state/:city', apiController.fetchCoordinates);

router.get('/fetch-weather/current/:lat,:lon', apiController.fetchCurrentWeather);

router.get('/fetch-weather/coming-week/:lat,:lon', apiController.fetchComingWeek);

router.get('/fetch-time/:lat,:lon', apiController.fetchCurrentTime);

export default router;