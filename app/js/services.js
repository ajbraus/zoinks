(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', ['myApp.service.login', 'myApp.service.firebase'])

    .service('Happening', [function() {

      var happenings = [{
        id: 0,
        title: "Zen Camping",
        location: "Camp Fort Doggity Dog",
        costInCents: 1000,
        groupRequirements: [
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Tent", completedAt: new Date() }
        ],
        carpools: [
          { name: "Toyota", driver: "", passengers: [], seats: 4 },
          { name: "Toyota", driver: "", passengers: [], seats: 3 }
        ],
        invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
        rsvps: [users[0], users[1], user[2]]
      }, {
        id: 1,
        title: "Martian Landing Lookout",
        location: "Camp Fort Doggity Dog",
        costInCents: 1000,
        groupRequirements: [
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Tent", completedAt: new Date() },
          { owner: "", body: "Bring a Tent", completedAt: new Date() }
        ],
        carpools: [
          { name: "Toyota", driver: "", passengers: [], seats: 4 },
          { name: "Toyota", driver: "", passengers: [], seats: 3 }
        ],
        invites: ["invite1@test.com", "invite2@test.com", "invite3@test.com"],
        rsvps: [users[0], users[1], user[2]]
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

