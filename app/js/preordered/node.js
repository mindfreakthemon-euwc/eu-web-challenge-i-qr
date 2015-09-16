export default class PreorderedNode {

	/**
	 * An object wrapper class for node in the tree
	 * @param name
	 * @param left
	 * @param right
	 */
	constructor({ name, left, right } = data) {
		this._name = name;
		this._left = left;
		this._right = right;
	}

	get name() {
		return this._name;
	}

	get left() {
		return this._left;
	}

	get right() {
		return this._right;
	}

	/**
	 * Returns assumed number of children based on left and right values
	 * @returns {number}
	 */
	get numChildren() {
		return Math.floor((this.right - this.left - 1) / 2);
	}

	/**
	 * Checks if node has children
	 * @returns {boolean}
	 */
	get hasChildren() {
		return this.numChildren > 0;
	}
}