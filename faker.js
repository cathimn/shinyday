const faker = require('faker');

faker.seed(4444);

let fakes = [];
while (fakes.length < 5) {
    let fake = [faker.name.firstName(), faker.name.lastName()]
        fakes.push({
            username: faker.internet.userName(...fake),
            email: faker.internet.email(...fake),
            password: faker.internet.password(),
            createdAt: faker.date.past(),
            updatedAt: new Date(),
        })
}

// console.log(fakes)
// console.log(faker.image.cats(300, 300)) 


console.log(faker.address.city(), faker.address.state())
console.log(faker.address.city(), faker.address.state())
console.log(faker.address.city(), faker.address.state())
console.log(faker.address.city(), faker.address.state())
console.log(faker.address.city(), faker.address.state())
console.log(faker.address.city(), faker.address.state())

// console.log(faker.lorem.sentence())
