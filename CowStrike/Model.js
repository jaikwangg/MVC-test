//Model
class Cow {
    constructor(id, breed, color, ageYears, ageMonths) {
      this.id = id;
      this.breed = breed;
      this.color = color;
      this.ageYears = ageYears;
      this.ageMonths = ageMonths;
    }
  
    //นับนมวัว
    calculateMilkProduction() {
        const totalAgeInMonths = (this.ageYears * 12) + this.ageMonths;
        let milkProduction;
        if (this.color === 'white') {
            milkProduction = 120 - totalAgeInMonths;
        } else if (this.color === 'brown') {
            milkProduction = 40 - this.ageYears;
        } else if (this.color === 'pink') {
            milkProduction = 30 - this.ageMonths;
        } else {
            milkProduction = 0; //ถ้าหาสีไม่เจอ
        }
    
        return Math.max(milkProduction, 0); //ผลลัพธ์ขั้นต่ำต้องไม่น้อยกว่า 0
    }
  }
  
//Database
class CowDatabase {
  constructor() {
    this.cows = [];
  }

  //fetch data from cows.json
  loadCows() {
    return fetch('cows.json')
      .then(response => response.json())
      .then(data => {
        this.cows = data.map(cowData => new Cow(
          cowData.id, 
          cowData.breed, 
          cowData.color, 
          cowData.ageYears, 
          cowData.ageMonths
        ));
      })
      .catch(error => console.error('Error loading cow data:', error));
  }
  
  //find cow by ID
  findCowById(id) {
    return this.cows.find(cow => cow.id === id);
  }
  //count total cows
  countCows() {
      return this.cows.length;
  }
}