import BaseView from 'base/view';
import PreorderedTree from 'preordered/tree'

const SVG_NS = 'http://www.w3.org/2000/svg';

export default class PreorderedView extends BaseView {

	/**
	 * A view class for displaying PreorderedTree
	 * @param {PreorderedTree} tree
	 * @param {Element} parent An element to render SVG into
	 */
	constructor(tree, parent) {
		super(parent);

		this._tree = tree;
		this._hiddenSet = new Set();
	}

	/**
	 * @returns {PreorderedTree}
	 */
	get tree() {
		return this._tree;
	}

	/**
	 * Sets hidden flag on a node with a given name
	 * @param name
	 */
	hide(name) {
		this._hiddenSet.add(name);
	}

	/**
	 * Removes hidden flag on a node with a given name
	 * @param name
	 */
	show(name) {
		this._hiddenSet.delete(name);
	}

	/**
	 * Checks if the node has hidden flag
	 * @param name
	 * @returns {boolean}
	 */
	isHidden(name) {
		return this._hiddenSet.has(name);
	}

	/**
	 * Removes all hidden flags
	 */
	clearHidden() {
		this._hiddenSet.clear();
	}

	render() {
		var svg = PreorderedView._createSVGNode(),
			g = PreorderedView._createGNode();

		this.tree.traverse((node, index, level) => {
			var y = 20 + index * 30,
				x = level * 30,
				isHidden = this.isHidden(node.name);

			if (node.hasChildren) {
				let toggle = PreorderedView._createTextNode({
					value: isHidden ? '+' : '-',
					className: 'toggle no-select',
					y,
					x
				});

				x += 15;

				toggle.addEventListener('click', this._toggleHandler.bind(this, node.name));

				g.appendChild(toggle);
			}

			let text = PreorderedView._createTextNode({
				value: node.name,
				y,
				x
			});

			g.appendChild(text);

			return !isHidden;
		});

		svg.appendChild(g);

		this.parent.innerHTML = '';
		this.parent.appendChild(svg);

		return this;
	}

	/* private: */

	/**
	 * Event handler for the click on toggles in the tree view
	 * @param name
	 * @private
	 */
	_toggleHandler(name) {
		if (this.isHidden(name)) {
			this.show(name);
		} else {
			this.hide(name);
		}

		this.render();
	}

	/**
	 * Creates a SVG text node with specified attributes
	 * @param value
	 * @param x
	 * @param y
	 * @param className
	 * @returns {Element}
	 * @private
	 */
	static _createTextNode({value, x = 0, y = 0, className = null}) {
		var text = document.createElementNS(SVG_NS, 'text');

		text.appendChild(document.createTextNode(value));
		text.setAttributeNS(null, 'x', x);
		text.setAttributeNS(null, 'y', y);

		if (className) {
			text.setAttribute('class', className);
		}

		return text;
	}


	/**
	 * Creates SVG element
	 * @returns {Element}
	 * @private
	 */
	static _createSVGNode() {
		var svg = document.createElementNS(SVG_NS, 'svg');

		svg.setAttribute('class', 'tree');
		svg.setAttributeNS(null, 'width', '500');
		svg.setAttributeNS(null, 'height', '500');

		return svg;
	}

	/**
	 * Create SVG Group element
	 * @param className
	 * @returns {Element}
	 * @private
	 */
	static _createGNode({className = null} = {}) {
		var g = document.createElementNS(SVG_NS, 'g');

		if (className) {
			g.setAttribute('class', className);
		}

		return g;
	}
}