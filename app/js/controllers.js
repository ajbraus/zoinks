'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('MainCtrl', ['$scope', 'loginService', function($scope, loginService) {
      $scope.logout = function() {
         loginService.logout();
      };

      // $scope.toggleSidenav = function() {
      //    if ($scope.showSidenav) {
      //       $scope.showSidenav = false;   
      //    } else {
      //       $scope.showSidenav = true;
      //    }
      // }
   }])

   .controller('HomeCtrl', ['$scope', 'syncData', function($scope, syncData) {
      syncData('syncedValue').$bind($scope, 'syncedValue');
   }])

   .controller('HappeningsIndexCtrl', ['$scope', 'Happening', function($scope, Happening) {
      $scope.happenings = Happening.all();
   }])

   .controller('HappeningShowCtrl', ['$scope', 'syncData', '$routeParams', 'Happening', function($scope, syncData, $routeParams, Happening) {
      $scope.happening = Happening.get($routeParams.id);

      // CARPOOLS
      $scope.toggleNewCarpool = function() {
         if ($scope.newCarpool == true) {
            $scope.newCarpool = false;
         } else {
            $scope.newCarpool = true;
         }
      }
      $scope.addCarpool = function() {
         // carpool.driver = currentUser;
         $scope.happening.carpools.unshift($scope.carpool)
         $scope.newCarpool = false;
         $scope.carpool = {};
      }

      // REQUIREMENTS
      $scope.toggleNewRequirement = function() {
         if ($scope.newRequirement == true) {
            $scope.newRequirement = false;
         } else {
            $scope.newRequirement = true;
         }
      }
      $scope.addRequirement = function() {
         $scope.happening.requirements.unshift($scope.requirement)
         $scope.newRequirement = false;
         $scope.requirement = {};
      }

      // TODOS
      $scope.toggleNewTodo = function() {
         if ($scope.newTodo == true) {
            $scope.newTodo = false;
         } else {
            $scope.newTodo = true;
         }
      }
      $scope.addTodo = function() {
         $scope.happening.todos.unshift($scope.todo)
         $scope.newTodo = false;
         $scope.todo = {};
      }

      // INVITES
      $scope.toggleNewInvite = function() {
         if ($scope.newInvite == true) {
            $scope.newInvite = false;
         } else {
            $scope.newInvite = true;
         }
      }
      $scope.addInvite = function() {
         $scope.happening.invites.unshift($scope.invite)
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