'use strict'

class Subject {
	constructor() {
		this.observers = [];
	}
	
	addObserver(observer) {
		this.observers.push(observer);
	}
	
	removeObserver(observer){
		this.observers.remove(observer);
	}
	
	notifyObservers() {
		for(let ob of this.observers) {
			ob.update();
		}
	}

	notifyObservers(object) {
		for(let ob of this.observers) {
			ob.update(object);
		}
	}
}
