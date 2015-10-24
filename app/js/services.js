
'use strict';

/* Services */

angular.module('myApp.services', [])
  // .service("Zoink", ['$firebaseArray', '$firebaseObject', function($firebaseArray, $firebaseObject) {
  //   var ref = new Firebase("https://hoosin.firebaseio.com/zoinks");

  //   return {
  //     all: function() {
  //       return $firebaseArray(ref)
  //     },
  //     get: function(slug) {
  //       ref.startAt(slug).endAt(slug).once('value', function(snap) {
  //         // var zoink = snap.val()[Object.keys(snap.val())[0]];
  //         console.log(zoink)
  //         return zoink;
  //       }); 
  //     },
  //     remove: function(zoink) {
  //       zoinks.splice(zoinks.indexOf(zoink), 1);
  //     },
  //     save: function(zoink) {

  //     },
  //     update: function(zoink) {

  //     }
  //   };
  // }])


     // .service('Zoink', [function() {
  //   var users = [
  //     { name: "Bob Daniels", picUrl: "http://www.realtimearts.net/data/images/art/46/4640_profile_nilssonpolias.jpg"},
  //     { name: "Matthew Charley", picUrl: "http://www.realtimearts.net/data/images/art/46/4640_profile_nilssonpolias.jpg"},
  //     { name: "Mary Sonja", picUrl: "http://www.realtimearts.net/data/images/art/46/4640_profile_nilssonpolias.jpg"}
  //   ]

  //   var zoinks = [{
  //     id: 0,
  //     title: "Zen Camping",
  //     location: "Camp Fort Doggity Dog",
  //     startsAt: "6pm Oct 6",
  //     endsAt: "5pm Oct 8",
  //     happeningOn: "Oct 6-8",
  //     costInCents: 1000,
  //     todos: ["Bring a hat", "Bring water", "Get ready to have fun!"],
  //     requirements: [
  //       { owner: "", body: "Bring a Tent", completedAt: new Date() },
  //       { owner: "", body: "Bring a Stove", completedAt: new Date() },
  //       { owner: "", body: "Bring a Paddle", completedAt: new Date() }
  //     ],
  //     carpools: [
  //       { name: "Toyota", driver: "", passengers: [], seats: 4 },
  //       { name: "Toyota", driver: "", passengers: [], seats: 3 }
  //     ],
  //     invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
  //     rsvps: [users[0], users[1], users[2]]
  //   }, {
  //     id: 1,
  //     title: "Martian Landing Lookout",
  //     location: "Camp Fort Doggity Dog",
  //     startsAt: "6pm Oct 6",
  //     endsAt: "5pm Oct 8",
  //     happeningOn: "Oct 6-8",
  //     costInCents: 1000,
  //     todos: ["Bring a hat", "Bring water", "Get ready to have fun!"],
  //     requirements: [
  //       { owner: "", body: "Bring a Tent", completedAt: new Date() },
  //       { owner: "", body: "Bring a Paddle", completedAt: new Date() },
  //       { owner: "", body: "Bring a Stove", completedAt: new Date() }
  //     ],
  //     carpools: [
  //       { name: "Benji", driver: "Bob", passengers: [users[1]], seats: 4 },
  //       { name: "The Blue Pill", driver: "Sonja", passengers: [users[2], users[0]], seats: 3 }
  //     ],
  //     invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
  //     rsvps: [users[0], users[1], users[2]]
  //   }];

  //   return {
  //     all: function() {
  //       return zoinks;
  //     },
  //     remove: function(zoink) {
  //       zoinks.splice(zoinks.indexOf(zoink), 1);
  //     },
  //     get: function(zoinkSlug) {
  //       for (var i = 0; i < zoinks.length; i++) {
  //         if (zoinks[i].id === parseInt(zoinkSlug)) {
  //           return zoinks[i];
  //         }
  //       }
  //       return null;
  //     }
  //   };
  // }]);
