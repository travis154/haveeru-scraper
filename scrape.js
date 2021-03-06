var request = require('request');
var async = require('async');
var $ = require('jquery');
var arg = require('optimist').argv;
var colors = require('colors');
var fs = require('fs');
var defaults = {
	  start: arg.start || 1
	, end : arg.end || (arg.start ? arg.start + 20 : 20)
	, limit : arg.limit || 1
	, saveArticle: arg['save-article'] || true
	, saveFullPage:arg['save-full-page'] || false
	, fetchFailed : arg['fetch-failed'] || true
}

fs.mkdir(__dirname + '/data');

var urls = [];
var failed = [];

var i = defaults.start - 1;

while(i++ <= defaults.end){
	urls.push('http://www.haveeru.com.mv/dhivehi/news/' + i);
}



function fetch(arr){
	async.forEachLimit(
		arr || urls, 
		defaults.limit, 
		function(item, callback){
			var id = item.split('/').pop();
			if(fs.existsSync(__dirname + '/data/' + id + '.json')){
				console.log('Already fetched - '.red +  item.red);
				return callback(null,null);
			}
			console.log("Fetching article " + item);
			request(item,function(err,res,body){
				if(err){
					console.log('Unable to fetch - '.red +  item.red);
					failed.push(item);
					return callback(null,null);
				}
				var dom = $(body);
				var title = dom.find('title').html() || '';
				console.log("Scraped article - "+ item + ' - ' + title.green );
				//save article
				if(defaults.saveArticle){
					var obj = {};
					obj.title = title;
					obj.article = dom.find("#article").html();
					fs.writeFile(__dirname + '/data/' + id + '.json', JSON.stringify(obj, null, 3));
				}
				if(defaults.saveFullPage){
					fs.writeFile(__dirname + '/data/' + id + '.html', body);
				}
				callback(null, null);
			});
		}, 
		function(err, results){
			if(defaults.fetchFailed){
				console.log('Fetching failed requests'.green.bold);
				fetch(failed);
				failed.length = 0;
			}
		}
	);
}
fetch();

