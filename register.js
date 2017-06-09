var app = angular.module('firstApplication', ['ngMaterial','common.services'])
// app.config(function($routeProvider){

//       $routeProvider
      
//       .when("/btn",{
//         templateUrl:'home.html'
//       })

// });
          app.controller('openListController', function($scope, $http,dalService,$window){
              $scope.insert=function(data){
                    
                    dalService.registerUsers(data);
              }
              //var vm=this;
              //vm.loginUser=loginUser;
             // function loginUser(user){
                
                  $scope.loginUser=function(data){
                  dalService.login(data).then(function(response){
                   
                    var email=response.Email;
                    var password=response.Password;
                    var Email=$scope.data.Email;
                    var Password=$scope.data.Password;
                   
                    
                    
                    
                    if($scope.data.Email == email && $scope.data.Password == password){
                        $window.location.href = '/crud//insert/home.html';
                          
                          alert("success");

                      
                   }
                   else{
                     alert("fialed");
                   }
                      
                });
               }
                    
                 // });
                          
            //    dalService.login(data ,function(){
            //      var Email=$scope.data.Email;
            //      var Password=$scope.data.Password;
            //      if($scope.data.Email == true && $scope.data.Password == true){
            //       // $location.path=('/home.html);
            //         $scope.templateurl="home.html";

            //      }else{
            //        alert("wrong message");
            //      }
            // //     //  if(responanse==null){

            // //     //  }else{
            // //     //         //$rootscope.currentusers=responanse;
            // //     //         $location.path=('/home.html');
            // //     //         //$scope.templateurl='home.html';
            // //     //  }
                
            //    });
             
          });
