'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
   .controller('MainCtrl', ['$scope', '$rootScope', 'Auth',  function($scope, $rootScope, Auth) {
      $scope.signupMode = false;
      $scope.user = {};

      var ref = new Firebase("https://hoosin.firebaseio.com");
      Auth.isLoggedIn();

      $rootScope.$on('loggedIn', function() {
        $scope.loggedIn = true;
      })

      $scope.login = function() {
         $scope.err = null;
         console.log('logging in')

         if (Auth.assertValidLoginAttempt($scope.user)) {
            ref.authWithPassword($scope.user, function(error, authData) {
              if (error) { 
                $scope.err = Auth.handleAuthError(error);
              } else {
                $rootScope.$broadcast('loggedIn');
                $scope.$apply(function() {
                  $('#login-modal').modal('hide');
                });
              }
            });
         }
      };

      $scope.createAccount = function() {
        $scope.err = Auth.assertValidLoginAttempt($scope.user);

        if (!$scope.err) {
          ref.createUser({
            email: $scope.user.email,
            password: $scope.user.password
          }, function(error, userData) {
            if (error) {
              $scope.err = Auth.handleAuthError(error);
            } else {
              console.log("Successfully created user account with uid:", userData.uid);
              ref.authWithPassword({
                email: $scope.user.email,
                password: $scope.user.password
              }, function(error, authData) {
                Auth.isLoggedIn(authData);
                $scope.$apply(function() {
                  $('#login-modal').modal('hide');
                });
              })
            }
          });
        }
      };

      $scope.logout = function() {
         ref.unauth();
         $scope.loggedIn = false
      };

      $scope.toggleSidenav = function() {
         $scope.$broadcast('toggleSidenav');
      }
   }])

   .controller('HomeCtrl', ['$scope', function($scope) {

   }])

   .controller('ZoinksIndexCtrl', ['$scope', '$rootScope', '$firebaseArray', function($scope, $rootScope, $firebaseArray) {
      var zoinksRef = new Firebase('https://hoosin.firebaseio.com/zoinks');
      $scope.zoinks = $firebaseArray(zoinksRef);

      $scope.goToZoink = function(zoink) {
        $scope.zoinks[zoink].$id
      }

      $scope.showSidenav = true;
      $scope.$on('toggleSidenav', function() {
         $scope.showSidenav = !$scope.showSidenav;
      })
   }])

   .controller('NewZoinkCtrl', ['$scope', '$location', '$firebaseArray', 'Auth', function($scope, $location, $firebaseArray, Auth) {
      $scope.zoink = {};
      var currentUser = Auth.isLoggedIn();
      $scope.createZoink = function() {
        var zoinksRef = new Firebase('https://hoosin.firebaseio.com/zoinks');
        $firebaseArray(zoinksRef).$add($scope.zoink).then(function(ref) {
          ref.update({ key: ref.key()});
          $firebaseArray(ref.child('rsvps'))
            .$add({
              email: currentUser.password.email,
              picUrl: "",
              name: "Adam Braus"
            })
          $location.path('/zoinks/' + ref.key());
          $('#new-zoink').modal('hide');
        });
        
      }
   }])

   .controller('ZoinkShowCtrl', ['$scope', '$routeParams', '$firebaseObject', '$firebaseArray', 'Auth', function($scope, $routeParams, $firebaseObject, $firebaseArray, Auth) {
      var ref = new Firebase("https://hoosin.firebaseio.com/zoinks/" + $routeParams.id);
      $firebaseObject(ref).$bindTo($scope, "zoink");

      $scope.showSidenav = true;
      $scope.$on('toggleSidenav', function() {
         $scope.showSidenav = !$scope.showSidenav;
      })

      $scope.invites = $firebaseArray(ref.child('invites'));
      $scope.rsvps = $firebaseArray(ref.child('rsvps'));

      var currentUser = Auth.isLoggedIn();

      ref.child('invites').on('value', function(snap, prevKey) {
        if (currentUser && snap.val() == currentUser.password.email) {
          $scope.invited = true;
        }
      });

      ref.child('rsvps').on('value', function(snap, prevKey) {
        if (currentUser && snap.val() == currentUser.password.email) {
          $scope.rsvped = true;
        }
      });

      // INVITES
      $scope.toggleNewInvite = function() {
         $scope.newInvite = !$scope.newInvite;
      }

      $scope.addInvite = function() {
        if (!(_.pluck($scope.invites, '$value').indexOf($scope.invite) > -1)) {
          $firebaseArray(ref.child('invites')).$add($scope.invite);
          $scope.newInvite = false;
          $scope.invite = '';
        } else {
          console.log('Invite already added')
        }
      }

      $scope.rsvp = function() {
         $firebaseArray(ref.child('rsvps'))
         .$add({
          email: currentUser.password.email,
          picUrl: "",
          name: "Adam Braus"
         });
         $scope.rsvped = true;
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