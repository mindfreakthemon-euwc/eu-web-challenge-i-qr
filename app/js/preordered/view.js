import BaseView from 'base/view';
import PreorderedTree from 'preordered/tree'

const SVG_NS = 'http://www.w3.org/2000/svg';

export default class PreorderedView extends BaseView {
	constructor(tree, parent) {
		super(parent);

		this._tree = tree;
		this._hiddenSet = new Set();
	}

	get tree() {
		return this._tree;
	}

	hide(name) {
		this._hiddenSet.add(name);
	}

	show(name) {
		this._hiddenSet.delete(name);
	}

	isHidden(name) {
		return this._hiddenSet.has(name);
	}

	clearHidden() {
		this._hiddenSet.clear();
	}

	render() {
		var svg = this._createSVGNode(),
			g = this._createGNode();

		this.tree.traverse((node, index, level) => {
			var y = 20 + index * 30,
				x = level * 30,
				isHidden = this.isHidden(node.name);

			if (node.hasChildren) {
				let toggle = this._createTextNode({
					value: isHidden ? '+' : '-',
					className: 'toggle no-select',
					y,
					x
				});

				x += 15;

				toggle.addEventListener('click', this._toggleHandler.bind(this, node.name));

				g.appendChild(toggle);
			}

			let text = this._createTextNode({
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

	_toggleHandler(name, e) {
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
	_createTextNode({value, x = 0, y = 0, className = null}) {
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
	_createSVGNode() {
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
	_createGNode({className = null} = {}) {
		var g = document.createElementNS(SVG_NS, 'g');

		if (className) {
			g.setAttribute('class', className);
		}

		return g;
	}
}