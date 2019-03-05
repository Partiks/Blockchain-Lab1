import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import Item from './models/item'

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

app.use('/', router);


app.listen(4000, () => console.log('Express server running on port 4000'));