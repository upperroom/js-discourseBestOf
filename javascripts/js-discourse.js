//Number of Comments
var COMMENTS = 4;
//Update time, default is 1 min.
var UPDATE_TIME = 60000
//URL to your forums. Exclude traling slash! ex: http://meta.discourse.org
var BASE_URL = "http://forums.cityfellas.com"

//Topic collision avoidance. Since in this version, discourse posts are not created, make sure you create a post with the same title as your post!
//In the future, it might be worth comparing the topic creator ID with one hard coded here.

//Stuff NOT to change!
var TITLE = $(document).attr('title').toLowerCase();
var SLUG = TITLE.substring(0, TITLE.lastIndexOf('-'));

$(document).ready(function go() {
$('#comments').html("Loading...");
console.log(BASE_URL + '/search.json?term=' + SLUG.replace(/\-/g, " "));
$.getJSON(BASE_URL + '/search.json?term=' + SLUG.replace(/\-/g, " "), function(b) {
if(typeof b.results === "undefined"){
$.getJSON(BASE_URL + b[0].results[0].url + '/wordpress.json?best=' + COMMENTS, function(a) {
if(a.posts){
$('#comments').html('');

$.each(a.posts, function(i,v){
$('#comments').append("<span id=\"toset\">"  + "<b>" + a.posts[i].name + "</b>" + "  said  " + a.posts[i].cooked + "</span>" + "<hr>");
$('#toset').attr('id','post' + i);
                        });
$('#comments').append("<p> Keep chatting about this post at <a id=\"togo\"> the forums. </a>");
$('#togo').attr('href',BASE_URL + b[0].results[0].url);
} else {
$('#comments').append("No responses yet. Go start the discussion at " + "<a id=\"boardurl\">" + "the forums." + "</a>");
}
                });
} else {
$('#comments').append("Nothing close to this page title. Go start the discussion at " + "<a id=\"boardurl\">" + "the forums." + "</a>");

}
});
setTimeout(go,60000);
});
