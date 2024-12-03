import express from 'express';
import * as locationController from '../controllers/locationController.js';

const router = express.Router();

const rootMessage = 'welcome to location api try /countries';

// /location/ will return the root message
router.get('/', (req, res) => {
    res.send(rootMessage);
});

router.get('/countries', locationController.fetchAllCountries);

router.get('/states/all', locationController.fetchAllStates);

router.get('/states/:country', locationController.fetchStatesByCountry);


router.get('/cities/all/limit-:limit/page-:page', locationController.fetchAllCities);

router.get('/cities/:country/:state/limit-:limit/page-:page', locationController.fetchCitiesByState);



router.get('/query/:country/:state/:city', locationController.fetchFromQuery);

router.get('/convert/:operation/:query', locationController.convert); //operation = country_name or _iso3

router.get('/data', locationController.fetchLocationData)

export default router; 