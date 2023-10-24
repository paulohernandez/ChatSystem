module.exports = function ( app ) { 

    app.get('/', (req,res) => {
        res.render('contents/login')
    })
    app.get('/group', (req,res) => {
        res.render('contents/home')
    })

    
}