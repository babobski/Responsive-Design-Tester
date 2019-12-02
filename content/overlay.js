xtk.load('chrome://rspnsvdsgn/content/helper.js');
/**
 * Namespaces
 */
if (typeof(extensions) === 'undefined') extensions = {};
if (typeof(extensions.rspnsvdsgn) === 'undefined') extensions.rspnsvdsgn = {
	version: '1.0.0'
};
(function() {
	var notify = require("notify/notify"),
		$ = require("ko/dom"),
		self = this,
		search = false,
		notification = false,
		editor = require("ko/editor"),
		parse = ko.uriparse,
		helper = new Helper(),
		prefs = Components.classes["@mozilla.org/preferences-service;1"]
		.getService(Components.interfaces.nsIPrefService).getBranch("extensions.rspnsvdsgn.");


	if (!('extensions' in	ko)) ko.extensions = {};
	var myExt = "ResponsiveDesign@babobski.nl";
	if (!(myExt in ko.extensions)) ko.extensions[myExt] = {};
	if (!('myapp' in ko.extensions[myExt])) ko.extensions[myExt].myapp = {};
	var rspnsvdsgnData = ko.extensions[myExt].myapp;

	this._notifcation = function($message, error){
		$message =$message || false;
		error = error || false;
		
		var msgType = prefs.getCharPref('msgType');
		
		if (msgType === 'web-notifications') {
			
			if (!notification) {
				notification = true;
				var icon = error ? 'chrome://rspnsvdsgn/content/rspnsvdsgn-error-icon.png' : 'chrome://rspnsvdsgn/content/rspnsvdsgn-icon.png';
				if (!("Notification" in window)) {
					alert("This browser does not support system notifications");
				}
				
				else if (Notification.permission === "granted") {
					var options = {
					body: $message,
					icon: icon
					}
					var n = new Notification('Responsive Design Tester', options);
					setTimeout(function(){
						n.close.bind(n);
						notification = false;
					}, 5000); 
				}
				
				else if (Notification.permission !== 'denied') {
					Notification.requestPermission(function (permission) {
					if (permission === "granted") {
						var options = {
							 body: $message,
							 icon: icon
						 }
						 var n = new Notification('Responsive Design Tester', options);
						setTimeout(function(){
							n.close.bind(n);
							notification = false;
						}, 5000); 
					}
					});
				}
			} else {
				setTimeout(function(){
					self._notifcation($message, error);
				}, 200);
			}
			
			
		} else {
			notify.send(
					$message,
					'tools'
			);
		}
	}

	var features = "chrome,centerscreen,resizable"; // dependent
	this.openResponsiveDesignTester = function() {
		var windowVars = {
			ko: ko,
			rspnsvdsgnData: rspnsvdsgnData,
			prefs: prefs,
		};
		
		window.openDialog('chrome://rspnsvdsgn/content/ResponsiveDesignTester.xul', "ResponsiveDesignTester", features, windowVars);
	}
	
	this._addDynamicToolbarButton = () => {
		const db = require('ko/dynamic-button');
		var isView = () => {
			return ko.views.manager.currentView;
		};
		
		const button = db.register({
			label: "Responsive Design Tester",
			tooltip: "Responsive Design Tester",
			icon: "phonegap",
			events: [
				"current_view_changed",
			],
			command: () => {
				extensions.rspnsvdsgn.openResponsiveDesignTester();
			},
			isEnabled: () => {
				return isView();
			},
		});
	};
	
	self._addDynamicToolbarButton();

}).apply(extensions.rspnsvdsgn);
