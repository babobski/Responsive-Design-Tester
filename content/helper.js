(function() {
	this.RDT = function() {

		this.notEmpty = function(obj) {
			for (var prop in obj) {
				if (obj.hasOwnProperty(prop))
					return true;
			}

			return JSON.stringify(obj) !== JSON.stringify({});
		}

		this.InArray = function(search, array) {
			for (var i = 0; i < array.length; i++) {
				if (array[i] == search) {
					return true;
				}
			}
			return false;
		}

		this.focusWin = function(windowName) {
			var wenum = Components.classes["@mozilla.org/embedcomp/window-watcher;1"]
				.getService(Components.interfaces.nsIWindowWatcher)
				.getWindowEnumerator();
			var index = 1;

			while (wenum.hasMoreElements()) {
				var win = wenum.getNext();
				if (win.name == windowName) {
					win.focus();
					return;
				}
				index++
			}
		}

	}
}());