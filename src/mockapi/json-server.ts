import jsonServer from 'json-server';
import db from '../test/mock-api-responses.json' assert { type: 'json' };
import chalk from 'chalk';

const server = jsonServer.create();
const middlewares = jsonServer.defaults();
const port = 6001;

server.use(middlewares);

server.get('/api/projects', (req, res) => {
	res.json(db.overviews);
});

server.get('/api/projects/:id', (req, res) => {
	res.json(db.projects.find(project => project.id === req.params.id));
});

server.get('/api/units/:id', (req, res) => {
	res.json(db.units);
});

server.listen(port, () => {
	console.log(chalk.magenta('------------------------------------'));
	console.log(chalk.magenta(`Mock REST API is running at http://localhost:${port}`));
	console.log(chalk.magenta('------------------------------------'));
});
