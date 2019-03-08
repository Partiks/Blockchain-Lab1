import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Item = new Schema({
	name:{
		type: String
	},
	owner:{
		type: String
	},
	description: {
		type: String
	},
	price: {
		type: Number,
		default: 0
	},
	status: {
		type: String,
		default: "Available"
	}
});

export default mongoose.model('Item', Item);