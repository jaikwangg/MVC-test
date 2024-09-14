//Controller
class CowController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    
        //load cow data and bind submit event
        this.model.loadCows().then(() => {
            this.view.bindSubmit(this.handleSubmit.bind(this));
            this.updateCowCount();
        });
    }
  
    //handle submit event when input ID
    handleSubmit(event) {
        event.preventDefault();

        this.view.displayMessage('');
        this.view.displayCowData('');
        this.view.showSuggestions([]);

        const cowId = this.view.getInputValue();

        //validate cow ID format
        if (!/^[1-9]\d{7}$/.test(cowId)) {
            this.view.displayMessage("Invalid cow ID.");
            
            const allCowIds = this.model.cows.map(cow => cow.id);
            const suggestions = allCowIds.filter(id => id.startsWith(cowId));
            this.view.showSuggestions(suggestions);

            return;
        }
    
        //find cow by ID in database
        const cow = this.model.findCowById(cowId);
        if (!cow) {
            this.view.displayMessage("Cow not found.");
            return;
        }
    
        //calculate milk production and display
        const milkProduction = cow.calculateMilkProduction();
        this.view.displayMessage(`Cow ID ${cowId} produces ${milkProduction} liters of milk.`);

        //display all cow data
        const cowData = `
            Breed: ${cow.breed}
            Color: ${cow.color}
            Age: ${cow.ageYears} years and ${cow.ageMonths} months
            `;
        this.view.displayCowData(cowData);
    }
  
    //update total count in view
    updateCowCount() {
        const totalCows = this.model.countCows();
        this.view.displayCowCount(totalCows);
    }
}

//init
const app = new CowController(new CowDatabase(), new CowView());