const readline = require('readline');

class PriorityQueue {
  constructor() {
    this.items = [];
  }

  enqueue(item, priority) {
    this.items.push({ item, priority });
    this.items.sort((a, b) => a.priority - b.priority);
  }

  dequeue() {
    return this.items.shift().item;
  }

  isEmpty() {
    return this.items.length === 0;
  }
}

function dijkstra(graph, start, end) {
  const distances = {};
  const previousVertices = {};
  const queue = new PriorityQueue();

  for (let vertex in graph) {
    if (vertex === start) {
      distances[vertex] = 0;
      queue.enqueue(vertex, 0);
    } else {
      distances[vertex] = Infinity;
      queue.enqueue(vertex, Infinity);
    }
    previousVertices[vertex] = null;
  }

  while (!queue.isEmpty()) {
    const currentVertex = queue.dequeue();

    if (currentVertex === end) {
      break;
    }

    for (let neighbor in graph[currentVertex]) {
      const weight = graph[currentVertex][neighbor];
      const totalDistance = distances[currentVertex] + weight;

      if (totalDistance < distances[neighbor]) {
        distances[neighbor] = totalDistance;
        previousVertices[neighbor] = currentVertex;
        queue.enqueue(neighbor, totalDistance);
      }
    }
  }

  const shortestPath = [];
  let currentVertex = end;
  while (currentVertex !== null) {
    shortestPath.unshift(currentVertex);
    currentVertex = previousVertices[currentVertex];
  }

  return {
    distance: distances[end],
    path: shortestPath
  };
}


const graph = {
  'A': { 'B': 7, 'C': 8 },
  'B': { 'A': 7, 'F': 2 },
  'C': { 'A': 8, 'F': 6, 'G': 4 },
  'D': { 'F': 8 },
  'E': { 'H': 1 },
  'F': { 'B': 2, 'C': 6, 'D': 8, 'G': 9, 'H': 3 },
  'G': { 'C': 4, 'F': 9 },
  'H': { 'E': 1, 'F': 3 }
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question("Введіть початкову вершину: ", (startVertex) => {
  rl.question("Введіть кінцеву вершину: ", (endVertex) => {
    const result = dijkstra(graph, startVertex, endVertex);
    console.log("Найкоротший шлях з вершини", startVertex, "до вершини", endVertex, ":");
    console.log("Відстань:", result.distance);
    console.log("Шлях:", result.path.join(' -> '));
    rl.close();
  });
});
