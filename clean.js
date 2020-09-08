/* 
    Clean Code
    Robert C. Martin
*/


// Meaningful naming

// Bad
const yyyymmdstr = moment().format("YYYY/MM/DD");

// Good
const currentDate = moment().format("YYYY/MM/DD");


// Terminoly or Vocabulary
// Bad
getUserInfo();
getClientData();
getCustomerRecord();

/*
Product
Client/User/Customer/Visitor -> User
Cart
Price
Order
View
Page
Discount
*/

// Good
getUser();

// Better
userKit().get()
userKit().change()
userKit().changePassword()

// Use searchables names - Name magic numbers
// Bad
setTimeout(changeDay, 86400000);

// Good
const MILLISECONDS_IN_A_DAY = 86400000
setTimeout(blastOff, MILLISECONDS_IN_A_DAY);

const API_RATE_LIMIT = 5.25*1000
setTimeout(blastOff, API_RATE_LIMIT);

// Avoid mental mapping
// Bad
const locations = ["Austin", "New York", "San Francisco"];
let arr = []
locations.forEach(l => {
    doSomething()
    //...
    //...
    //...
    //...
    arr.append(l)
})

// Good
const locations = ["Austin", "New York", "San Francisco"];
let arr = []
locations.forEach(location => {
    doSomething()
    //...
    //...
    //...
    //...
    arr.append(location)
})


// Bad
const Car = {
    carMake: "Honda",
    carModel: "Accord",
    carColor: "Blue"
};

function paintCar(car) {
    car.carColor = "Red";
}

// Good
const Car = {
    make: "Honda",
    model: "Accord",
    color: "Blue"
};
  
function paintCarRed(car) {
    paintCar(car, "Red")
}

function paintCarBlue(car) {
    paintCar(car, "Blue")
}

function paintCar(car, color) {
    car.color = color
}


// Bad
function createCoffeeShop(name) {
    const coffeeShopName = name || "Starbucks"
}

// Good
function createCoffeeShop(name = "Starbucks") {

}

createCoffeeShop("Janis Coffee Shop") // Creates a coffee shop called "Janis Coffee Shop"
createCoffeeShop() // Creates a coffee shop called "Starbucks"


// Functions should do one thing!

// Bad
function emailClients(clients) {
    clients.forEach(client => {
      const clientRecord = database.lookup(client);
      if (clientRecord.isActive()) {
        email(client);
      }
    });
}

// Good
function isActiveClient(client) {
    const clientRecord = database.lookup(client);
    return clientRecord.isActive()
}

function emailActiveClients(clients) {
    clients.filter(isActiveClient).forEach(client)
}

// Descriptive function names

// Bad
function addToDate(date, month) {
    // ..
}
  
const date = new Date();
addToDate(date, 1);

// Good

function addMonthToDate(month, date) {

}

const date = new Date();
addMonthToDate(1, date);


// Remove duplicate code

function showDeveloperList(developers) {
    developers.forEach(developer => {
      const expectedSalary = developer.calculateExpectedSalary();
      const experience = developer.getExperience();

      const githubLink = developer.getGithubLink();
      const data = {
        expectedSalary,
        experience,
        githubLink
      };
  
      render(data);
    });
}
  
function showManagerList(managers) {
    managers.forEach(manager => {
      const expectedSalary = manager.calculateExpectedSalary();
      const experience = manager.getExperience();

      const portfolio = manager.getMBAProjects();
      const data = {
        expectedSalary,
        experience,
        portfolio
      };
  
      render(data);
    });
}

// Good

function showEmployeeList(employees) {
    employees.forEach(employee => {
        const expectedSalary = employee.calculateExpectedSalary()
        const experience = employee.getExperience()
        const data = {
            expectedSalary,
            experience
        }

        // employee.type = manager/developer
        if(employee.type == "manager") {
            data.portfolio = employee.getMBAProjects()
        }
        if(employee.type == "developer") {
            data.githubLink = employee.getGithubLink()
        }

        render(data)
    })

}

// Encapsulate conditionals

// Bad

if (state === "fetching" && isEmpty(listNode)) {
    // showSpinner()
}
  
// Good

function shouldShowSpinner(state, listNode) {
    return state === "fetching" && isEmpty(listNode)
}

if(shouldShowSpinner(state, listNode)) {
    // showSpinner()
}


// Avoid negative conditionals

// Bad

function isUserNotLoggedIn() {

}

if(!isUserNotLoggedIn) { //is user logged in?

}

// Good

function isUserLoggedIn() {

}

if(!isUserLoggedIn) { // is user logged out?

}

// Dead code

// Bad

function oldRequestModule(url) {
    // ...
}
  
function newRequestModule(url) {
    // ...
}
  
const req = newRequestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");

// Good

function requestModule(url) {
    // ...
}
  
const req = requestModule;
inventoryTracker("apples", req, "www.inventory-awesome.io");


// Library
<Button />

// Component
<ButtonPrimary /> // <Button theme="primary" />

// productListPage.js, productDetailPage.js
<ButtonPrimary />
