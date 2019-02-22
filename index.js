const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile');

const server = express();

server.use(express.json());
server.use(helmet());

const db = knex(knexConfig.development);

// endpoints here
server.get('/', (req, res) => {
	res.send('Welcome To Zoos');
});

server.get('/api/zoos', (req, res) => {
	db('zoos')
		.then(zoos => {
			res.status(200).json(zoos);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/zoos/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.then(zoo => {
			res.status(200).json(zoo);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/zoos', (req, res) => {
	db('zoos')
		.insert(req.body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/zoos/:id', (req, res) => {
	db('zoos')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/zoos/:id', (req, res) => {
	const updates = req.body;
	db('zoos')
		.where({ id: req.params.id })
		.update(updates)
		.then(zoo => {
			res.status(200).json(zoo);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/bears', (req, res) => {
	db('bears')
		.then(bears => {
			res.status(200).json(bears);
		})
		.catch(err => res.status(500).json(err));
});

server.get('/api/bears/:id', (req, res) => {
	db('bears')
		.where({ id: req.params.id })
		.then(bear => {
			res.status(200).json(bear);
		})
		.catch(err => res.status(500).json(err));
});

server.post('/api/bears', (req, res) => {
	db('bears')
		.insert(req.body)
		.then(ids => {
			res.status(201).json(ids);
		})
		.catch(err => res.status(500).json(err));
});

server.delete('/api/bears/:id', (req, res) => {
	db('bears')
		.where({ id: req.params.id })
		.del()
		.then(id => {
			res.status(200).json(id);
		})
		.catch(err => res.status(500).json(err));
});

server.put('/api/bears/:id', (req, res) => {
	const updates = req.body;
	db('bears')
		.where({ id: req.params.id })
		.update(updates)
		.then(bear => {
			res.status(200).json(bear);
		})
		.catch(err => res.status(500).json(err));
});

const port = 3300;
server.listen(port, function() {
	console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});
