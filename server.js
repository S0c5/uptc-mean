

var express = require('express');
var app     = express();
var cors    = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/animales'); // conectar a la base de datos


var mascotaSchema = new mongoose.Schema({
  name: String,
  owner: String,
  yearsOld: Number
});

var Mascota = mongoose.model('mascota', mascotaSchema);

app.use('*', bodyParser.json());
app.use('*', cors());

// localhost:300/mascotas

app.get('/mascotas', (req, res) => {
    Mascota.find({})
    .then((data) => {
      console.log(data);
      res.status(200);
      res.json(data);
    })
});


app.post('/mascotas', (req, res) => {
    var mascotaNueva = new Mascota(req.body);
    console.log(req.body);
    mascotaNueva.save()
    .then((data) => {
      console.log(data);
      res.status(200);
      res.json(data);
    })
});

app.delete('/mascotas/:id', (req, res) => {
  console.log('aqui se va a eliminar a la mascota ' + req.params.id);
  Mascota.remove({_id: req.params.id})
  .then((data) => {
    res.status(200);
    res.json(data);
  }).catch(err => {
    console.log(err);
    console.log(err.stack);
  });
});


app.put('/mascotas/:id', (req, res)=> {
  Mascota.update({_id: req.params.id}, {$set: req.body})
  .then(data => {
    res.status(200);
    res.json(data);
  })
});


app.listen(3000, function(){
  console.log('[+] listen port: 3000');
});
