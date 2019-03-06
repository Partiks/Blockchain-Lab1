import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Item from './models/item';
import User from './models/user';

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
	Item.find((err, items) => {
		if (err)
			console.log(err);
		else
			res.json(items);
	});
});

router.route('/items/:id').get((req, res) => {
	Item.findById(req.params.id, (err, item) => {
		if (err)
			console.log(err);
		else
			res.json(item);
	});
})

router.route('/items/add').post( (req, res) => {
	let item = new Item(req.body);
	item.save()
		.then(item => {
			res.status(200).json({'item' : 'Added sucessfully to marketplace'});
		})
		.catch(err => {
			res.status(400).send('Failed to add item to marketplace')
		});
})

router.route('/items/update/:id').post( (req, res) => {
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

			item.save().then(item => {
				res.json('Updated the item listing');
			}).catch(err => {
				res.status(400).send(err);
			});
		}
	})
})

router.route('/items/delete/:id').get( (req, res) => {
	Item.findByIdAndRemove({_id: req.params.id}, (err, item) => {
		if(err)
			res.json(err);
		else
			res.json('Deletion successful');
	})
})


router.route('/users').get((req, res) => {
	User.find((err, users) => {
		if (err)
			console.log(err);
		else
			res.json(users);
	});
});

router.route('/users/:username').get((req, res) => {
	console.log("NODEJS SERVERSIDE FINDING USERNAME");
	User.findOne({username: req.params.username}, (err, user) => {
		if (err)
			console.log(err);
		else
			res.json(user);
	});
})

router.route('/users/:username/items').get( (req,res) => {
	console.log("USER ITEMS REACHED");
	User.findOne({username: req.params.username}, (err, user) => {
		if (err)
			console.log(err);
		else{
			var u_str = JSON.stringify(user);
			var objectValue = JSON.parse(u_str);
			var u_items = objectValue["u_items"];
			console.log("USER ITEMS SERVER.JS");
			console.log(u_items);
			res.json(u_items);
		}
	});
})

router.route('/users/add').post( (req, res) => {
	let user = new User(req.body);
	user.save()
		.then(user => {
			res.status(200).json({'user' : 'Added sucessfully to marketplace'});
		})
		.catch(err => {
			res.status(400).send('Failed to add user to marketplace database')
		});
})

router.route('/users/update/:username').post( (req, res) => {
	User.findOne({username: req.params.username}, (err, user) =>{
		if(!user)
			return next(new Error('Could not load user'));
		else
		{
			user.username = req.body.username;
			user.password = req.body.password;
			user.balance = req.body.balance;
			user.u_items = req.body.u_items;

			user.save().then(user => {
				res.json('Updated the user information');
			}).catch(err => {
				res.status(400).send(err);
			});
		}
	})
})

router.route('/users/delete/:username').get( (req, res) => {
	User.findByOneAndRemove({username: req.params.username}, (err, user) => {
		if(err)
			res.json(err);
		else
			res.json('Deletion successful');
	})
})




app.use('/', router);


app.listen(4000, () => console.log('Express server running on port 4000'));