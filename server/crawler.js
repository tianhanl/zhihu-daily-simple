var superagent = require('superagent');
var cheerio = require('cheerio');
var mongo = require('./mongo');
let IDREG = /(\/story\/)(\d*)/;

const Story = function (id, title, time) {
  this.id = id;
  this.title = title;
  this.time = time;
};

// return a promise resolved with stories
const getStoryList = function () {
  return new Promise(function (resolve, reject) {
    var date = new Date();
    var currentTime = '' + date.getFullYear() +
      '/' + (date.getMonth() + 1) +
      '/' + date.getDate();
    superagent.get('https://daily.zhihu.com')
      .end(function (err, res) {
        if (err) {
          reject(err);
        }
        var stories = [];
        var $ = cheerio.load(res.text);
        var $boxes = $('.main-content-wrap .box');
        $boxes.each(function (index, element) {
          let $self = $(this);
          let $linkButton = $self.children('.link-button');
          let id = IDREG.exec($linkButton.attr('href'))[2];
          let title = $linkButton.children('.title').text();
          var currentStory = new Story(id, title, currentTime);
          stories.push(currentStory);
        });
        resolve(stories);
      });
  });
};

// return a promise resolved with stories
const storeStoryList = function (stories) {
  stories.forEach(function (story) {
    let mongoStory = new mongo.Story({
      id: story.id,
      title: story.title,
      time: story.time
    });
    mongoStory.save(function (err) {
    });
  });
  return Promise.resolve(stories);
};


const getLatestStoryList = function () {
  var date = new Date();
  var result;
  var currentTime = '' + date.getFullYear() +
    '/' + (date.getMonth() + 1) +
    '/' + date.getDate();
  return new Promise(function (resolve, reject) {
    mongo.Story.find({ time: currentTime }, function (err, stories) {
      if (err) {
        console.log(err);
      }
      if (stories.length > 0) {
        resolve(stories);
      } else {
        getStoryList()
          .then(storeStoryList)
          .then(function (stories) {
            resolve(stories);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }); // end of return Promise
};


const getStory = function (id) {
  return new Promise(function (resolve, reject) {
    superagent
      .get('https://daily.zhihu.com/story/' + id)
      .end(function (err, content) {
        if (err) reject(err);

        let $ = cheerio.load(content.text);
        let answers = $('div.question');
        let answerTexts = [];
        answers.each(function (index, element) {
          answersTexts.push(element.html());
        });
        mongo.Story.update({ id: id }, { content: answerTexts }, { upsert: true });
        resolve(answerTexts);
      });
  });
};

const requestStory = function (id) {
  return new Promise(function (resolve, reject) {
    mongo.Story.findOne({ id: id }, 'title content', function (err, story) {
      if (err) reject(err);
      if (!story.content || story.content.length === 0) {
        resolve(getStory(id));
      } else {
        resolve(story);
      }
    })
  });
};

module.exports = {
  requestLatestStoryList: requestLatestStoryList,
  requestStory: requestStory
}