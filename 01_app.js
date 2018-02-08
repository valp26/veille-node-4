const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/html/01_form.html', function (req, res) {
 console.log(__dirname);
 res.sendFile( __dirname + "/" + "01_form.html" );
})

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

const transforme_en_tableau = (collection) => (
	let html = "<head><meta charset='utf-8'><link rel='stylesheet' type='text/css' href='../css/style.css'></head><body><h1>Liste des membres - Exercice 4</h1><table><tr><th>Prénom</th><th>Nom</th><th>Courriel</th><th>Téléphone</th></tr></table></body>"
)

app.get('/traiter_get', function (req, res) {
	 // Preparer l'output en format JSON

	console.log('la route /traiter_get')

	// on utilise l'objet req.query pour récupérer les données GET
	 let reponse = {
	 prenom:req.query.prenom,
	 nom:req.query.nom,
	 courriel:req.query.courriel,
	 telephone:req.query.telephone
	 };
	console.log(reponse);

	const fs = require('fs');

	fs.appendFile('unfichier.txt', ',', function (err) {
	  if (err) throw err;
	  console.log('Sauvegardé');
	});

	 res.end(JSON.stringify(reponse));
})

app.get('/membres', function (req, res) {
	fs.readFile('public/data/membres.txt' 'utf8', function (err, data) {
		if (err) throw err;
		let collection = JSON.parse('[' +data+ ']');

		res.end(transforme_en_tableau(collection))
	});
})

var server = app.listen(8081, function () {
 var host = server.address().address
 var port = server.address().port
 
 console.log("Exemple l'application écoute sur http://%s:%s", host, port)

})