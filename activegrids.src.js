//console = window.console || {log:function(){}};


/* ActiveGrids @davesmiths 2012 */
(function(window, document) {

	'use strict';

	// Definitions
	// Defaults
	var defaults = {
		minWidth: true, // false means maxWidth
		width: 60, // number of px for minWidth or maxWidth
		//customClass: '',
		defaultClass: 'ags',
		find: '.ags',
		gt: 'gt', // gt or gte
		lt: 'lt', // lt or lte
		maxCols: 16, // to apply a practical limit to ags-lt classes, e.g., there will be no ags-lt1000 unless you want it
		loading: false
	},

	documentElement = document.documentElement,
	elementsBySelectorIndex = {},
	activeGridsjQuery = '//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js',
	batches = [],
	currHeight,
	currWidth,


	// Mini compressions
	QuerySelectorAll = 'querySelectorAll',
	Length = 'length',
	AddEventListener = 'addEventListener',
	ClassName = 'className',
	ClearTimeout = 'clearTimeout',
	SetTimeout = 'setTimeout',
	Onreadystatechange = 'onreadystatechange',


	// ActiveGrids
	activeGrids = function(optns) {

		var documentElementClientHeight,
			documentElementClientWidth;

		// Register an ActiveGrids batch
		if (typeof optns !== 'undefined' && !optns.type) {

			// Prepare an ActiveGrids batch
			activeGridsjQuery = optns.jquery || activeGridsjQuery;
			// Merge batch options with the defaults
			optns = optns || {};
			for (var i in defaults) {
				if (!optns.hasOwnProperty(i)) {
					optns[i] = defaults[i];
				}
			}

			// Add the batch to the batches array
			batches.push(optns);

		}

		// Else a window.resize event
		else {

			// Refresh all batches if the DOM is ready and the window has been resized
			documentElementClientWidth = documentElement.clientWidth;
			documentElementClientHeight = documentElement.clientHeight;

			if (domReady) {
				if (currHeight !== documentElementClientHeight || currWidth !== documentElementClientWidth) {
					throttle(refreshBatches);
				}
				currHeight = documentElementClientHeight;
				currWidth = documentElementClientWidth;
			}
		}
		return false;
	},


	// Refresh batches
	refreshBatches = function() {
		var i, batchesLength;
// console.log('refreshbatches '+batches.length);
		for (i = 0, batchesLength = batches[Length]; i < batchesLength; i++) {
			refreshBatch(batches[i]);
		}
	},


	// Refresh a batch
	refreshBatch = function(optns) {
		var optnsFind, elements, elementsLength;

//console.log('refreshBatch, batches.length='+batches.length);

		// Definitions
		optnsFind = optns.find || '';

		// Get elements
//console.log(document[QuerySelectorAll]);
		elements = document[QuerySelectorAll](optnsFind);
		elementsLength = elements[Length];
		//var elementsLength = (elements.length > 15) ? 15 : elements.length;

		//when doing a resize we want all the elements to change
		//when loading up onload then we want it to be incremental

		// Reduce the number of times an element gets processed while the DOM is loading
		elements = [].slice.call(elements, 0) || [];
		if (!domIsReady) {
			var elementsFoundAlready = elementsBySelectorIndex[optnsFind] || [];
			var elementsLeftOver = elements.slice(elementsFoundAlready[Length]);
			elementsBySelectorIndex[optnsFind] = elements;
			elements = elementsLeftOver;
		}

		elementsLength = elements[Length];

//console.log('elements.length:'+elements.length+' FOund:'+elementsFoundAlready[optnsFind].length+' leftover:'+elementsLeftOver.length+' optnsFind:'+optnsFind);
		var $this,
			optnsGridWidth = optns.width,
			optnsGT = optns.gt,
			optnsLT = optns.lt,
			classPrepend = (optns.customClass || optns.defaultClass) + '-';

		// Process the elements
		for (var i = 0; i < elementsLength; i++) {
			$this = elements[i];
			var containerWidth = $this.offsetWidth,
				numcols = Math.floor((containerWidth - ((optns.minWidth) ? 0 : 1))/optnsGridWidth),
				classValue = ' ' + $this[ClassName].replace(new RegExp(
						" " + classPrepend + "\\d+\\b|"+
						" " + classPrepend + "gte?\\d+\\b|"+
						" " + classPrepend + "lte?\\d+\\b", 'g'), ''),
				gt = '',
				lt = '',
				j,
				k = 0,
				diff;

			if (!optns.minWidth) {
				numcols++;
			}
			if (numcols === 0) {
				numcols = 1;
			}
//console.log('minWidth='+optns.minWidth + ' ' + numcols);

//console.log('cw:'+containerWidth+' cv:'+classValue);
//console.log('k:'+classPrepend);

//console.log('cv after replace:'+classValue);
			diff = (optnsGT === 'gte') ? 1 : 0;
			for (j = 1; j < numcols + diff; j++) {
				gt += ' ' + classPrepend + optnsGT + j;
			}

			diff = (optnsLT === 'lt') ? 1 : 0;
			for (j = numcols + diff; j <= optns.maxCols; j++) {
				lt += ' ' + classPrepend + optnsLT + j;
			}
			classValue = (classValue + gt + ' ' + classPrepend + numcols + lt).replace(/\s+/g, ' ');
//console.log('cn:'+classValue);
			gt = '';
			lt = '';

			$this[ClassName] = classValue;

//console.log('count:'+count+' i:'+i+' numcols+diff:' +(numcols + diff) + ' optns.maxCols:' + optns.maxCols);
//count++;

		}
	},

	//count = 0,

	// While loading ActiveGrids
	timeoutID,

	agsWhileDOMLoading = function() {
//console.log('whileloading');
		refreshBatches();
		timeoutID = window[SetTimeout](agsWhileDOMLoading, 76);
	},



	// DOM Ready
	domIsReady = false,
	domReady = function() {
		domIsReady = true;
		window[ClearTimeout](timeoutID);
		refreshBatches();
		//var t = window[SetTimeout](refreshBatches, 200); // For IE 6, it wasn't getting the proper widths for the containers.
//console.log(document[QuerySelectorAll]('.ags,.ags').length);
	},








	// Polyfill
	polyfill = function() {
//console.log('polyfill');

		var agsjQuery = jQuery.noConflict();

		// Polyfill, with thanks to branneman https://gist.github.com/1200441
		document[QuerySelectorAll] = agsjQuery.find;

//		agsWhileDOMLoading();

		agsjQuery(function() {
			domReady();
//console.log('domREady');
		});

	},




	// Obect Detection, which leads to Polyfill
	objectDetection = function() {
		// Polyfill
		// Feature detect document.querySelectorsAll
		if (document[QuerySelectorAll] && document[AddEventListener]) {
// console.log('goodbrowser');
			agsWhileDOMLoading();
		}
		else {
//console.log('olderbrowser');
			if (typeof jQuery !== 'undefined') {
				polyfill();
//console.log('jqpolyfill');
			}
			else {
				// Polyfill using Sizzle, with thanks to jQuery and all those that contributed https://github.com/jquery/sizzle.
				// May be better to CDN jQuery and set document[QuerySelectorAll] = jQuery.find
				(function() {
					var scriptTag = 'script',
						scriptElement = document.createElement(scriptTag),
						firstScript = document.getElementsByTagName(scriptTag)[0],
						loaded,
						ReadyState = 'readyState';

					//scriptElement.type = 'text/javascript'; // Is this line *really* needed
					scriptElement.async = true;
					scriptElement[Onreadystatechange] = scriptElement.onload = function(e) {
						if (!loaded && (!this[ReadyState] || this[ReadyState] === 'complete' || this[ReadyState] === 'loaded')) {
							this[Onreadystatechange] = null;
							loaded = 1;

							polyfill();
						}
					};
					scriptElement.src = activeGridsjQuery;
					firstScript.parentNode.insertBefore(scriptElement, firstScript);
				})();
			}
		}
		// Add a class if IE lte 7
		// Class specifically useful in applying a margin right fix of -1px to prevent pixel rounding of percentage widths breaking layouts
		if (document.all && !document.querySelector) {
			documentElement[ClassName] = documentElement[ClassName] + ' ielte7';
		}
	},



	// Throttle function to prevent resize craziness, thanks to http://www.nczonline.net/blog/2007/11/30/the-throttle-function/
	// Bastardised a bit as it wasn't working quote right for me. In Firefox at least it firing more than it needed to while resizing the window.
	// The problem was resolved when the timeout ID was assigned as a variable in window object
	throttleID,
	throttle = function(method, scope) {
		window[ClearTimeout](throttleID);
		throttleID = window[SetTimeout](function() {
//console.log('throttlefired');
			method();
		}, 100);
	};


	// Problem with IE6 firing the resize event arbitarily
	// snook http://snook.ca/archives/javascript/ie6_fires_onresize/

	// Set DOM Ready event
	if (document[AddEventListener]) {
		document[AddEventListener]('DOMContentLoaded', domReady, false);
	}

	objectDetection();

	// Expose activeGrids
	window.activeGrids = activeGrids;



})(window, document);
