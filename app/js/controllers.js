'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('MainCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      function authDataCallback(authData) {
        if (authData) {
         $scope.loggedIn = true;
         console.log("User " + authData.uid + " is logged in with " + authData.provider);
        } else {
         $scope.loggedIn = false;
         console.log("User is logged out");
        }
      }

      var ref = new Firebase("https://hoosin.firebaseio.com");
      ref.onAuth(authDataCallback);

      $scope.logout = function() {
         ref.unauth();
         $scope.loggedIn = false
      };

      $scope.toggleSidenav = function() {
         $scope.$broadcast('toggleSidenav');
      }

      $scope.createZoink = function() {
         Zoink.save($scope.zoink, 
            function (data) {

            },
            function (error) {

            }
         )
         $scope.zoink = {};
         //TODO HIDE MODAL
      }
   }])

   .controller('HomeCtrl', ['$scope', function($scope) {

   }])

   .controller('ZoinksIndexCtrl', ['$scope', '$rootScope', 'Zoink', function($scope, $rootScope, Zoink) {
      $scope.zoinks = Zoink.all();

      $scope.showSidenav = true;
      $scope.$on('toggleSidenav', function() {
         $scope.showSidenav = !$scope.showSidenav;
      })
   }])

   .controller('ZoinkShowCtrl', ['$scope', '$routeParams', 'Zoink', function($scope, $routeParams, Zoink) {
      $scope.zoink = Zoink.get($routeParams.id);
      
      $scope.showSidenav = true;
      $scope.$on('toggleSidenav', function() {
         $scope.showSidenav = !$scope.showSidenav;
      })

      // TODO
      // $scope.invited = currentUser.email.indexOf($scope.zoink.invites) > -1;
      // $scope.rsvped = currentUser.indexOf($scope.zoink.rsvps) > -1;

      $scope.rsvp = function() {
         // TODO
         if (!$scope.rsvped) {
            // $scope.zoink.rsvps.push(currentUser);   
         } else {
            // splice currentUser out of $scope.zoink.rsvps
         }
         $scope.rsvped = !$scope.rsvped;
      }

      $scope.joinCar = function(carpool) {
         // TODO
         // carpool.push(currenUser);
      }

      $scope.claimRequirement = function(requirement) {
         // TODO
         // requirement.owner.push(currentUser);
         // display owner in template
      }

      // CARPOOLS
      $scope.toggleNewCarpool = function() {
         $scope.newCarpool = !$scope.newCarpool;
      }
      $scope.addCarpool = function() {
         // carpool.driver = currentUser;
         $scope.zoink.carpools.unshift($scope.carpool)
         $scope.newCarpool = false;
         $scope.carpool = {};
      }

      // REQUIREMENTS
      $scope.toggleNewRequirement = function() {
         $scope.newRequirement = !$scope.newRequirement;
      }
      $scope.addRequirement = function() {
         $scope.zoink.requirements.unshift($scope.requirement)
         $scope.newRequirement = false;
         $scope.requirement = {};
      }

      // TODOS
      $scope.toggleNewTodo = function() {
         $scope.newTodo = !$scope.newTodo;
      }
      $scope.addTodo = function() {
         $scope.zoink.todos.unshift($scope.todo)
         $scope.newTodo = false;
         $scope.todo = {};
      }

      // INVITES
      $scope.toggleNewInvite = function() {
         $scope.newInvite = !$scope.newInvite;
      }
      $scope.addInvite = function() {
         $scope.zoink.invites.unshift($scope.invite)
         $scope.newInvite = false;
         $scope.invite = {};
      }
      
   }])

   .controller('LoginCtrl', ['$scope', '$location', function($scope, $location) {
      $scope.email = null;
      $scope.password = null;
      $scope.confirm = null;
      $scope.signupMode = false;
      var ref = new Firebase("https://hoosin.firebaseio.com");

      $scope.login = function() {
         $scope.err = null;
         console.log('logging in')

         if (assertValidLoginAttempt()) {
            ref.authWithPassword({
              email    : $scope.email,
              password : $scope.password
            }, function(error, authData) {
              if (error) {
                switch (error.code) {
                  case "INVALID_EMAIL":
                    $scope.err = "Email or password incorrect"
                    break;
                  case "INVALID_PASSWORD":
                    $scope.err = "Email or password incorrect"
                    break;
                  case "INVALID_USER":
                    $scope.err = "No account found"
                    break;
                  default:
                    $scope.err = "Error logging user in: " + error;
                }
              } else {
                console.log("Authenticated successfully with payload:", authData);
                $scope.loggedIn = true;
              }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.password ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.signupMode && ($scope.password !== $scope.confirm) ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', '$location', function($scope, $location) {
      // syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
      };

      function buildPwdParms() {
         return {
            email: $scope.auth.user.email,
            oldpass: $scope.oldpass,
            newpass: $scope.newpass,
            confirm: $scope.confirm,
            callback: function(err) {
               if( err ) {
                  $scope.err = err;
               }
               else {
                  $scope.oldpass = null;
                  $scope.newpass = null;
                  $scope.confirm = null;
                  $scope.msg = 'Password updated!';
               }
            }
         }
      }

   }])

   .controller('ChatCtrl', ['$scope', function($scope) {
       $scope.newMessage = null;

       // $scope.messages = syncData('messages', 10);

       // add new messages to the list
       $scope.addMessage = function() {
          if( $scope.newMessage ) {
             $scope.messages.$add({text: $scope.newMessage});
             $scope.newMessage = null;
          }
       };
   }])

    ;