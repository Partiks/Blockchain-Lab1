import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
	username:{
		type: String
	},
	password:{
		type: String
	},
	u_items:{
		type: Array
	},
	balance:{
		type: Number
	}
});

export default mongoose.model('User', User);