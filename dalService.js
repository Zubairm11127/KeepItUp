(function(){
    "use strict";
    angular
        .module("common.services")
        .factory("dalService", dalService);
        
       dalService.$inject = ["$http"];

        function dalService($http) {
            
            var service = {
                login: login,
                getUsers: getUsers,
                saveUser: saveUser,
                deleteUser: deleteUser,
                addLeague: addLeague,
                getLeagues: getLeagues,
                saveLeague: saveLeague,
                deleteLeague: deleteLeague,
                getTeams: getTeams,
                saveTeam: saveTeam,
                deleteTeam: deleteTeam,
                postUsers:postUsers,
                updateUsers:updateUsers,
                registerUsers:registerUsers,
                //loginUser:loginUser
               
            };

            var baseUrl = 'http://127.0.0.1:8080';
            //var baseUrl = 'http://api-sharjeelhassan.rhcloud.com';

            return service;

            // Entity Security

            function login(creds) {
                return httpPost('/login', creds);
            }

            function postUsers(creds) {
                return httpPost('/employees', creds);
            }

            // Entity Users CRUD

            function getUsers() {
                return httpGet('/employees');
            }

            function updateUsers(league) {
                return httpPatch('/employees/' + league._id, league);
            }

            function deleteUser(id) {
                return httpDelete('/deleteRecord/' + id);
            }

            function saveUser(user) {
                return saveItem('/users', user);
            }

            
             function editUser(id) {
                return httpEdit('/employees/' + id);
            }

            function registerUsers(creds){
                 return httpPost('/register', creds);
            }

            function loginUser(user,callbacl){
                return httpPost('/login', user)
                .success(callback);
            }

//         // Entity Leagues CRUD

            function addLeague(league) {
                return httpPost('/leagues', league);
            }

            function getLeagues() {
                return httpGet('/leagues');
            }

            function saveLeague(league) {
                return httpPatch('/employees/' + league._id, league);
            }

            function deleteLeague(id) {
                return httpDelete('/leagues/' + id);
            }

            // Entity Teams CRUD

            function getTeams(leagueId) {
                var url = '/teams?leagueId=' + leagueId;
                return httpGet(url);
            }

            function saveTeam(team) {
                return saveItem('/teams', team);
            }

            function deleteTeam(id) {
                return httpDelete('/teams/' + id);
            }

            // Private Functionality

            function httpPost(url, data) {
                return httpExecute(url, 'POST', data);
            }

            function httpGet(url) {
                return httpExecute(url, 'GET');
            }

            function httpPatch(url, data) {
                return httpExecute(url, 'PATCH', data);
            }

            function httpDelete(url) {
                return httpExecute(url, 'DELETE');
            }
             function  httpEdit(url){
                 return httpExecute(url,'GET')
             }
            // Decides Edit or Insert
            function saveItem(url, item) {
                if(item._id) {
                    return httpPatch(url + '/' + item._id, item);
                } else {
                    return httpPost(url, item);
                }
                
            }

            function httpExecute(requestUrl, method, data) {
                return $http({

                        url: baseUrl + requestUrl,
                        method: method,
                        data: data
                    }).then(function(response){
                        return response.data;
                    });
            }


          ////////////////search////////////////
        }     
}());