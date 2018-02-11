//déclarer l'usage d'express
const express = require('express');
const app = express();
app.use(express.static('public'));
let identifiant = 1;

app.get('/', (req, res) => {
 console.log('accueil')
 res.end('<h1>Accueil</h1>')
})

const transforme_en_tableau = (collection) => {
	let html = "<head><meta charset='utf-8'><link rel='stylesheet' type='text/css' href='../less/style.css'></head><body><h1>Liste des membres - Exercice 4</h1><table><tr><th>Prénom</th><th>Nom</th><th>Courriel</th><th>Téléphone</th></tr>"
	for(elm of collection) {
		html += "<tr>";
		for(p in elm) {
			if(p !== "id") {
				html += "<td>" + elm[p] + "</td>";
				console.log(p);
			}
		}
		html += "</tr>";
	}
	html += "</table></body>";
	return html;
}

app.get('/formulaire', function (req, res) {
	console.log(__dirname);
	res.sendFile( __dirname + "/public/html/" + "01_form.html" );
})

app.get('/traiter_get', function (req, res) {
	 // Preparer l'output en format JSON

	console.log('la route /traiter_get')
	identifiant++;

	// on utilise l'objet req.query pour récupérer les données GET
	 let reponse = {
	 prenom:req.query.prenom,
	 nom:req.query.nom,
	 courriel:req.query.courriel,
	 telephone:req.query.telephone,
	 id:identifiant
	 };
	console.log(reponse);

	const fs = require('fs');

	fs.appendFile('public/data/membres.txt', ',' + JSON.stringify(reponse), function (err) {
	  if (err) throw err;
	  console.log('Sauvegardé');
	});

	 res.end("Membre ajouté à la liste");
})

app.get('/membres', function (req, res) {
	const fs = require('fs');

	fs.readFile('public/data/membres.txt', 'utf8', function (err, data) {
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