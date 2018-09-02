// const person = {
//     name: 'Golden',
//     age: 22,
//     location: {
//         city: "LA",
//         temp: 90
//     }
// };

// const {name, age} = person;

// console.log(`${name} is ${age}`);

// const {city, temp:tempp} = person.location
// console.log(`It's ${city} in ${tempp}`);

// const book = {
//     title: 'Ego is the Enemy',
//     author: 'Ryan Holiday',
//     publisher: {
//         name:'Penguin'
//     }
// }
// const {title, author} = book;
// const { name: publisherName = 'Self-Published'} = book.publisher;
// console.log(publisherName);


// Arrays

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147'];

// const [street, city, state, zip] = address;
// console.log(`You are in ${city} ${state}`);

const item = ['Coffee (hot)', '2', '2.50', '2.75'];
const [name, , price] = item;
console.log(`A medium ${name} costs ${price}`)