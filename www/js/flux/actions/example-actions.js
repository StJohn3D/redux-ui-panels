'use strict';

define(["flux/action"], function(Action) {

	var ExampleActions = new Action("EXAMPLE");
	
	ExampleActions.selectionMade = function(_selectedIndex) {
		ExampleActions.sendAction({
			type : "SELECTION_MADE",
			selectedIndex: _selectedIndex,
		});
	};

	console.log('New ExampleActions created ' + new Date().toDateString());

	return ExampleActions;
});