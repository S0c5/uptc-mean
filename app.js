var app = angular.module("uptc",[]);
// NOTA SIEMPRE QUE ABRAN UNA LLAVE,CORCHETE,PARENTESIS,ETC. CIERRENLO! de inmediato.
app.controller('ctrl', function($scope, $http){
  $scope.nombres = [];
// se llama siempre cuando el controlador carga !!
  $scope.traerNombres = function(){
    // Esto consume un API REST
      $http.get('http://localhost:3000/mascotas')
      .then(function(res){
        $scope.nombres = res.data;
      });
  };
// esto hace que se carge init siempre que el controlador carga.
  $scope.traerNombres();

  $scope.name = "";


// esto agrega nombres;
  $scope.agregar = function(){
    $http.post('http://localhost:3000/mascotas',
        JSON.stringify({ name: $scope.name })
    )
    .then(function(){
      $scope.traerNombres();
    });
    $scope.name = "";
  }

  // eliminar mi mascota
  $scope.eliminarMascota = function(id){
    console.log('voy a eliminar a mi mascota ' + id);
    $http.delete('http://localhost:3000/mascotas/' + id)
    .then(function(){
      $scope.traerNombres();
    });
  }

  $scope.actualizar = function(id, data){
    $http.put('http://localhost:3000/mascotas/' + id,
      JSON.stringify(data)
    )
    .then(function(){
      $scope.traerNombres();
    });
  }
});
