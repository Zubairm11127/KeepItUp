     var app = angular.module('firstApplication', ['ngMaterial','common.services'])
          app.controller('openListController', function($scope, $http,dalService,){
              
              $scope.OpenList=function(){
                  
                dalService.getUsers().then(function(data){
                        $scope.gists=data;  
                       
                });
              }
              $scope.refresh=function(){
               
              }  
              $scope.templateUrl='update.html';

              $scope.insert=function(data){
                  dalService.postUsers(data);
                
                 
              }
              
              $scope.delete =function(id){
                 dalService.deleteUser(id);
              }

               $scope.edit=function(contact){
                      console.log(contact);
                      $scope.current=contact;
                      
                      // $http.get('/employess/' + id).then(function(response){
                      //       $scope.contact=response;
                      // });

                      // dalService.editUser(id).then(function(response){
                      //   $scope.contact=response;
                      // });
                };
                $scope.current={};

                $scope.update=function(contact){
                  dalService.updateUsers(contact)
                }

                
                // $scope.search=function(data){
                //   dalService.searchuser(data);
                // }

                // $scope.search=function(item){
                //    if($scope.searchText==undefined){
                //        return true;
                //    }
                 
                //    else{
                //      if(item.UserName.indexOf($scope.searchTExt)!=-1 ||
                //       item.Email.indexOf($scope.searchText)!=-1){
                //           return true;
                //       }
                     
                  
                //    }
                //      return true;
                //   }
              
       
            //  $scope.updateUrl='update.html';   
                  
            //    $scope.edit = function(id){
            //        var name;
            //        var e;
            //        var pn;

            //       $scope.UserName={};
              
            //       $scope.Email={};
            //       $scope.PhoneNumber;
                  
               
            //      $scope.data ={
            //          name : username,
            //          e: email,
            //          pn: phonenumber

            //      }
                
            //         UserName =name;
            //         Email = e;
            //         Phonenumber = pn;


            //   }
                  
               
             

          });

        