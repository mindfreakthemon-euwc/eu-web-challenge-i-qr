export default class BaseView {

	/**
	 * A base view class for common property and probably more..
	 * @param parent
	 */
	constructor(parent) {
		this._parent = parent;
	}

	/**
	 * Returns parent container element
	 * @returns {Element}
	 */
	get parent() {
		return this._parent;
	}
}