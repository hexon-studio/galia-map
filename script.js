// VERSIONE 2
const width = document.getElementById('map').clientWidth;
const height = document.getElementById('map').clientHeight;

const svg = d3.select('#map').append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(d3.zoom()
        .scaleExtent([0.5, 4])
        .on("zoom", (event) => {
            svg.attr("transform", event.transform);
        }))
    .append('g');

const gridSize = 101; // Dimensione della griglia
const step = width / gridSize; // Dimensione di ogni cella

let lastClickedCell = null;
let lastPoints = []; // Array per tenere traccia delle coordinate dei clic destro

// Preparazione del punto di selezione
let selectionPoint = svg.append('circle')
    .attr('cx', -10) // Inizialmente posizionato fuori dalla vista
    .attr('cy', -10)
    .attr('r', step * 0.1) // Raggio del punto
    .attr('fill', 'lime') // Colore verde lime per il punto
    .style('visibility', 'hidden'); // Nascosto fino al primo clic

const connections = [
    [0, -39],
    [21, -26]
];

function drawPersistentLines() {
    for (let i = 0; i < connections.length - 1; i++) {  // Collega ogni punto al successivo
        const from = connections[i];
        const to = connections[i + 1];
        const x1 = (from[0] + 50) * step + step / 2;
        const y1 = (50 - from[1]) * step + step / 2;
        const x2 = (to[0] + 50) * step + step / 2;
        const y2 = (50 - to[1]) * step + step / 2;

        addLineWithDistance(x1, y1, x2, y2);
    }
}

// Funzione per calcolare e aggiungere una linea tra due punti con distanza
function addLineWithDistance(x1, y1, x2, y2) {
    const dx = (x2 - x1) / step;  // Conversione delle coordinate pixel in coordinate della griglia
    const dy = (y2 - y1) / step;
    const distance = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 100) / 100;  // Calcolo della distanza con arrotondamento

    const midX = (x1 + x2) / 2;
    const midY = (y1 + y2) / 2;

    // Aggiunta della linea
    svg.append('line')
        .attr('x1', x1)
        .attr('y1', y1)
        .attr('x2', x2)
        .attr('y2', y2)
        .attr('stroke', 'yellow')
        .attr('stroke-width', 1);

    // Aggiunta del testo della distanza
    svg.append('text')
        .attr('class', 'distance')
        .attr('x', midX)
        .attr('y', midY - 10)
        .attr('fill', 'white')
        .style('font-size', '12px')
        .style('text-anchor', 'middle')
        .text(`${distance.toFixed(2)} au`);
}

// Gestire il clic tasto destro per aggiungere punti e linee
function handleRightClick(x, y) {
    if (lastPoints.length > 0) {
        let lastPoint = lastPoints[lastPoints.length - 1];
        addLineWithDistance(lastPoint.x, lastPoint.y, x, y); // Aggiungi linea all'ultimo punto
    }
    lastPoints.push({ x, y }); // Salva il nuovo punto
}

// Dati dei punti speciali
const points = [
    {
        "name": "MUD",
        "coords": [0, -39]
    },
    {
        "name": "MUD2",
        "coords": [2, -34]
    },
    {
        "name": "MUD3",
        "coords": [10, -41]
    },
    {
        "name": "MUD4",
        "coords": [-2, -44]
    },
    {
        "name": "MUD5",
        "coords": [-10, -37]
    },
    {
        "name": "MRZ1",
        "coords": [-15, -33]
    },
    {
        "name": "MRZ2",
        "coords": [12, -31]
    },
    {
        "name": "MRZ3",
        "coords": [-22, -25]
    },
    {
        "name": "MRZ4",
        "coords": [-8, -24]
    },
    {
        "name": "MRZ5",
        "coords": [2, -23]
    },
    {
        "name": "MRZ6",
        "coords": [11, -16]
    },
    {
        "name": "MRZ7",
        "coords": [21, -26]
    },
    {
        "name": "MRZ8",
        "coords": [-30, -16]
    },
    {
        "name": "MRZ9",
        "coords": [-14, -16]
    },
    {
        "name": "MRZ10",
        "coords": [23, -12]
    },
    {
        "name": "MRZ11",
        "coords": [31, -19]
    },
    {
        "name": "MRZ12",
        "coords": [-16, 0]
    },
    {
        "name": "ONI",
        "coords": [-40, 30]
    },
    {
        "name": "ONI2",
        "coords": [-42, 35]
    },
    {
        "name": "ONI3",
        "coords": [-30, 30]
    },
    {
        "name": "ONI4",
        "coords": [-38, 25]
    },
    {
        "name": "ONI5",
        "coords": [-47, 30]
    },
    {
        "name": "MRZ13",
        "coords": [-36, -7]
    },
    {
        "name": "MRZ14",
        "coords": [-23, 4]
    },
    {
        "name": "MRZ18",
        "coords": [-40, 3]
    },
    {
        "name": "MRZ19",
        "coords": [-35, 12]
    },
    {
        "name": "MRZ20",
        "coords": [-25, 15]
    },
    {
        "name": "MRZ24",
        "coords": [-45, 15]
    },
    {
        "name": "MRZ25",
        "coords": [-18, 23]
    },
    {
        "name": "MRZ26",
        "coords": [-9, 24]
    },
    {
        "name": "MRZ29",
        "coords": [-22, 32]
    },
    {
        "name": "MRZ30",
        "coords": [-19, 40]
    },
    {
        "name": "MRZ31",
        "coords": [-8, 35]
    },
    {
        "name": "MRZ36",
        "coords": [0, 16]
    },
    {
        "name": "Ustur",
        "coords": [40, 30]
    },
    {
        "name": "UST2",
        "coords": [42, 35]
    },
    {
        "name": "UST3",
        "coords": [48, 32]
    },
    {
        "name": "UST4",
        "coords": [38, 25]
    },
    {
        "name": "UST5",
        "coords": [30, 28]
    },
    {
        "name": "MRZ15",
        "coords": [22, 5]
    },
    {
        "name": "MRZ16",
        "coords": [39, -1]
    },
    {
        "name": "MRZ17",
        "coords": [16, -5]
    },
    {
        "name": "MRZ21",
        "coords": [25, 14]
    },
    {
        "name": "MRZ22",
        "coords": [35, 16]
    },
    {
        "name": "MRZ23",
        "coords": [44, 10]
    },
    {
        "name": "MRZ27",
        "coords": [2, 26]
    },
    {
        "name": "MRZ28",
        "coords": [17, 21]
    },
    {
        "name": "MRZ32",
        "coords": [5, 44]
    },
    {
        "name": "MRZ33",
        "coords": [13, 37]
    },
    {
        "name": "MRZ34",
        "coords": [22, 31]
    },
    {
        "name": "MRZ35",
        "coords": [49, 20]
    }
]

function updateDistances() {
    points.forEach(point => {
        let distance = 0;
        if (lastClickedCell) {
            let dx = point.coords[0] - lastClickedCell.x;
            let dy = point.coords[1] - lastClickedCell.y;
            distance = Math.ceil(Math.sqrt(dx * dx + dy * dy) * 100) / 100; // Arrotondamento per eccesso a due cifre decimali
        }
        d3.select('#dist' + point.name).text(distance.toFixed(2) + ' au');
    });
}

// Crea la griglia
for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
        let xCoord = i - 50;
        let yCoord = 50 - j;
        svg.append('rect')
            .attr('x', i * step)
            .attr('y', j * step)
            .attr('width', step)
            .attr('height', step)
            .attr('fill', 'rgba(0,0,0,0)')
            .attr('stroke', '#66666650')
            .attr('stroke-width', 0.5)
            /* .on('click', function() {
                alert('Coordinate: (' + xCoord + ', ' + yCoord + ')');
            }); */
            /* .on('click', function() {
                // Calcola le coordinate logiche della cella cliccata
                lastClickedCell = { x: i - 50, y: 50 - j };
                updateDistances(); // Aggiorna le distanze visualizzate
            }); */
            .on('mouseover', () => {
                console.log(`x: ${i - 50}, y: ${50 - j}`);
            })
            .on('contextmenu', (event) => {
                event.preventDefault(); // Previene l'apertura del menu contestuale
                console.log(`Right-clicked!`);

                // Posizione logica della cella cliccata
                let cellX = i * step + step / 2;
                let cellY = j * step + step / 2;

                // Aggiorna la posizione del punto di selezione
                selectionPoint.attr('cx', cellX)
                              .attr('cy', cellY)
                              .style('visibility', 'visible');

                handleRightClick(i * step + step / 2, j * step + step / 2);
            })
            .on('click', function() {
                // Posizione logica della cella cliccata
                let cellX = i * step + step / 2;
                let cellY = j * step + step / 2;

                // Aggiorna la posizione del punto di selezione
                selectionPoint.attr('cx', cellX)
                              .attr('cy', cellY)
                              .style('visibility', 'visible');

                lastClickedCell = { x: i - 50, y: 50 - j };
                updateDistances(); // Aggiorna le distanze visualizzate

                lastPoints = []; // Cancella tutti i punti e le linee con un clic sinistro
                svg.selectAll('line').remove(); // Rimuovi le linee
                svg.selectAll('text.distance').remove(); // Rimuove solo i testi delle distanze
            });
    }
}

// Posizionare i punti speciali
points.forEach(point => {
    let x = (point.coords[0] + 50) * step + step / 2; // Aggiusta la posizione x per centrare nel quadrato
    let y = (50 - point.coords[1]) * step + step / 2; // Aggiusta la posizione y per centrare nel quadrato
    
    svg.append('circle')
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', step * 0.5) // Raggio del cerchio leggermente maggiore della metà della cella
        .attr('fill', '#F29F05') // Colore del cerchio
        /* .on('click', function() {
            alert('Coordinate: (' + (point.coords[0]) + ', ' + (point.coords[1]) + ')');
        }); */
        .on('mouseover', () => {
            console.log(`x: ${point.coords[0]}, y: ${point.coords[1]}`);
        })
        .on('contextmenu', (event) => {
            event.preventDefault(); // Previene l'apertura del menu contestuale
            console.log(`Right-clicked!`);
            handleRightClick(x, y);
        })
        .on('click', function() {
            selectionPoint.style('visibility', 'hidden');

            // Calcola le coordinate logiche della cella cliccata
            lastClickedCell = { x: point.coords[0], y: point.coords[1] };
            updateDistances(); // Aggiorna le distanze visualizzate

            lastPoints = []; // Cancella tutti i punti e le linee con un clic sinistro
            svg.selectAll('line').remove(); // Rimuovi le linee
            svg.selectAll('text.distance').remove(); // Rimuove solo i testi delle distanze
        });

    svg.append('text')
        .attr('x', x)
        .attr('y', y + step * 0.9 + 15) // Posiziona il testo sotto il cerchio ingrandito
        .attr('fill', 'white') // Colore del testo
        .style("text-anchor", "middle") // Centra il testo orizzontalmente
        .style("font-size", "12px") // Dimensione del font
        .style("font-weight", "medium")
        .text(point.name); // Nome del punto

    svg.append('text')
        .attr('x', x)
        .attr('y', y + step * 0.9 + 30)
        .attr('fill', 'grey')
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .attr('id', 'dist' + point.name) // Assegna un ID unico per aggiornare il testo
        .text('0.00 au'); // Inizializza tutte le distanze a 0
});

drawPersistentLines();
