// shufle
const prizes = [ '11', '22', '33', '44' ]
prizes.sort(() => 0.5 - Math.random())
console.log(prizes);

// suma
const array = [ 1, 10, -19, 2, 7, 100 ]
const sum = array.reduce((sum, num) => sum + num) // 101

// min max
const array = [ 2, 12, -19, 3, 8, 100 ]
console.log('max value', Math.max(...array)) // 100
console.log('min value', Math.min(...array)) // -19

// flaten array
const array = [ 1, [ 2, [ 3, [ 4, [ 5 ] ] ] ] ]
console.log(array.flat(Infinity)) // [1, 2, 3, 4, 5]
