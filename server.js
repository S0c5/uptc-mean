

var express = require('express');
var app     = express();
var cors    = require('cors'); // npm install --save cors
var bodyParser = require('body-parser');

var nombres = [];
// GET /nombres

app.use('*', bodyParser.json());
app.use('*', cors()); // { Access-control-origin: '*'}

app.post('/nombres', function(req, res){
  console.log('mis datos en el cuerpo(body) ' , req.body);
  var nombre = req.body.name;

  nombres.push(nombre)
  res.json(
      nombres
  );
})

app.get('/nombres', function(req, res){
  res.json(nombres);
});


app.listen(3000, function(){
  console.log('[+] listen port: 3000');
});
