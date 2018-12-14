
const db = require("../lib/db");

exports.view = function(req, res){
    db.findAllPosts(result => {
        res.render("index", { posts: result });
    })
}