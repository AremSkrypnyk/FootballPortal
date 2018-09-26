var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Post Model
 * ==========
 */

var Player = new keystone.List('Player', {
	singular: 'Player',
	plural: 'Players',
	map: {name: 'name'},
	autokey: {path: 'slug', from: 'name', unique: true}
});

Player.add({
	name: {type: String, required: true},
	image: { type: Types.CloudinaryImage },
	dateOfBirth: {type: Types.Date, index: true},
	position: {type: String, index: true},
	foot: {type: String, index: true}
});

Player.register();
