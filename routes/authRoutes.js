const passport = require('passport')

module.exports = (app) => {
    
    app.get('/auth/google', passport.authenticate('google', {
    scope : ['profile', 'email']
    }))

    app.get('/auth/google/callback', passport.authenticate('google'))

    app.get('/logout', (req, res) => {
        req.logout();
        res.send('You have been logged out')
    })
    app.get('/user', (req, res) => {
        res.send(req.user);
    })

    app.get('/', (req, res) => {
        res.send('My Name is Charles')
    })
}