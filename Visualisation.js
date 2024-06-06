// RECUPERATION DE LA BASE DE DONNEES 

var responseData; // Déclarer une variable globale pour stocker les données

window.onload = function() {
    // Effectuer une requête AJAX
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/data', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Convertir la chaîne JSON en objet JavaScript
            responseData = JSON.parse(xhr.response); 
            // Mise à jour les graphiques
            update2DChart(responseData);
            update3DChart(responseData); 
        }
    };
    xhr.send();  
};


// GRAPHIQUE 2D DATE | TEMPERATURE ou HUMUDITE ou POINT DE ROSEE
function calculateStats(data, variable) {
    let values = [];

    // Sélectionner les données en fonction de la variable choisie
    if (variable === 'temperature') {
        values = data.map(entry => entry.temp_celsius);
    } else if (variable === 'humidity') {
        values = data.map(entry => entry.humidite);
    } else if (variable === 'dew_point') {
        values = data.map(entry => entry.pt_de_rosee);
    }

    // Calculer la moyenne
    const mean = values.reduce((acc, curr) => acc + curr, 0) / values.length;

    // Calculer la valeur minimale
    const minValue = Math.min(...values);

    // Calculer la valeur maximale
    const maxValue = Math.max(...values);

    return { mean, minValue, maxValue };
}


// Fonction pour mettre à jour les graphiques avec les données
function update2DChart(responseData) {
    const selectedVariable = document.getElementById('variable').value;

    // Convertir les dates au format lisible et extraire les valeurs y
    const xData = responseData.map(entry => new Date(entry.date));
    let yData;

    // Sélectionner les données en fonction de la variable choisie
    if (selectedVariable === 'temperature') {
        yData = responseData.map(entry => entry.temp_celsius);
    } else if (selectedVariable === 'humidity') {
        yData = responseData.map(entry => entry.humidite);
    } else if (selectedVariable === 'dew_point') {
        yData = responseData.map(entry => entry.pt_de_rosee);
    }

    // Créer le graphique avec Plotly.js
    const trace = {
        x: xData,
        y: yData,
        mode: 'lines+markers',
        type: 'scatter'
    };
    const layout = {
        title: 'Visualisation des données',
        xaxis: {
            title: 'Date'
        },
        yaxis: {
            title: selectedVariable.charAt(0).toUpperCase() + selectedVariable.slice(1) 
        }
    };
    Plotly.newPlot('chart', [trace], layout);

    // Calculer les statistiques
    const stats = calculateStats(responseData, selectedVariable);

    // Remplir le tableau des statistiques
    document.getElementById('meanValue').textContent = stats.mean.toFixed(2);
    document.getElementById('minValue').textContent = stats.minValue;
    document.getElementById('maxValue').textContent = stats.maxValue;
}


//GRAPHIQUE 3D HUMIDITE | TEMPERATURE | POINT DE ROSEE 
function createClusters(data, temperatureThreshold, humidityThreshold) {
    const clusters = {
        'Température basse | Humidité basse': [],
        'Température basse | Humidité élevée': [],
        'Température élevée | Humidité basse': [],
        'Température élevée | Humidité élevée': []
    };

    data.forEach(entry => {
        if (entry.temp_celsius < temperatureThreshold && entry.humidite < humidityThreshold) {
            clusters['Température basse | Humidité basse'].push(entry);
        } else if (entry.temp_celsius < temperatureThreshold && entry.humidite > humidityThreshold) {
            clusters['Température basse | Humidité élevée'].push(entry);
        } else if (entry.temp_celsius > temperatureThreshold && entry.humidite < humidityThreshold) {
            clusters['Température élevée | Humidité basse'].push(entry);
        } else {
            clusters['Température élevée | Humidité élevée'].push(entry);
        }
    });

    return clusters;
}



function update3DChart(responseData) {
    const temperatureThreshold = parseFloat(document.getElementById('temperatureThreshold').value);
    const humidityThreshold = parseFloat(document.getElementById('humidityThreshold').value);

    // Vérifier les seuils
    if (temperatureThreshold < -40 || temperatureThreshold > 50 || humidityThreshold < 0 || humidityThreshold > 100) {
        alert('Veuillez entrer des seuils valides : -40°C <= Température <= 50°C et 0 <= Humidité <= 100.');
        return; // Arrêter l'exécution si les seuils ne sont pas valides
    }

    const clusters = createClusters(responseData, temperatureThreshold, humidityThreshold);

    const data = [];

    // Ajouter chaque cluster comme une trace séparée
    for (const [clusterName, clusterData] of Object.entries(clusters)) {
        const trace = {
            x: clusterData.map(entry => entry.date),
            y: clusterData.map(entry => entry.temp_celsius),
            z: clusterData.map(entry => entry.humidite),
            mode: 'markers',
            type: 'scatter3d',
            name: clusterName,
            marker: {
                size: 2,
                line: {
                    color: 'rgba(217, 217, 217, 0.14)',
                    width: 0.5
                },
                opacity: 0.8
            }
        };

        data.push(trace);
    }

    const layout = {
        title: 'Graphique 3D (Date, Température et Humidité)',
        scene: {
            xaxis: { title: 'Date' },
            yaxis: { title: 'Température (°C)' },
            zaxis: { title: 'Humidité (%)' }
        }
    };

    Plotly.newPlot('chart3d', data, layout);
}

  




