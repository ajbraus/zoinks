(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])

    .service('Happening', [function() {
      var users = [
        { name: "Bob Daniels"},
        { name: "Matthew Charley"},
        { name: "Mary Sonja"}
      ]

      var happenings = [{
        id: 0,
        title: "Zen Camping",
        location: "Camp Fort Doggity Dog",
        startsAt: "6pm Oct 6",
        endsAt: "5pm Oct 8",
        happeningOn: "Oct 6-8",
        costInCents: 1000,
        todos: ["Bring a hat", "Bring water", "Get ready to have fun!"],
        requirements: [
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Stove", completedAt: new Date() },
          { owner: "", body: "Bring a Paddle", completedAt: new Date() }
        ],
        carpools: [
          { name: "Toyota", driver: "", passengers: [], seats: 4 },
          { name: "Toyota", driver: "", passengers: [], seats: 3 }
        ],
        invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
        rsvps: [users[0], users[1], users[2]]
      }, {
        id: 1,
        title: "Martian Landing Lookout",
        location: "Camp Fort Doggity Dog",
        startsAt: "6pm Oct 6",
        endsAt: "5pm Oct 8",
        happeningOn: "Oct 6-8",
        costInCents: 1000,
        todos: ["Bring a hat", "Bring water", "Get ready to have fun!"],
        requirements: [
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Paddle", completedAt: new Date() },
          { owner: "", body: "Bring a Stove", completedAt: new Date() }
        ],
        carpools: [
          { name: "Benji", driver: "Bob", passengers: [users[1]], seats: 4 },
          { name: "The Blue Pill", driver: "Sonja", passengers: [users[2], users[0]], seats: 3 }
        ],
        invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
        rsvps: [users[0], users[1], users[2]]
      }];

      return {
        all: function() {
          return happenings;
        },
        remove: function(happening) {
          happenings.splice(happenings.indexOf(happening), 1);
        },
        get: function(happeningId) {
          for (var i = 0; i < happenings.length; i++) {
            if (happenings[i].id === parseInt(happeningId)) {
              return happenings[i];
            }
          }
          return null;
        }
      };
    }]);

})();

