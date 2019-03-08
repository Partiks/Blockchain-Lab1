import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Item from './models/item';
import User from './models/user';
import Transaction from './models/transaction';

const app = express();
//app.get('/', (req, res) => res.send("Hello from server.js !"));
const router = express.Router();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/items');

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established sucessfully !');
})

// this is one endpoint
router.route('/items').get((req, res) => {
	console.log("/ITEMS CALLED");
	Item.find((err, items) => {
		if (err)
			console.log(err);
		else
			res.json(items);
	});
});

router.route('/items/:id').get((req, res) => {
	console.log("/items/id called");
	Item.findById(req.params.id, (err, item) => {
		if (err)
			console.log(err);
		else
			res.json(item);
	});
});

router.route('/items/add').post( (req, res) => {
	console.log("/items/add called");
	let item = new Item(req.body);
	item.save()
		.then(item => {
			res.status(200).json({'item' : 'Added sucessfully to marketplace'});
		})
		.catch(err => {
			res.status(400).send('Failed to add item to marketplace')
		});
});

router.route('/items/update/:id').post( (req, res) => {
	console.log("/items/update/:id called");
	console.log("Reached Update route in SERVER.js");
	console.log(req);
	Item.findById(req.params.id, (err, item) =>{
		if(!item)
			return next(new Error('Could not load document'));
		else
		{
			item.name = req.body.name;
			item.id = req.body.p_id;
			item.description = req.body.description;
			item.owner = req.body.owner;
			item.price = req.body.price;
			item.status = req.body.status;
			console.log(item);
			item.save().then(item => {
				res.json('Updated the item listing');
			}).catch(err => {
				res.status(400).send(err);
			});
		}
	})
});

router.route('/items/delete/:id').get( (req, res) => {
	console.log("/items/delete/id called");
	Item.findByIdAndRemove({_id: req.params.id}, (err, item) => {
		if(err)
			res.json(err);
		else
			res.json('Deletion successful');
	})
});


router.route('/users').get((req, res) => {
	console.log("/users called");
	User.find((err, users) => {
		if (err)
			console.log(err);
		else
			res.json(users);
	});
});

router.route('/users/:username').get((req, res) => {
	console.log("/users/username called");
	console.log("NODEJS SERVERSIDE FINDING USERNAME");
	User.findOne({username: req.params.username}, (err, user) => {
		if (err)
			console.log(err);
		else
			res.json(user);
	});
});


router.route('/users/add').post( (req, res) => {
	console.log("/users/add called");
	let user = new User(req.body);
	user.save()
		.then(user => {
			res.status(200).json({'user' : 'Added sucessfully to marketplace'});
		})
		.catch(err => {
			res.status(400).send('Failed to add user to marketplace database')
		});
});

router.route('/users/update/:username').post( (req, res) => {
	console.log("/users/update/username called");
	User.findOne({username: req.params.username}, (err, user) =>{
		if(!user){
			console.log("Entered update user error");
			res.status(400).send(err);
			console.log("Exiting update user error");
		}
		else
		{
			user.username = req.body.username;
			user.password = req.body.password;
			user.balance = req.body.balance;

			user.save().then(user => {
				res.json('Updated the user information');
			}).catch(err => {
				res.status(400).send(err);
			});
		}
	})
});

router.route('/users/delete/:username').get( (req, res) => {
	console.log("/users/delete/username called");
	User.findOneAndDelete({username: req.params.username}, (err, user) => {
		if(err)
			res.json(err);
		else
			res.json('User Deletion successful');
	})
});

router.route('/transactions').get( (req, res) => {
	console.log("/transactions called");
	Transaction.find((err, transaction) => {
		if (err)
			console.log(err);
		else
			res.json(transaction);
	});
});

router.route('/transactions/add').post( (req, res) => {
	console.log("/transactions/add called");
	let transaction = new Transaction(req.body);
	transaction.save()
		.then(transaction => {
			res.status(200).json({'transaction' : 'Added sucessfully to marketplace database'});
		})
		.catch(err => {
			res.status(400).send('Failed to add transaction to marketplace database')
		});
});

router.route('/transactions/delete/:id').get( (req, res) => {
	console.log("/transactions/delete/id called");
	Transaction.findByIdAndRemove({_id: req.params.id}, (err, item) => {
		if(err)
			res.json(err);
		else
			res.json('Deletion successful');
	});
});


app.use('/', router);


app.listen(4000, () => console.log('Express server running on port 4000'));