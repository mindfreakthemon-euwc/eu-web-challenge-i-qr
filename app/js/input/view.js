import _ from 'underscore';

import BaseView from 'base/view';
import PreorderedTree from 'preordered/tree'
import PreorderedView from 'preordered/view'

const INPUT_DEFAULT_VALUE =  `[
{ "name": "Cars", "left": 1, "right": 18 },
{ "name": "Fast", "left": 2, "right": 11 },
{ "name": "Red", "left": 3, "right": 6 },
{ "name": "Ferrari", "left": 4, "right": 5 },
{ "name": "Yellow", "left": 7, "right": 10 },
{ "name": "Lamborghini", "left": 8, "right": 9 },
{ "name": "Slow", "left": 12, "right": 17 },
{ "name": "Lada", "left": 13, "right": 14 },
{ "name": "Polonez", "left": 15, "right": 16 }
]`;

export default class InputView extends BaseView {
	constructor(parent) {
		super(parent);

		this._input = this.parent.querySelector('textarea');
		this._svgContainer = this.parent.querySelector('#svg-container');
		this._error = this.parent.querySelector('.error-message');

		this._input.value = INPUT_DEFAULT_VALUE;

		this._convertInputValue();

		this._input.addEventListener('keyup', _.debounce(this._keyupHandler.bind(this), 100));
	}

	displayTree(list) {
		let tree = new PreorderedTree(list),
			view = new PreorderedView(tree, this._svgContainer);

		view.render();
	}

	displayError(message) {
		this._error.innerText = message;
		this._error.classList.add('shown');
	}

	/* private: */

	_keyupHandler(e) {
		this._error.classList.remove('shown');

		this._convertInputValue();
	}

	_convertInputValue() {
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
}