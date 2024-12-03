import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const password = process.env.DATABASE_PASSWORD;
const sequelize = new Sequelize("geolocation_database", "root", password, {
  host: "localhost",
  dialect: "mysql",
});

(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connected to the database');
    }
    catch(error) {
        console.log('Unabled to connected to database');
    }
  })();

export default sequelize;