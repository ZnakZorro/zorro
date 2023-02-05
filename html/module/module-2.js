import {
  bestClub as favoriteTeam,
  fruits as crops,
  multiply as product,
} from './module-1.js';

const bestClub = `I bought ${product(2, 11)} ${crops[2]}s at ${favoriteTeam}.`;

console.log(bestClub);
document.querySelector("#info").innerHTML = bestClub;
