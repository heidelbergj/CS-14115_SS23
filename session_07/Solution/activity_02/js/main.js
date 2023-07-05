const amusementRides = [
    {
        id: 0,
        name: "a",
        price: 2
    },
    {
        id: 1,
        name: "b",
        price: 5
    },
    {
        id: 2,
        name: "c",
        price: 10
    },
]

console.log(amusementRides)

let amusementRidesDouble = doublePrices(amusementRides);

console.log(amusementRidesDouble)
// Implementation of the function

// example without deep copy -> all original rides will be manipulated
// function doublePrices(rides){
//
//     rides.forEach(function(ride, index) {
//         if (index !== 1){
//             ride.price = ride.price*2
//         }
//     })
//
//     return rides
// }

// example with deep copy
function doublePrices(rides){
    let copiedRides = rides.map(function(ride, index) {
        if (index !== 1) {
            return {id: ride.id, name: ride.name, price: ride.price * 2};
        } else {
            return ride;
        }
    });

    return copiedRides;
}