import {
  bestClub as favoriteTeam,
  fruits as crops,
  multiply as product,
  strona as url
} from './module-1.js';

const bestClub = `I bought ${product(2, 11)} ${crops[2]}s at ${favoriteTeam}. ${url}`;

console.log(bestClub);
document.querySelector("#info").innerHTML = bestClub;
