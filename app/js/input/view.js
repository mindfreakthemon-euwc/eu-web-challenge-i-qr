import _ from 'underscore';

import BaseView from 'base/view';
import PreorderedTree from 'preordered/tree'
import PreorderedView from 'preordered/view'

export default class InputView extends BaseView {

	/**
	 * General view class
	 * @param parent
	 */
	constructor(parent) {
		super(parent);

		this._input = this.parent.querySelector('textarea');
		this._svgContainer = this.parent.querySelector('#svg-container');
		this._error = this.parent.querySelector('.error-message');

		this._input.addEventListener('keyup', _.debounce(this._keyupHandler.bind(this), 100));
	}

	/**
	 * Display a tree represented by preordered list
	 * @param list
	 */
	displayTree(list) {
		let tree = new PreorderedTree(list),
			view = new PreorderedView(tree, this._svgContainer);

		view.render();
	}

	/**
	 * Display an error message
	 * @param message
	 */
	displayError(message) {
		this._error.innerText = message;
		this._error.classList.add('shown');
	}

	/**
	 * Set input value to a given
	 * @param value
	 */
	setInputValue(value) {
		this._input.value = value;
	}

	/**
	 * Convert input value to a list and display it
	 */
	convertInputValue() {
		var value = this._input.value,
			list = [];

		try {
			list = JSON.parse(value);
		} catch (e) {
			this.displayError('The JSON is malformed.');

			return;
		}

		if (PreorderedTree.isValid(list)) {
			this.displayError('The tree is not valid.');

			return;
		}

		if (!list.length) {
			this.displayError('There is nothing to display.');

			return;
		}

		this.displayTree(list);
	}

	/* private: */

	/**
	 * Keyup event handler for the textarea input
	 * @private
	 */
	_keyupHandler() {
		this._error.classList.remove('shown');

		this.convertInputValue();
	}
}