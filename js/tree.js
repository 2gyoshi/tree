'use strict'

class Component {
	constructor(name) {
		this.name = name;
		this.children = [];
		this.parent = null;
		this.root = this;
		this.elemet = null;
	}

	createTree = (json) => {
		//for (let row of json) {
		//	row.
		//}
	}




	setRoot = (root) => {
		this.root = root;
	}
	getRoot = () => {
		return this.root;
	}
	setParent = (parent) => {
		this.parent = parent;
	}
	getParent = () => {
		return this.parent;
	}
	addChild = (child) => {
		this.children.push(child);
		return this;
	}
	render = () => {
		const div = document.createElement('div');
		div.addEventListener('click', this.onClick);
		div.classList.add('tree-item');

		if (this.children.length > 0) {
			div.classList.add('parent');
		} else {
			div.classList.add('child');
		}
		if (this.getDepth() === 0) {
			div.classList.add('open');
		}
		if (this.getDepth() > 1) {
			div.classList.add('hide');
		}
		const span = document.createElement('span');
		span.insertAdjacentHTML('beforeend', this.name);
		span.style.position = 'relative';
		span.style.left = (this.getDepth() * 10) + 'px';

		this.elemet = div;
		div.insertAdjacentElement('beforeend', span);
		document.querySelector('.sidebar').insertAdjacentElement('beforeend', div);

		for (let child of this.children) {
			child.render();
		}
	}
	getDepth = () => {
		let target = this;
		let depth = 0;
		while (target.hasParent()) {
			depth += 1;
			target = target.getParent();
		}
		return depth;
	}
	hasParent = () => {
		return this.getParent() !== null;
	}
	onClick = () => {
		this.selectItem();
		if (this.isShowChildren() === true) {
			this.showChildren();
		} else if (this.getDepth() > 0) {
			this.hideChildren();
		}
	}
	selectItem = () => {
		this.getRoot().removeSelectItem();

		let layer = this.getLayer()
		for (let item of layer) {
			item.elemet.classList.add('select');
		}
	}

	removeSelectItem = () => {
		this.elemet.classList.remove('select');

		for (let child of this.children) {
			child.removeSelectItem();
		}
	}

	isShowChildren = () => {
		let result = false;
		for (let child of this.children) {
			result = child.elemet.classList.contains('hide') === true;
		}
		return result;
	}
	showChildren = () => {
		this.elemet.classList.add('open');
		for (let child of this.children) {
			child.elemet.classList.remove('hide');
		}
	}
	hideChildren = (target) => {
		this.elemet.classList.remove('open');
		for (let child of this.children) {
			child.elemet.classList.add('hide');

			child.hideChildren();
		}
	}
	getLayer = () => {
		let result = [];
		let target = this;
		while (target.hasParent()) {
			result.push(target);
			target = target.getParent();
		}
		return result;
	}
	
}

class Composite extends Component {
	constructor(obj) {
		super(obj);
	}
}

class Leaf extends Component {
	constructor(obj) {
		super(obj);
	}
	addChild = () => {
		console.log('使用できません');
	}
}


(function () {
	const obj = {
		items: {
			Test1_1: {
				Test2_1: [
					'Test3_1',
					'Test3_2',
					'Test3_3',
				]
			},
			Test1_2: {
				Test2_1: [
					'Test3_1',
				],
				Test2_2: [
					'Test3_1',
				],
				Test2_3: [
					'Test3_1',
					'Test3_2',
					'Test3_3',
				],
				Test2_4: [
                	'Test3_1',
				]
			},
			Test1_3: {
				Test2_1: [
                	'Test3_1',
				],
				Test2_2: [
					'Test3_1',
					'Test3_2',
					'Test3_3',
				]
			}
		}
	}

	function makeTree(obj, parent) {
		for (let k of Object.keys(obj)) {
			if (typeof obj[k] === 'object') {
				let com = new Component(k);
				com.setParent(parent)
				com.setRoot(root);
				parent.addChild(com);
				makeTree(obj[k], com);
			}
			else {
				let leaf = new Leaf(obj[k]);
				leaf.setParent(parent);
				leaf.setRoot(root);
				parent.addChild(leaf);
			}
		}
	}

	const root = new Component('ALL');
	makeTree(obj.items, root);
	root.render();

}());

//class ExpandItem {
//	/// <summary>コンストラクタ</summary>
//	constructor(obj) {
//		this.items = obj.items;
//		this.parentNode = document.querySelector(obj.parentNode);
//		this.element = document.createElement('div');
//		this.cssClass = 'expand-item';
//		this.selectedItem = null;

//		this.init();
//	}

//	/// <summary>初期化</summary>
//	init = () => {
//		this.createElement();
//		this.exportItemsToParent()
//	}

//	/// <summary>要素を作成する</summary>
//	createElement = () => {
//		// TODO: 要素の作り方を変える
//		let element1 = null;
//		let element2 = null;
//		let element3 = null;
//		for(let k1 of Object.keys(this.items)) {
//			element1 = document.createElement('div');
//			element1.insertAdjacentHTML('beforeend', '<span data-category="server">' + k1 + '</span>');
//			element1.classList.add(this.cssClass, 'parent');
//			element1.setAttribute('data-category', 'server');

//			if (typeof this.items[k1] === "object") {
//				for (let k2 of Object.keys(this.items[k1])) {
//					element2 = document.createElement('div');
//					element2.insertAdjacentHTML('beforeend', '<span data-category="db">' + k2 + '</span>');
//					element2.classList.add(this.cssClass, 'parent', 'hidden');

//					element1.insertAdjacentElement('beforeend', element2);

//					if (typeof this.items[k1][k2] === "object") {
//						for (let k3 of Object.keys(this.items[k1][k2])) {
//							element3 = document.createElement('div');
//							element3.insertAdjacentHTML('beforeend', '<span data-category="table">' + this.items[k1][k2][k3] + '</span>');
//							element3.classList.add(this.cssClass, 'buttom', 'hidden');

//							element2.insertAdjacentElement('beforeend', element3);
//						}
//					}
//				}
//			}
//			this.element.insertAdjacentElement('beforeend', element1);
//		}
//	}

//	/// <summary>要素を書き出す</summary>
//	exportItemsToParent = () => {
//		if (this.element === null) {
//			alert('boo');
//			return;
//		}
//		this.parentNode.insertAdjacentElement('beforeend', this.element)
//	}

//	/// <summary>要素にイベントを設定する</summary>
//	attachEvent = () => {
//		if (this.element === null) {
//			alert('boo');
//			return;
//		}

//		this.element.addEventListener('click', this.onClick)
//	}

//	/// <summary>クリックイベント</summary>
//	onClick = (e) => {
//		// イベントの伝搬を止める
//		e.stopPropagation();
//		const clickedItem = e.target;
//		const clickedGroup = clickedItem.parentNode;

//		if (this.selectedItem !== null) {
//			this.selectedItem.classList.remove('selected');
//		}
//		clickedItem.classList.add('selected');
//		this.selectedItem = clickedItem;

//		// 階層を閉じる時の処理
//		if (clickedGroup.classList.contains('expanded') === true) {
//			clickedGroup.classList.remove('expanded');
//			this.removeAllProgenyCssClass(clickedGroup, 'expanded')
//			this.addAllProgenyCssClass(clickedGroup, 'hidden');

//			return;
//		}

//		// 階層を展開するとき
//		if (clickedGroup.children.length > 0) {
//			clickedGroup.classList.add('expanded');
//			this.removeChildrenCssClass(clickedGroup, 'hidden');

//			return;
//		}

//	}
	
//	/// <summary>すべての子孫要素からclassを削除</summary>
//	removeAllProgenyCssClass = (targetElement, cssClass) => {
//		if (targetElement.children.length < 1) { return; }

//		const children = targetElement.children;
//		if (children.length < 1) { return; }
//		for (let i = 0; i < children.length; i++) {
//			this.removeAllProgenyCssClass(children[i], cssClass);
//			children[i].classList.remove(cssClass);
//		}
//	}

//	/// <summary>すべての子孫要素にclassを追加</summary>
//	addAllProgenyCssClass = (targetElement, cssClass) => {
//		if (targetElement.children.length < 1) { return; }

//		const children = targetElement.children;
//		for (let i = 0; i < children.length; i++) {
//			this.addAllProgenyCssClass(children[i], cssClass);
//			children[i].classList.add(cssClass);
//		}
//	}

//	/// <summary>子要素からclassを削除</summary>
//	removeChildrenCssClass = (targetElement, cssClassName) => {
//		const children = targetElement.children;
//		for (let i = 0; i < children.length; i++) {
//			children[i].classList.remove(cssClassName);
//		}
//	}
		
//	/// <summary>子要素にclassを追加</summary>
//	addChildrenCssClass = (targetElement, cssClassName) => {
//		const children = targetElement.children;
//		for (let i = 0; i < children.length; i++) {
//			children[i].classList.add(cssClassName);
//		}
//	}

//	/// <summary>親階層の存在確認をする</summary>
//	hasParentExpandItem = (targetElement) => {
//		return targetElement.parentNode.classList.contains(this.cssClass);
//	}

//	/// <summary>クリックされたアイテムの階層を取得する</summary>
//	getSelectedItemLayer = (targetElement) => {
//		let result = [];
//		let target = targetElement;
//		let parent = null;
//		while (this.hasParentExpandItem(target)) {
//			parent = target.parentNode;
//			result.push(parent.firstChild.innerHTML);
//			target = parent;
//		}
//		return result;
//	}

//}