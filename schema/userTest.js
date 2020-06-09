const MongoClient = require("mongodb").MongoClient;
const config = require("../config/config");

//connection a la BDD
MongoClient.connect(config.db.host, {
	useNewUrlParser: true,
	useUnifiedTopology: true
	}, (err, client)=> {
		if (err) {
			console.log(err);
			return;
		}
		// création de la BDD vierge
		const db = client.db(config.db.name);
		// création de la collection vierge
		const collection = db.collection(config.db.collection);
		// recherche de l'utilisateur test
		collection.findOne({email: 'mon_mail@test.com'}, (err, items) => {
			// si il n'y en a pas, on le crée
			if (!items) {
				collection.insertOne({email: 'mon_mail@test.com', password: 'abc123!'}, (err, result)=> {
					console.log('User test created:\n\temail: mon_mail@test.com\n\tpassword: abc123!');
				});
			} else {
				console.log('User test already exist.');
			}
		});
});

// export de la création de la BDD
module.exports = MongoClient;