Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading', 
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.map(function() {
  this.route('postsList1', {path: '/'});
  this.route('postPage', {
      path: '/posts/:_id',
          data: function() {
           return Posts.findOne(this.params._id); }  
       });
});
Router.route('/submit', {name: 'postSubmit'});
var requireLogin = function() {
  if (! Meteor.user()) {
    if (Meteor.loggingIn()) {
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
       } else {
          this.next();  
       }
   }
Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});