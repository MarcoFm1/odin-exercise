const findTheOldest = function(people) {
    const currentYear = (new Date()).getFullYear();

    const peopleWithAge = people.map(person => {
        const deathYear = person.yearOfDeath || currentYear; 
        const age = deathYear - person.yearOfBirth;
        return { ...person, age };
    });

    const oldest = peopleWithAge.sort((a,b) => b.age - a.age)

    return oldest[0];
};

const people = [
      {
        name: "Carly",
        yearOfBirth: 1066,
      },
      {
        name: "Ray",
        yearOfBirth: 1962,
        yearOfDeath: 2011,
      },
      {
        name: "Jane",
        yearOfBirth: 1912,
        yearOfDeath: 1941,
      },
    ]

findTheOldest(people)

// Do not edit below this line
module.exports = findTheOldest;