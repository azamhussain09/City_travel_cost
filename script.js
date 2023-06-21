// City travel cost matrix
const graph = [
  [0, 10, 20, 30, 40, 50, 60, 70, 80, 90],
  [10, 0, 10, 20, 30, 40, 50, 60, 70, 80],
  [15, 5, 0, 5, 10, 15, 25, 30, 35, 40],
  [20, 10, 5, 0, 5, 10, 20, 25, 30, 35],
  [30, 20, 10, 5, 0, 5, 15, 20, 25, 30],
  [40, 30, 15, 10, 5, 0, 10, 15, 20, 25],
  [50, 40, 20, 15, 10, 5, 0, 5, 10, 15],
  [60, 50, 25, 20, 15, 10, 5, 0, 5, 10],
  [70, 60, 30, 25, 20, 15, 10, 5, 0, 5],
  [80, 70, 35, 30, 25, 20, 15, 10, 5, 0]
];

const cityNames = [
  "Charminar",
  "Golconda Fort",
  "Nehru Zoological Park",
  "Ramoji Film City",
  "Hussain Sagar Lake",
  "Birla Mandir",
  "Chowmahalla Palace",
  "Kukatpally",
  "Bachupally",
  "Madhapur"
];

function dijkstra(startCity, endCity) {
  const numCities = graph.length;
  const minCost = new Array(numCities).fill(Number.MAX_VALUE);
  const visited = new Array(numCities).fill(false);
  const prevCity = new Array(numCities).fill(null);

  minCost[startCity] = 0;

  for (let count = 0; count < numCities - 1; ++count) {
    let currentCity = -1;
    // Find the city with the minimum cost among unvisited cities
    for (let i = 0; i < numCities; ++i) {
      if (!visited[i] && (currentCity === -1 || minCost[i] < minCost[currentCity])) {
        currentCity = i;
      }
    }

    visited[currentCity] = true;

    // Update costs of neighboring cities
    for (let neighbor = 0; neighbor < numCities; ++neighbor) {
      if (!visited[neighbor] && graph[currentCity][neighbor] !== Number.MAX_VALUE) {
        const newCost = minCost[currentCity] + graph[currentCity][neighbor];
        if (newCost < minCost[neighbor]) {
          minCost[neighbor] = newCost;
          prevCity[neighbor] = currentCity;
        }
      }
    }
  }

  // Reconstruct the path from end city to start city
  const path = [endCity];
  let currentCity = endCity;
  while (currentCity !== startCity) {
    currentCity = prevCity[currentCity];
    path.unshift(currentCity);
  }

  // Return the minimum cost and path
  return {
    cost: minCost[endCity],
    path: path.map(cityIndex => cityNames[cityIndex])
  };
}

// Handle button click event
const calculateButton = document.getElementById('calculate-btn');
calculateButton.addEventListener('click', () => {
  const startCitySelect = document.getElementById('start-city');
  const endCitySelect = document.getElementById('end-city');
  const resultDiv = document.getElementById('result');

  const startCityIndex = parseInt(startCitySelect.value);
  const endCityIndex = parseInt(endCitySelect.value);

  const result = dijkstra(startCityIndex, endCityIndex);

  resultDiv.innerHTML = `<p>Minimum cost from ${cityNames[startCityIndex]} to ${cityNames[endCityIndex]}: ${result.cost}</p>`;
  resultDiv.innerHTML += `<p>Path: ${result.path.join(" -> ")}</p>`;
});
