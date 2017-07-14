const express = require('express');
const path = require('path');
const crawler = require('./crawler');

let app = express();

app.set('port', process.env.PORT || 3000);

app.get('/api', function(req, res) {
    res.json({
        '/list': 'get the list of stories',
        '/story': 'get the story content with id'
    });
});

app.get('/api/list', function(req, res) {
    crawler
        .requestLatestStoryList()
        .then(function(stories) {
            res.json(stories);
        })
        .catch(function(error) {
            console.log(error);
        });
});

app.get('/api/stories', function(req, res) {
    let id = req.params.id;
    crawler
        .requestStory(id)
        .then(function(story) {
            res.json(story);
        })
        .catch(function(error) {
            console.log(error);
        });
});

app.use(function(req, res) {
    res.status('404');
    res.send('404, the page is not exist');
    res.end();
})

app.listen(app.get('port'), function() {
    console.log('The server has been started');
})