const db = require("../lib/db");

exports.form = function(req, res){
    //console.log(res.locals)
    res.render("post-edit");
}


exports.submit = function(req, res){
    const data = req.body;

    db.insertPost([ 
        res.locals.user.name,
        data.title,
        data.content,
        res.locals.user.id,
     ], (result) => {
        res.redirect("/");
    })
}

exports.detail = function(req, res){
    console.log(req.query)
}