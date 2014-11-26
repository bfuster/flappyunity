var express = require('express');
var router = express.Router();
var _ = require('underscore');

var SCORES = {};

router.get('/', function(req, res) {
	sendScores(res);
});

router.post('/', function(req, res) {

	var obj = req.body;
	if (!SCORES[obj.name] || SCORES[obj.name] < obj.score) {
		SCORES[obj] = obj.score;
	}

	sendScores(res);
});

function parseScoresToSortedArray() {

	var results = _.chain(_.keys(SCORES))
		.map(function(key) {
			return {
				name: key,
				score: SCORES[key]
			}
		})
		.sortBy(function(item) {
			return item.score * -1
		})
		.value();

	return results;
}

function sendScores(res) {
	res.send({
		scores: parseScoresToSortedArray()
	});
}

module.exports = router;
