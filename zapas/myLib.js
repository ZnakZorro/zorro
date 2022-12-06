/**
 * Create an array of unique items from a NodeList of items
 * @param  {NodeList} nodeList The original NodeList
 * @return {Array}             The unique array
 */
 function toUniqueArray (nodeList) {
	return [...new Set(nodeList)];
}

/**
 * A function that does stuff
 */
function addClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		console.log(node)
	}
}

/**
 * Another function that does stuff
 */
function removeClasses (nodes, classes) {
	let unique = toUniqueArray(nodeList);
	for (let node of unique) {
		console.log(node)
	}
}

export {addClasses, removeClasses};