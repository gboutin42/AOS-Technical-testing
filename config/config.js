module.exports = {
    "secret" : "mediumMernAppCreation"
}

const config = {};
config.db = {};
config.db.host = "mongodb://localhost:27017";
config.db.name = "db";
config.db.collection = "users";

module.exports = config;