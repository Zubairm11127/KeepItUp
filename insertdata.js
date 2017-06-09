
var app=angular.module("firstApplicationt",[]);
app.controller('inputController',function($http,$scope){

    $scope.insert=function(data){
         $http({
            method: 'POST',
            url: 'http://127.0.0.1:8080/employee',
            data: data
        }).then(function(response){
            return response.data;
        })
    }

});
