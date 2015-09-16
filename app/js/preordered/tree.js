import _ from 'underscore';

import PreorderedNode from 'preordered/node';

export default class PreorderedTree {
	/**
	 * Tree class for working with Preordered
	 * @param list
	 */
	constructor(list) {
		this._list = _.chain(list)
			.sortBy('left')
			.map(object => new PreorderedNode(object))
			.value();
	}

	/**
	 * A traverse function that call callee for each node.
	 * If returned value from the callee is false, traverse
	 * stops iterating through other nodes of this sub-tree (child nodes)
	 * @param {Function} callee - callback (row, index, level)
	 */
	traverse(callee) {
		var stack = [],
			index = 0,
			lock = false;

		_.each(this.list, (row) => {
			if (stack.length) {
				while (stack[stack.length - 1] < row.right) {
					stack.pop();

					// since we got back we can release the lock
					lock = false;
				}
			}

			if (lock) {
				// don't traverse this node
				return;
			}

			let result = callee.call(this, row, index, stack.length);

			if (result === false) {
				// now we don't traverse the rest of child nodes
				lock = true;
			}

			index++;

			stack.push(row.right);
		});
	}

	/**
	 * Returns root node of the tree
	 * @returns {PreorderedNode}
	 */
	get root() {
		return _.findWhere(this.list, {
			left: 1
		});
	}

	/**
	 * Returns list of nodes
	 * @returns {PreorderedNode[]}
	 */
	get list() {
		return this._list;
	}

	/* static */

	/**
	 * Performs a check on a list if that's a valid tree definition
	 * @param list
	 * @returns {boolean}
	 */
	static isValid(list) {
		if (!_.isArray(list)) {
			return true;
		}

		if (_.some(list, item => !_.has(item, 'name') || !_.has(item, 'left') || !_.has(item, 'right'))) {
			// item should contain the following keys: name, left, right
			return true;
		}

		if (_.some(list, item => item.right <= item.left)) {
			// { "left": 4, "right": 2 } is an error
			return true;
		}

		return false;
	}
}