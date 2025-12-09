//array.prototype.filter()
//1. filter the list of inventors for those who were born in 1500's
const fifteens = inventors.filter(inventor => (inventor.year >= 1500 && inventor.year < 1600));

//array.prototype.map()
//2. give us an array of the inventory first and last names
const inventoryNames = inventors.map(inventor => inventor.first + " " + inventor.last); 

//array.prototype.sort()
//3. sort the inventors by birthdate, oldest to youngest
const sorted = inventors.sort((a,b) => {
    if (a.year > b.year){
        return 1;
    }
    else{
        return -1;
    }
});

//array.prototype.reduce()
//4. How many year did all the inventors live?
const totalYears = inventors.reduce((total,inventor) =>{
    return total + (inventor.passed - inventor.year);
}, 0)

//5. Sort the inventors by years lived
const oldest = inventors.sort((a,b) => {
    const lastGuy = a.passed - a.year;
    const nextGuy = b.passed - b.year;
    return lastGuy > nextGuy ? -1 : 1;
})

//6. create a list of boulevards in paris that contain "de" anywhere in the name *wikipedia link*

const category = document.querySelector(".mw-category");
const links = [...category.querySelectorAll("a")]; //[...] spread every single item else Array.from(category.querySelectorAll("a"))

const de = links.map(link => link.textContent).filter(streetName => streetName.includes("de"));

//7. sort the people alphabetically by last name
const alpha = people.sort((lastOne, nextOne)=>{
    const [aLast, aFirts] = lastOne.split(", ");
    const [bLast, bFirts] = nextOne.split(", ");
    if(aLast>bLast){
        return 1
    }
    else {
        return -1
    }
})
    

//8. sum up instances of each of these list
const transportation = data.reduce((obj, item) =>{
    if(!obj[item]){
        obj[item] = 0;
    }
    obj[item]++;
    return obj;
}, {})

console.log(transportation)