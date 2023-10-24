module.exports = function ( app ) { 

    app.get('/', ( req , res ) => {
        res.render('contents/login')
    })
    app.get('/login/:name', ( req , res ) => {
        req.session._name = req.params.name
        req.session.save();
        res.redirect('/home')
    })
    app.get('/home', ( req , res ) => {
    
        res.render('contents/home')
    })

    
}