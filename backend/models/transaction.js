import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Transaction = new Schema({
	seller:{
		type: String
	},
	buyer:{
		type: String
	},
	item_id:{
		type: String
	},
	item_name:{
		type: String
	},
	item_price:{
		type: String
	},
	date:{
		type: String
	}
});

export default mongoose.model('Transaction', Transaction);