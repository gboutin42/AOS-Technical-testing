const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");

MongoClient.connect(config.db.host, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	}, (err, client)=> {
		if (err) {
			console.log(err);
			return;
		}
		const db = client.db(config.db.name);
		const collection = db.collection(config.db.collection);
		collection.findOne({email: 'mon_mail@test.com'}, (err, items) => {
			console.log(items);
			if (!items) {
				collection.insertOne({email: 'mon_mail@test.com', password: 'abc123!'}, (err, result)=> {
					console.log('User test created.');
				});
			} else {
				console.log('User already exist.');
			}
		});
});

module.exports = MongoClient;