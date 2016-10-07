# ICUAFC Fantasy Football

The aim is to build a little app for looking at the players points
over the season and create teams of other IC players to rank them.

### The tools used

* Using the MEAN stack as I am familiar with it.
* Angular 1.5.8 so making use of the new components.
* All the Angular stuff is in the `app` directory.
* Mongoose to interact with MongoDB.

### TODO

* __Higher priority:__ Add some actual UI to this. ~~And some client side validation for the forms.~~
* Change user password.
* ~~Logout button.~~
* ~~Search for certain xi.~~
* ~~Sub appearances.~~
* ~~Add players without user let them associate with user.~~
* ~~The forms for creating a team.~~
* ~~The admin forms to update players points, goals etc.~~
* ~~Add the components to view player details and the players points table.~~
* ~~When a user adds a player it should become his/her player and the same for a team.~~
* Add the ability for the admin to edit the team for transfers.
* ~~Make a teams points update automatically based on the players it has. (Could be quite difficult)~~
* Add the BUCS stuff.

### How to setup if you want to help

I've been using the cloud 9 editor recently because it looked easy to set up for everyone.

I think I should just be able to add you to my developer environment on cloud 9.

If not, this worked for me:

1. Get [MongoDB](https://community.c9.io/t/setting-up-mongodb/1717) set up
2. Run it on a terminal instance in cloud 9
3. Run the server.js file with an environment variable for SECRET and/or IP set up.
4. Navigate to [https://fantasy-football-h22roscoe.c9users.io]( https://fantasy-football-h22roscoe.c9users.io)
  (with the equivalent for your account) for the preview
