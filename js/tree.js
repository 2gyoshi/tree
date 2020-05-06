'use strict'

class Tree extends Subject {
	constructor(value) {
		super();
		this.value        = value;
		this.target       = null;
		this.root         = this;
		this.parent       = null;
		this.children     = [];
		this.cssClassList = [];
		this.isOpen       = true;
		this.type         = 'tree';
	}

	addObserver(observer) {
		this.observers.push(observer);
		for(let child of this.children) {
			child.addObserver(observer);
		}
	}

	addChild(child) {
		child.root   = this.root;
		child.parent = this;
		this.children.push(child);

		return this;
	}

	setCssClass(cssClass) {
		this.element.classList.add(cssClass);
	}

	removeCssClass(cssClass) {
		this.element.classList.remove(cssClass);
	}

	createElement() {
		this.element = document.createElement('div');
		this.element.style.paddingLeft = (this.getDepth() * 10) + 'px';
		this.element.addEventListener('click', this.onClickItem.bind(this));

		if(this.type !== 'leaf') {
			const btn = document.createElement('button');
			btn.addEventListener('click', this.onClickBtn.bind(this));
			this.element.insertAdjacentElement('beforeend', btn);
		}
		
		const span = document.createElement('span');
		span.insertAdjacentHTML('beforeend', this.value);
		this.element.insertAdjacentElement('beforeend', span);

		for(let cssClass of this.cssClassList) {
			this.setCssClass(cssClass);
		}
	}

	render(target) {
		if(target !== undefined) {
			this.target = target;
		}

		this.createElement();
		target.insertAdjacentElement('beforeend', this.element);
		
		for (let child of this.children) {
			child.render(this.target);
		}
	}

	onClickBtn(e) {
		if(this.isOpen === true) {
			this.close();
			return;
		}
		this.open();
		e.stopPropagation();
	}

	open() {
		this.isOpen = true;
		this.removeCssClass('close');
		for (let child of this.children) {
			child.removeCssClass('hide');
		}
	}

	close() {
		this.isOpen = false;
		this.setCssClass('close');
		for (let child of this.children) {
			child.setCssClass('hide');
			child.close();
		}
	}

	onClickItem() {
		this.notifyObservers(this);
	}

	getSameValueChild(value) {
		for (let child of this.children) {
			if(child.value === value) {
				return child;
			}
		}
		return null;
	}
	
	getDepth(){
		let result = 0;
		let target = this;
		while(target.parent !== null) {
			result++;
			target = target.parent;
		}
		return result;
	}

	getSelectedValues(){
		let result = [];
		let target = this;
		while(target.parent !== null) {
			result.push(target.value);
			target = target.parent;
		}
		return result.reverse();
	}
}

class Node extends Tree {
	constructor(text) {
		super(text);
		this.type = 'node';
		this.cssClassList.push('node');
	}
}

class Leaf extends Tree {
	constructor(text) {
		super(text);
		this.type = 'leaf';
		this.cssClassList.push('leaf');
	}

	addChild(child) {
		throw 'not available';
	}
}
