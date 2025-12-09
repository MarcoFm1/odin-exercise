const inventors = [
    { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642},
{ first: 'Marie', last: 'Curie',year:1867,passed: 1934},
{ first: 'Johannes', last: 'Kepler', year: 1571,passed: 1630 },
{ first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
{ first: 'Max', last: 'Planck', year: 1858,passed: 1947 },
];

const people = ['Beck, Glenn', 'Becker, Carl', 'Beckett, Samuel', 'Beddoes, Mick Beecher, Henry', 'Beethoven, Ludwig', 'Begin, Menachem', 'Belloc, Hilaire', 'Bellow, Saul', 'Benchley, Robert', 'Benenson, Peter', 'Ben-Gurion, David', 'Benjamin, Walter', 'Benn, Tony', 'Bennington, Chester', 'Benson, Leana', 'Bent, Silas', 'Bentsen, Lloyd', 'Berger, Ric', 'Bergman, Ingmar', 'Berio, Luciano', ' Berle, Milton', 'Berlin, Irving', 'Berne, Eric', 'Bernhard, Sandra', 'Berra, Yogi' , 'Berry, Halle', 'Berry, Wendell', 'Bethea, Erin', 'Bevan, Aneurin', 'Bevel, Ken' , 'Biden, Joseph', 'Bierce, Ambrose', 'Biko, Steve', 'Billings, Josh', 'Biondo, Frank', 'Birrell, Augustine', 'Black Elk', 'Blair, Robert', 'Blair, Tony', 'Blake, William'];

const people2 = [
{name: 'Wes', year: 1988},
{ name: 'Kait', year: 1986},
{ name: 'Irv', year: 1970 },
{ name: 'Lux', year: 2015 },
];
const comments = [
{ text: 'Love this!', id: 523423},
{text: 'Super good', id: 823423},
{text: 'You are the best', id: 2039842},
{text: 'Ramen in my fav food ever', id: 123523 },
{ text: 'Nice Nice Nice!', id: 542328 }
];



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


//array.prototype.some()
//9. is at least one person 19?
const isAdult = people2.some(person => {
    const currentYear = (new Date()).getFullYear();
    if(currentYear - person.year >= 19){
        return true;
    }
}) 
console.log({isAdult});

//array.prototype.every()
//10. is every 19?
const allAdult = people2.every(person => {
    const currentYear = (new Date()).getFullYear();
    if(currentYear - person.year >= 19){
        return true;
    }
}) 
console.log({allAdult});

//array.prototype.find() Find is like filter but instead return just the one you looking for
//11. find the comment with the ID of 823423
const comment = comments.find((comment) =>{
    if(comment.id == 823423){
        return true
    }
});
console.log(comment);

//array.prototype.findIndex()
//find the comment with this id
//delete the comment with the id of 823423
const index = comments.findIndex(comment => comment.id === 823423);
comment.splice(index,1);

const newComments = [
    ...comments.slice(0,index),
    ...comment.slice(index + 1)
]