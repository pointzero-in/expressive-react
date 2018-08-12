import compression from 'compression';
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import routes from './routes';

import {
	STATIC_PATH, WEB_PORT, MONGO_URI,
} from '../shared/config';
import { isProd } from '../shared/util';

const app = express();

mongoose.Promise = global.Promise;
mongoose.connect(isProd ? MONGO_URI : 'mongodb://localhost:27017/test');

const db = mongoose.connection;
db.on('error', (error) => { console.error('connection unsuccessful', error); });
db.once('open', () => {
	console.log("Connection to DB Successful");
});

app.use(compression());
app.use(STATIC_PATH, express.static('dist'));
app.use(STATIC_PATH, express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "http://localhost:7000");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});
app.use('/api', routes);

app.listen(WEB_PORT, () => {
	// eslint-disable-next-line no-console
	console.log(`Server running on port ${WEB_PORT} ${isProd ? '(production)'
		: '(development).\nKeep "yarn dev:wds" running in an other terminal'}.`);
});
