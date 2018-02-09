if (!global.requestAnimationFrame) {
	global.requestAnimationFrame = (callback) => {
		global.setTimeout(callback, 0);
	};
}
