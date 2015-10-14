'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('MainCtrl', ['$scope', '$rootScope', 'loginService', function($scope, $rootScope, loginService) {
      $scope.logout = function() {
         loginService.logout();
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

   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

   .controller('ZoinksIndexCtrl', ['$scope', '$rootScope', 'Zoink', function($scope, $rootScope, Zoink) {
      $scope.zoinks = Zoink.all();

      $scope.showSidenav = true;
      $scope.$on('toggleSidenav', function() {
         $scope.showSidenav = !$scope.showSidenav;
      })
   }])

   .controller('ZoinkShowCtrl', ['$scope', 'syncData', '$routeParams', 'Zoink', function($scope, syncData, $routeParams, Zoink) {
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

  .controller('ChatCtrl', ['$scope', 'syncData', function($scope, syncData) {
      $scope.newMessage = null;

      // constrain number of messages by limit into syncData
      // add the array into $scope.messages
      $scope.messages = syncData('messages', 10);

      // add new messages to the list
      $scope.addMessage = function() {
         if( $scope.newMessage ) {
            $scope.messages.$add({text: $scope.newMessage});
            $scope.newMessage = null;
         }
      };
   }])

   .controller('LoginCtrl', ['$scope', 'loginService', '$location', function($scope, loginService, $location) {
      $scope.email = null;
      $scope.password = null;
      $scope.confirm = null;
      $scope.signupMode = false;

      $scope.login = function(cb) {
         $scope.err = null;
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else {
            loginService.login($scope.email, $scope.pass, function(err, user) {
               $scope.err = err? err + '' : null;
               if( !err ) {
                  cb && cb(user);
               }
            });
         }
      };

      $scope.createAccount = function() {
         $scope.err = null;
         if( assertValidLoginAttempt() ) {
            loginService.createAccount($scope.email, $scope.pass, function(err, user) {
               if( err ) {
                  $scope.err = err? err + '' : null;
               }
               else {
                  // must be logged in before I can write to my profile
                  $scope.login(function() {
                     loginService.createProfile(user.uid, user.email);
                     $location.path('/account');
                  });
               }
            });
         }
      };

      function assertValidLoginAttempt() {
         if( !$scope.email ) {
            $scope.err = 'Please enter an email address';
         }
         else if( !$scope.pass ) {
            $scope.err = 'Please enter a password';
         }
         else if( $scope.pass !== $scope.confirm ) {
            $scope.err = 'Passwords do not match';
         }
         return !$scope.err;
      }
   }])

   .controller('AccountCtrl', ['$scope', 'loginService', 'syncData', '$location', function($scope, loginService, syncData, $location) {
      syncData(['users', $scope.auth.user.uid]).$bind($scope, 'user');

      $scope.oldpass = null;
      $scope.newpass = null;
      $scope.confirm = null;

      $scope.reset = function() {
         $scope.err = null;
         $scope.msg = null;
      };

      $scope.updatePassword = function() {
         $scope.reset();
         loginService.changePassword(buildPwdParms());
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

   }]);