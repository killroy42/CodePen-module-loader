/*
	Title: CodePen Module Loader v 1.0.1
	Author: Sven Neumann <killroy@gmail.com>
	GitHub: https://github.com/killroy42/CodePen-module-loader
	CodePen: http://codepen.io/killroy/pen/xVqNeL
*/
var module = module || (function(global) {
	var modules = [];
	var moduleSystem = Object.create({}, {
		get: {value: function(name) {
			// Retrieve module by index 0 = first, etc
			if(modules[name] !== undefined) return modules[name];
			for(var i = 0; i < modules.length; i++) {
				var module = modules[i];
				// retrive module by function name: module.exports = function name()
				if(module.name === name) return module;
				// retrive module by exported key: module.exports[name] = exportedValue
				if(module[name] !== undefined) return module[name];
			}
			if(global[name] !== undefined) return global[name];
		}},
		exports: {
			set: function(val) {
				modules.push(val);
			},
			get: function() {
				if(modules.length === 0) modules.push({});
				return modules[modules.length-1];
			}
		}
	});
	return moduleSystem;
})(window);

var require = require || function require(name) {
	return module.get(name);
};