const {insertData} = require('../DataBase/configDB.js');

// const createTable = () => {

// 	db.exec("CREATE TABLE Pessoa (id INTEGER PRIMARY KEY, name TEXT)");
// 	db.close
// }

const insertTable = () => {
	insertData("Pessoa", "name", "Heloisa");
}

module.exports = {insertTable};