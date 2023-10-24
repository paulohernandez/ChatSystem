module.exports = function(app){
    app.get('/mysession', ( req , res ) => {
        try {
            res.send({data: req.session})
        } catch (error) {
            console.log(error)
        }
    })
}