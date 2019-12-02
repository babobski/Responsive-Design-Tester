var Tester = {
	sizesList: [
		{
			id: 'GLXYNT9',
			label: 'Galaxy Note 9',
			width: 414,
			height: 846,
		},
		{
			id: 'GLXYS9',
			label: 'Galaxy S9/S9+',
			width: 360,
			height: 740,
		},
		{
			id: 'IPAD',
			label: 'Ipad',
			width: 1024,
			height: 768,
		},
		{
			id: 'IPADP',
			label: 'Ipad portret',
			width: 768,
			height: 1024,
		},
		{
			id: 'IPADPRO',
			label: 'Ipad Pro (10.5 inch)',
			width: 1112,
			height: 834,
		},
		{
			id: 'IPADPROP',
			label: 'Ipad Pro (10.5 inch) portret',
			width: 834,
			height: 1112,
		},
		{
			id: 'IPADPRO2',
			label: 'Ipad Pro (12.9 inch)',
			width: 1366,
			height: 1024,
		},
		{
			id: 'IPADPRO2P',
			label: 'Ipad Pro (12.9 inch) portret',
			width: 1024,
			height: 1366,
		},
		{
			id: 'IPHONE5',
			label: 'Iphone 5/SE',
			width: 320,
			height: 568,
		},
		{
			id: 'IPHONE678',
			label: 'Iphone 6/7/8',
			width: 375,
			height: 667,
		},
		{
			id: 'IPHONE678+',
			label: 'Iphone 6/7/8 Plus',
			width: 414,
			height: 736,
		},
		{
			id: 'IPHONEX',
			label: 'Iphone X/XS',
			width: 375,
			height: 812,
		},
		{
			id: 'IPHONEXR',
			label: 'Iphone XR',
			width: 414,
			height: 896,
		},
		{
			id: 'PIXEL2',
			label: 'Pixel 2',
			width: 411,
			height: 731,
		},
		{
			id: 'PIXEL2XL',
			label: 'Pixel 2 XL',
			width: 414,
			height: 823,
		},
		{
			id: 'LAPTOP',
			label: 'Laptop (1280 x 950)',
			width: 1280,
			height: 950,
		},
		{
			id: 'LAPTOP2',
			label: 'Laptop (1280 x 950)',
			width: 1440,
			height: 900,
		},
	],
	init: () => {
		Tester.buildSizesSelect();
		Tester.sizesSelectSetValue('IPHONE678');
	},
	buildSizesSelect: () => {
		var list = document.getElementById('sizesListPopup');
		list.innerHTML = '';
		for (var i = 0; i < Tester.sizesList.length; i++) {
			var currListItem = Tester.sizesList[i];
			list.appendChild(Tester.makeMenuItem(currListItem));
		}
	},
	makeMenuItem: (listItem) => {
		var menuItem = document.createElement('menuitem');
		menuItem.setAttribute('label', listItem.label);
		menuItem.setAttribute('value', listItem.id);
		
		return menuItem;
	},
	sizesSelectHandle: () => {
		var sizesList = document.getElementById('sizesList');
		var selectedIndex = sizesList.selectedIndex;
		
		if (selectedIndex !== -1) {
			var selectSize = sizesList.getItemAtIndex(selectedIndex);
			Tester.resizeWindowToSize(selectSize.value);
		}
	},
	sizesSelectSetValue: (val) => {
		var sizesList = document.getElementById('sizesList');
		
		sizesList.value = val;
	},
	resizeWindowToSize: (id) => {
		var selectedSize = Tester.getSizeById(id),
			selectedWidth = selectedSize.width,
			selectedHeight = selectedSize.height,
			left = (window.screen.availWidth - selectedWidth) / 2,
			top = (window.screen.availHeight - selectedHeight) / 2;
			
		if (top < 0) {
			top = 0;
		}
			
		window.resizeTo(selectedWidth, selectedHeight);
		window.moveTo(left, top);
	},
	getSizeById: (id) => {
		for (var i = 0; i < Tester.sizesList.length; i++) {
			currSize = Tester.sizesList[i];
			if (id === currSize.id) {
				return currSize;
			}
		}
		return null;
	},
	setSource: () => {
		var locationbar = document.getElementById('locationBar'),
			browser = document.getElementById('testerWindow');
		
		if (locationbar.value.length > 0) {	
			browser.loadURI(locationbar.value);
		}
	}
};
window.addEventListener('DOMContentLoaded', Tester.init);
