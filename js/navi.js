'use strict'

class Navi extends Observer {
	constructor() {
		super();
		this.value   = null;
		this.element = null;
		this.target  = document.querySelector('#js-top');
	}

	update(object){
		this.value = object.getSelectedValues();
		this.render();
	}

	createElement() {
		this.element = document.createElement('div');
		this.element.classList.add('navi');
		for(let v of this.value) {
			let item = document.createElement('div');
			item.classList.add('navi-item');
			item.insertAdjacentHTML('beforeend', v);
			this.element.insertAdjacentElement('beforeend', item);
		}
	}

	render(target){
		if(target !== undefined) {
			this.target = target;
		}
		this.target.innerHTML = '';
		this.createElement();
		this.target.insertAdjacentElement('beforeend', this.element);
	}
}
