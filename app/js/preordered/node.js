export default class PreorderedNode {
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

	get numChildren() {
		return Math.floor((this.right - this.left - 1) / 2);
	}

	get hasChildren() {
		return this.numChildren > 0;
	}
}