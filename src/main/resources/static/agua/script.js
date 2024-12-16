const board = document.getElementById('board-agua');
const gridWidth = 9; // columns
const gridHeight = 7; // rows

if (board) {
    // Create the board with roads and cells
    for (let i = 0; i < gridWidth * gridHeight; i++) {
        const cell = document.createElement('div');
        const row = Math.floor(i / gridWidth); // Current row
        const col = i % gridWidth;            // Current column

        if (row === 3 && (col === 1 || col === 3 || col === 5 || col === 7)) {
            // Intersection of horizontal and vertical roads
            cell.classList.add('cell', 'intersection-road');
        } else if (row === 3) {
            // Horizontal road
            cell.classList.add('cell', 'horizontal-road');
        } else if (col === 1 || col === 3 || col === 5 || col === 7) {
            // Vertical roads
            cell.classList.add('cell', 'vertical-road');
        } else {
            // Normal cell
            cell.classList.add('cell');
        }

        // Add pipes
        if (row === 3 || col === 1 || col === 3 || col === 5 || col === 7) {
            const pipe = document.createElement('div');
            pipe.classList.add('pipe');
            if (row === 3) {
                pipe.classList.add('horizontal');
            } else {
                pipe.classList.add('vertical');
            }
            cell.appendChild(pipe);
        }

        // Add both horizontal and vertical pipes for intersections
        if (row === 3 && (col === 1 || col === 3 || col === 5 || col === 7)) {
            const verticalPipe = document.createElement('div');
            verticalPipe.classList.add('pipe', 'vertical');
            cell.appendChild(verticalPipe);
        }

        // Add branching pipes at the midpoint of vertical pipes
        if (col === 1 || col === 3 || col === 5 || col === 7) {
            const branchPipe1 = document.createElement('div');
            branchPipe1.classList.add('pipe', 'horizontal');
            branchPipe1.style.top = '50%';
            branchPipe1.style.transform = 'translateY(-50%)';
            cell.appendChild(branchPipe1);

            const branchPipe2 = document.createElement('div');
            branchPipe2.classList.add('pipe', 'horizontal');
            branchPipe2.style.bottom = '50%';
            branchPipe2.style.transform = 'translateY(50%)';
            cell.appendChild(branchPipe2);
        }

        // Apply bus stop style to specific cells
        if ((row === 0 && col === 1) || (row === 6 && col === 7)) {
            cell.classList.add('bus-stop');
            cell.textContent = 'BUS'; // Add text to the bus stop
        }

        board.appendChild(cell);
    }

    // Fetch and render static buildings
    fetch('http://localhost:8080/mapa/edificios')
        .then(response => response.json())
        .then(buildings => {
            const waterConsumptionData = [];
            const buildingLabels = [];
            buildings.forEach(building => {
                if (building.x >= 0 && building.x < gridWidth && building.y >= 0 && building.y < gridHeight) {
                    const index = building.y * gridWidth + building.x;
                    const cell = board.children[index];

                    const buildingDiv = document.createElement('div');
                    buildingDiv.classList.add('building');
                    buildingDiv.style.width = `${building.width}px`;
                    buildingDiv.style.height = `${building.height}px`;
                    buildingDiv.style.backgroundColor = building.color; // Assign building color

                    cell.appendChild(buildingDiv);

                    // Simulate water consumption
                    const consumption = Math.floor(Math.random() * 100) + 1;
                    waterConsumptionData.push(consumption);
                    buildingLabels.push(`Building (${building.x},${building.y})`);
                }
            });

            // Create pie chart
            const ctx = document.getElementById('waterConsumptionChart').getContext('2d');
            new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: buildingLabels,
                    datasets: [{
                        data: waterConsumptionData,
                        backgroundColor: waterConsumptionData.map(value => value > 80 ? 'red' : 'green')
                    }]
                },
                options: {
                    plugins: {
                        legend: {
                            labels: {
                                color: 'black' // Set legend text color to black
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    const label = context.label || '';
                                    const value = context.raw || 0;
                                    return `${label}: ${value} units`;
                                }
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error fetching buildings:', error));
} else {
    console.error('Element with id "board-agua" not found.');
}
fetch('/mapa/residuos')
    .then(response => response.json())
    .then(recyclingPoints => {
        if (Array.isArray(recyclingPoints)) {
            recyclingPoints.forEach(point => {
                if (point.x >= 0 && point.x < gridWidth && point.y >= 0 && point.y < gridHeight) {
                    const index = point.y * gridWidth + point.x;
                    const cell = board.children[index];

                    const container1 = document.createElement('div');
                    container1.classList.add('recycling-container');
                    container1.style.width = `${point.width / 3}px`;
                    container1.style.height = `${point.height / 3}px`;
                    container1.style.backgroundColor = point.color1;

                    const container2 = document.createElement('div');
                    container2.classList.add('recycling-container');
                    container2.style.width = `${point.width / 3}px`;
                    container2.style.height = `${point.height / 3}px`;
                    container2.style.backgroundColor = point.color2;

                    const container3 = document.createElement('div');
                    container3.classList.add('recycling-container');
                    container3.style.width = `${point.width / 3}px`;
                    container3.style.height = `${point.height / 3}px`;
                    container3.style.backgroundColor = point.color3;

                    cell.appendChild(container1);
                    cell.appendChild(container2);
                    cell.appendChild(container3);
                }
            });
        } else {
            console.error('Invalid recycling points response:', recyclingPoints);
        }
    })
    .catch(error => console.error('Error fetching recycling points:', error));