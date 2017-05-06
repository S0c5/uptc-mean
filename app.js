var app = angular.module("uptc",[]);
// NOTA SIEMPRE QUE ABRAN UNA LLAVE,CORCHETE,PARENTESIS,ETC. CIERRENLO! de inmediato.
app.controller('ctrl', function($scope, $http){
  $scope.nombres = [];
// se llama siempre cuando el controlador carga !!
  $scope.traerNombres = function(){

    // Esto consume un API REST
      $http.get('http://localhost:3000/nombres')
      .then(function(res){
        $scope.nombres = res.data;
      });
  };
// esto hace que se carge init siempre que el controlador carga.
  $scope.traerNombres();

  $scope.name = "";

// esto agrega nombres;
  $scope.agregar = function(){
    console.log($scope.name);
    console.log(JSON.stringify({ name: $scope.name }));
    $http.post('http://localhost:3000/nombres',
        JSON.stringify({ name: $scope.name })
    )
    .then(function(){
      $scope.traerNombres();
    });
    $scope.name = "";
  }
});
