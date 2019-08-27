module.exports = function(router) {
    router.get('/', function(req, res) {
        console.log('sdfsf')
        return res.send('Index Page');
    });

    router.get('/about', function(req, res) {
        return res.send('About Page');
    });
    return router;
};
