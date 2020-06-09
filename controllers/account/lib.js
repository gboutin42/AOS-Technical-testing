const User = require("../../schema/userTest.js");
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config');

async function login(req, res) {
	const { password, email } = req.body;
	if (!email || !password) {
	//Le cas où l'email ou bien le password ne serait pas soumit ou nul
		return res.status(400).json({
			text: "Requête invalide"
		});
	}
	try {
		//connection a la BDD
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
				//on recherche si l'email et le password existe dans la BDD
				collection.findOne({email: email, password: password}, (err, items)=>{
					if (err) throw err;
					// l'email ou le password est incorrect, renvoi d'un code et message d'erreur
					if (!items) {
						console.log('Email or password incorrect.');
						res.status(401).json({
							error: "Email or password incorrect."
						});
					}
					//sinon renvoi d'un code de réussite
					else {
						console.log('Authentification reussis.');
						res.status(200).json({
								text: "Authentification réussi."
							});
					}
					client.close();
				});
			});
		} catch (error) {
			console.log(error);
			return res.status(500).json({
				error
			});
	}
}

//On exporte login
exports.login = login;
