//View
class CowView {
    constructor() {
        this.app = this.getElement('#app');

        this.form = this.createElement('form');
        this.input = this.createElement('input');
        this.submitButton = this.createElement('button', 'Submit');
        this.result = this.createElement('p');
        this.cowCountDisplay = this.createElement('p', 'Total cows: 0'); //show cow count
        this.cowDataDisplay = this.createElement('pre'); //show cow data
        this.suggestion = this.createElement('ul'); //suggestions list
  
        this.form.append(this.input, this.submitButton);
        this.app.append(this.cowCountDisplay, this.form, this.result, this.cowDataDisplay, this.suggestion);

        this.suggestion.style.display = 'none';
    }
  
    //get input
    getInputValue() {
        return this.input.value;
    }
  
    //display in view
    displayMessage(message) {
        this.result.textContent = message;
    }
    
    //bind submit event to controller
    bindSubmit(handler) {
        this.submitButton.addEventListener('click', handler);
    }
    
    //display total number of cows
    displayCowCount(count) {
        this.cowCountDisplay.textContent = `Total cows: ${count}`;
    }

    //display cow data
    displayCowData(data) {
        this.cowDataDisplay.textContent = data;
    }
  
    //function to create an element with a class
    createElement(tag, textContent = '') {
        const element = document.createElement(tag);
        element.textContent = textContent;
        return element;
    }
  
    //function to get an element from the DOM
    getElement(selector) {
        return document.querySelector(selector);
    }

    //filtered IDs
    showSuggestions(ids) {
        
        this.suggestion.innerHTML = '';

        ids.forEach(id => {
        const listItem = this.createElement('li', id);
            listItem.addEventListener('click', () => {
            this.input.value = id;
            this.suggestion.style.display = 'none';
        });
            this.suggestion.appendChild(listItem);
        });

        this.suggestion.style.display = ids.length > 0 ? 'block' : 'none';
    }
}
  