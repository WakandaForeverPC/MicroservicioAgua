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

        board.appendChild(cell);
    }

    // Fetch and render static buildings
    fetch('http://localhost:8080/mapa/edificios')
        .then(response => response.json())
        .then(buildings => {
            buildings.forEach(building => {
                if (building.x >= 0 && building.x < gridWidth && building.y >= 0 && building.y < gridHeight) {
                    const index = building.y * gridWidth + building.x;
                    const cell = board.children[index];

                    const buildingDiv = document.createElement('div');
                    buildingDiv.classList.add('building');
                    buildingDiv.style.width = `${building.width}px`;
                    buildingDiv.style.height = `${building.height}px`;

                    cell.appendChild(buildingDiv);
                }
            });
        })
        .catch(error => console.error('Error fetching buildings:', error));
} else {
    console.error('Element with id "board-agua" not found.');
}