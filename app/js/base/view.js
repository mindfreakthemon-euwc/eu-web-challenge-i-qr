export default class BaseView {
	constructor(parent) {
		this._parent = parent;
	}

	get parent() {
		return this._parent;
	}
}