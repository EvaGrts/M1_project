// CHOIX DE LA STATION

var map; // Déclaration de la variable globale "map" pour stocker la carte Leaflet

// Liste des stations et des coordonnées associées 
stations = [
    { "name": "Abbeville", "stationNumber": "07005", "coordinates": [50.136, 1.834] },
    { "name": "Ajaccio", "stationNumber": "07761", "coordinates": [41.9271, 8.7344] },
    { "name": "Athis-Mons", "stationNumber": "07149", "coordinates": [48.7077, 2.3845] },
    { "name": "Bangor", "stationNumber": "07207", "coordinates": [47.3395, -3.2292] },
    { "name": "Barberey-Saint-Sulpice", "stationNumber": "07168", "coordinates": [48.1947, 3.0477] },
    { "name": "Blagnac", "stationNumber": "07630", "coordinates": [43.6297, 1.3635] },
    { "name": "Blotzheim", "stationNumber": "07299", "coordinates": [47.5965, 7.5331] },
    { "name": "Boos", "stationNumber": "07037", "coordinates": [49.4313, 1.1904] },
    { "name": "Bourges", "stationNumber": "07255", "coordinates": [47.0849, 2.3969] },
    { "name": "Capiquet", "stationNumber": "07027", "coordinates": [49.3325, 0.2591] },
    { "name": "Cerisé", "stationNumber": "07139", "coordinates": [48.4475, 1.6539] },
    { "name": "Chaspuzac", "stationNumber": "07471", "coordinates": [45.0567, 3.6611] },
    { "name": "Clermont-Ferrand", "stationNumber": "07460", "coordinates": [45.7772, 3.087] },
    { "name": "Colombier-Saugnieu", "stationNumber": "07481", "coordinates": [45.7214, 5.0793] },
    { "name": "Embrun", "stationNumber": "07591", "coordinates": [44.9301, 6.2911] },
    { "name": "Fretin", "stationNumber": "07015", "coordinates": [50.5899, 3.0954] },
    { "name": "Gourdon", "stationNumber": "07535", "coordinates": [44.7337, 1.3849] },
    { "name": "Guipavas", "stationNumber": "07110", "coordinates": [48.4475, -4.418] },
    { "name": "Holtzheim", "stationNumber": "07190", "coordinates":  [48.5718, 7.6535] },
    { "name": "La Désirade", "stationNumber": "078890", "coordinates": [47.2733, -1.5397] },
    { "name": "La Hague", "stationNumber": "07020", "coordinates":[49.6795, -1.9395] },
    { "name": "La Trinité", "stationNumber": "78922", "coordinates": [43.4088, 6.6267] },
    { "name": "Le Lamentin", "stationNumber": "78925", "coordinates":[14.601, -61.081] },
    { "name": "Les Abymes", "stationNumber": "78897", "coordinates": [16.2706, -61.4988] },
    { "name": "Limoges", "stationNumber": "07434", "coordinates": [45.8265, 1.2625] },
    { "name": "Lorp-Sentaraille", "stationNumber": "07627", "coordinates": [43.1745, 0.5903] },
    { "name": "Louey", "stationNumber": "07621", "coordinates":[43.2111, 0.0936]},
    { "name": "Lucciana", "stationNumber": "07790", "coordinates": [42.5441, 9.4054] },
    { "name": "Marignane", "stationNumber": "07650", "coordinates": [43.4394, 5.2146] },
    { "name": "Matoury", "stationNumber": "81405", "coordinates": [4.8419, -52.3316] },
    { "name": "Millau", "stationNumber": "07558", "coordinates":[44.0985, 3.078]},
    { "name": "Mont-de-Marsan", "stationNumber": "07607", "coordinates": [43.8903, -0.4997] },
    { "name": "Montélimar", "stationNumber": "07577", "coordinates": [44.558, 4.751] },
    { "name": "Mérignac", "stationNumber": "07510", "coordinates": [44.8288, -0.7158] },
    { "name": "NIce", "stationNumber": "07690", "coordinates": [43.7102, 7.262] },
    { "name": "Ouges", "stationNumber": "07280", "coordinates": [47.329, 5.0811] },
    { "name": "Pamandzi", "stationNumber": "Parçay-Meslay", "coordinates":[45.9279, -0.9383] },
    { "name": "Perpignan", "stationNumber": "07747", "coordinates": [42.6977, 2.8956] },
    { "name": "Perros-Guirec", "stationNumber": "07117", "coordinates":[48.8194, -3.4524] },
    { "name": "Poitiers", "stationNumber": "07335", "coordinates": [46.5802, 0.3402] },
    { "name": "Prunay", "stationNumber": "07072", "coordinates": [48.7961, 3.8229] },
    { "name": "Saint-Aignan-Grandlieu", "stationNumber": "07222", "coordinates": [47.1294, -1.6248] },
    { "name": "Saint-Barthélemy", "stationNumber": "78894", "coordinates": [17.9144, -62.8337] },
    { "name": "Saint-denis-d'Oléron", "stationNumber": "07314", "coordinates": [46.0254, -1.3187] },
    { "name": "Saint-Georges", "stationNumber": "81408", "coordinates": [4.2819, -52.1665] },
    { "name": "Saint-Jacques-de-la-Landes", "stationNumber": "07130", "coordinates": [48.0698, -1.7453] },
    { "name": "Saint-Laurent-du-Maroni", "stationNumber": "81401", "coordinates": [5.4848, -54.0276] },
    { "name": "Saint-Mandrier-sur-Mer", "stationNumber": "07661", "coordinates": [43.0752, 5.9296] },
    { "name": "Saint-Pierre", "stationNumber": "71805", "coordinates": [46.7627, -56.1744] },
    { "name": "Sainte-marie", "stationNumber": "61980", "coordinates": [16.0864, -61.5494] },
    { "name": "Thuilley-aux-Groseilles", "stationNumber": "07181", "coordinates":[48.6813, 6.0651] },
    { "name": "les Eparses de l'océan Indien", "stationNumber": "61976", "coordinates": [13.4397, 49.8805]}
]

// Initisalisation de la carte 
function initializeMap(latitude, longitude) {
    // Vérifier si une carte existe déjà, si oui, la supprime pour la remplacer par une nouvelle
    if (map) {
        map.remove();
    }
    // Créer une nouvelle carte Leaflet avec les coordonnées spécifiées et un niveau de zoom de 13
    map = L.map('map').setView([latitude, longitude], 13);
    // Ajouter une couche de tuiles OpenStreetMap à la carte pour l'affichage du fond de carte
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);
}

// Calculer la distance en kilomètres entre deux points géographiques
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // Rayon de la Terre en kilomètres
    var dLat = toRadians(lat2 - lat1);
    var dLon = toRadians(lon2 - lon1);
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c; // Distance en kilomètres

    return distance;
}

// Convertit des degrés en radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Trouver la station la plus proche des coordonnées fournies
function findClosestStation(userLatitude, userLongitude) {
    var closestStation = null; // Initialisation de la variable pour stocker la station la plus proche
    var closestDistance = Number.MAX_VALUE; // Initialisation de la distance la plus proche à une valeur très grande

    // Parcours de toutes les stations pour trouver la plus proche
    stations.forEach(function(station) {
        // Calculer de la distance entre la position de l'utilisateur et la station actuelle
        var distance = calculateDistance(userLatitude, userLongitude, station.coordinates[0], station.coordinates[1]);
        
        // Si la distance calculée est plus petite que la distance la plus proche actuelle
        if (distance < closestDistance) {
            // Mettre à jour la distance la plus proche et la station la plus proche
            closestDistance = distance;
            closestStation = station;
        }
    });

    return closestStation; // Retourner la station la plus proche
}


// Afficher la station sur la carte 
function showStationOnMap(stationName) {
        // Rechercher la station dans la liste des stations avec le nom spécifié
        var station = stations.find(function (s) {
            return s.name === stationName;
        });
        // Vérifier si la station a été trouvée
        if (station) {
            // Marqueur à la position de la station sur la carte
            L.marker(station.coordinates).addTo(map)
                // Fenêtre contextuelle au marqueur affichant le nom de la station et ses coordonnées
                .bindPopup('<b>Station :</b> ' + station.name + '<br>Coordonnées : ' + station.coordinates[0] + ', ' + station.coordinates[1])
                .openPopup(); // Ouverture de cette fênetre lors de la création du marqueur
        }
}

// Afficher la position sur la carte 
function showPositionOnMap(latitude, longitude) {
        // Marqueur indiquant la position de l'utilisateur 
        L.marker([latitude, longitude]).addTo(map)
            // Fenêtre indiquant la position de l'utilisateur
            .bindPopup('<b>Votre position :</b> ' + latitude + ', ' + longitude)
            .openPopup(); // Ouverture de cette fênetre lors de la création du marqueur
}

// Géolocalisation de l'utilisateur
function getLocation() {
    if (navigator.geolocation) {
        // Vérifier si le navigateur prend en charge la géolocalisation
        navigator.geolocation.getCurrentPosition(function(position) {
            // Si oui, récupère la position actuelle de l'utilisateur et met à jour les champs de saisie
            document.getElementById("latitude").value = position.coords.latitude;
            document.getElementById("longitude").value = position.coords.longitude;
        }, handleLocationError); // En cas d'erreur lors de la récupération de la position
    } else {
        // Affiche un message d'alerte si la géolocalisation n'est pas prise en charge par le navigateur
        alert("La géolocalisation n'est pas supportée par votre navigateur.");
    }
}

// Gèrer les erreurs liées à la géolocalisation en affichant un message d'alerte
function handleLocationError(error) {
    alert("La géolocalisation n'est pas disponible. Veuillez entrer les coordonnées manuellement.");
}

// Réinitialisation de la carte 
function resetMap() {
    initializeMap(48.8566, 2.3522); // Initialise la carte à une position par défaut (Paris)
    document.getElementById("latitude").value = ""; // Réinitialise les champs de latitude et longitude
    document.getElementById("longitude").value = "";
    // Réinitialise le menu déroulant pour qu'aucun choix ne soit sélectionné
    document.getElementById("station").selectedIndex = 0;
}

// Vérifier si les coordonnées se trouvent à l'intérieur des limites du monde réel
function checkLocationInBoundsWorld(latitude, longitude) {
    // Limites du monde réel
    var northBoundary = 90;
    var southBoundary = -90;
    var eastBoundary = 180;
    var westBoundary = -180;

    // Vérifier si les coordonnées sont à l'intérieur des limites
    if (latitude >= southBoundary && latitude <= northBoundary && longitude >= westBoundary && longitude <= eastBoundary) {
        return true; // Les coordonnées sont à l'intérieur des limites
    } else {
        return false; // Les coordonnées sont en dehors des limites
    }
}

// Coordonnées des limites géographiques de la France métropolitaine et des DROM COM
var franceMetropolitanBounds = {
    north: 51.1242,
    south: 41.3337,
    west: -5.1421,
    east: 9.5615
};

var dromComBounds = [
    { name: "GUADELOUPE", north: 16.6026, south: 15.8715, west: -61.8386, east: -60.9946 },
    { name: "MARTINIQUE", north: 14.8752, south: 14.3661, west: -61.3247, east: -60.7264 },
    { name: "GUYANE", north: 5.7766, south: 2.1127, west: -54.6058, east: -51.6351 },
    { name: "REUNION", north: -20.8743, south: -21.6469, west: 55.1721, east: 55.8355 },
    { name: "MAYOTTE", north: -12.6122, south: -13.0715, west: 45.0419, east: 45.2988 },
    { name: "SAINT MARTIN", north: 18.1397, south: 18.0525, west: -63.1661, east: -63.0006 },
    { name: "SAINT BARTHELEMY", north: 17.979, south: 17.8859, west: -62.8767, east: -62.788 },
    { name: "SAINT PIERRE ET MIQUELON", north: 47.1374, south: 46.7837, west: -56.4209, east: -56.1436 },
    { name: "NOUVELLE-CALEDONIE", north: -20.8862, south: -22.6912, west: 163.2184, east: 168.1299 },
    { name: "POLYNESIE FRANCAISE", north: -15.6894, south: -28.2505, west: -152.8763, east: -134.9391 },
    { name: "WALLIS ET FUTUNA", north: -13.1843, south: -14.6075, west: -178.2313, east: -175.9257 }
];

// Vérifie si les coordonnées fournies se trouvent dans une zone spécifiée
function isInBounds(latitude, longitude, bounds) {
    return latitude >= bounds.south && latitude <= bounds.north &&
           longitude >= bounds.west && longitude <= bounds.east;
}

// Vérifie si les coordonnées fournies se trouvent dans la France métropolitaine ou dans un DROM COM
function isInFranceOrDromCom(latitude, longitude) {
    var isInFranceMetropolitan = isInBounds(latitude, longitude, franceMetropolitanBounds);
    var isInDromCom = dromComBounds.some(function(bounds) {
        return isInBounds(latitude, longitude, bounds);
    });
    return isInFranceMetropolitan || isInDromCom;
}

// Fonction pour vérifier si les coordonnées se trouvent dans la France métropolitaine ou dans un DROM COM
function checkLocationInFrance(latitude, longitude) {
    if (isInFranceOrDromCom(latitude, longitude)) {
        return true; // Les coordonnées sont situées en France métropolitaine ou dans un DROM-COM
    } else {
        return false; // Les coordonnées ne sont pas situées en France métropolitaine ou dans un DROM-COM
    }
}


// Affichage de la carte complétée lors d'un clic sur le bouton "Rechercher"
function getStationLocation() {
    // Récupération des valeurs de latitude, longitude et station sélectionnée depuis les champs de saisie HTML
    var latitude = parseFloat(document.getElementById("latitude").value);
    var longitude = parseFloat(document.getElementById("longitude").value);
    var selectedStation = document.getElementById("station").value;

    // Si les coordonnées sont valides et situées en France, procéder à l'affichage de la station sur la carte
    if (!isNaN(latitude) && !isNaN(longitude)) {
        // Vérification si les coordonnées sont valides et dans les limites du monde réel
        if (checkLocationInBoundsWorld(latitude, longitude)) {
            // Vérification si les coordonnées sont dans les limites de la France métropolitaine ou des DOM-COM
            if (checkLocationInFrance(latitude, longitude)) {
                var closestStation = findClosestStation(latitude, longitude); // Trouve la station la plus proche
                showStationOnMap(closestStation.name); // Affiche la station la plus proche sur la carte
                showPositionOnMap(latitude, longitude)
            } else {
                // Si les coordonnées sont en dehors des limites de la France métropolitaine ou des DOM-COM, afficher un message d'erreur
                alert("Les coordonnées fournies ne sont pas situées en France métropolitaine ou dans les DOM-COM.");
                // Ne pas afficher la station sur la carte et laisser la carte vide
                initializeMap(48.8566, 2.3522); // Initialise la carte à la position par défaut (Paris)
            }
        } else {
            // Si les coordonnées ne sont pas valides ou sont en dehors des limites du monde réel, afficher un message d'erreur
            alert("Les coordonnées fournies ne sont pas valides.");
            // Ne pas afficher la station sur la carte et laisser la carte vide
            initializeMap(48.8566, 2.3522); // Initialise la carte à la position par défaut (Paris)
        }
    }
    // Si la méthode de recherche est celle par choix dans le menu déroulant
    else if (selectedStation) {
        // Si une station est sélectionnée, affiche uniquement cette station sur la carte
        showStationOnMap(selectedStation);
    }
    // Si ni les coordonnées ni la station ne sont renseignées
    else {
        // Affiche un message d'alerte demandant à l'utilisateur de fournir des coordonnées ou de sélectionner une station
        alert("Veuillez entrer des coordonnées ou sélectionner une station.");
    }

    // Empêche le formulaire de soumettre les données
    return false;
}



// Ajoute au menu déroulant les différentes stations 
function populateStationDropdown() {
    // Récupération de l'élément HTML du menu déroulant des stations
    var dropdown = document.getElementById("station");
    // Pour chaque station dans la liste des stations
    stations.forEach(function (station) {
        // Création d'un élément d'option pour cette station
        var option = document.createElement("option");
        // Attribution du texte de l'option au nom de la station
        option.text = station.name;
        // Ajout de l'option au menu déroulant
        dropdown.add(option);
    });
}

// Cette fonction sera appelée lorsqu'il y aura un changement dans le menu déroulant de la méthode de recherche
function toggleSearchFields() {
    var searchMode = document.getElementById("searchMode").value;
    var stationForm = document.getElementById("stationForm");
    var coordForm = document.getElementById("coordForm");
    var showOnMapBtn = document.getElementById("showOnMapBtn");

    // Si la méthode de recherche est "station", affiche le formulaire de choix de la station et masque le formulaire des coordonnées
    if (searchMode === "station") {
        stationForm.style.display = "block";
        coordForm.style.display = "none";
        showOnMapBtn.style.display = "block"; // Affiche le bouton
        // Réinitialise les champs de coordonnées à vide
        document.getElementById("latitude").value = "";
        document.getElementById("longitude").value = "";
        initializeMap(48.8566, 2.3522); // Initialise la carte à la position par défaut (Paris)        
    } 

    // Si la méthode de recherche est "coordinates", affiche le formulaire des coordonnées et masque le formulaire de choix de la station
    else if (searchMode === "coordinates") {
        stationForm.style.display = "none";
        coordForm.style.display = "block";
        showOnMapBtn.style.display = "block"; // Affiche le bouton
        // Réinitialise le menu déroulant pour qu'aucun choix ne soit sélectionné
        document.getElementById("station").selectedIndex = 0;
        initializeMap(48.8566, 2.3522); // Initialise la carte à la position par défaut (Paris)
        getLocation(); // Géolocalisation demandée 
    }
}

// Ajoute un écouteur d'événement pour détecter les changements dans le menu déroulant
document.getElementById("searchMode").addEventListener("change", toggleSearchFields);

// Appel initial pour afficher les champs corrects au chargement de la page
toggleSearchFields();
populateStationDropdown();


// CHOIX DE LA PERIODE TEMPORELLE 

// Remplir les menus déroulants des années de début et de fin avec les années appropriées
function populateYearDropdowns() {
    var startYearDropdown = document.getElementById("startYear");
    var endYearDropdown = document.getElementById("endYear");
    var currentYear = new Date().getFullYear();

    // Remplir le menu déroulant de l'année de début à partir de 2010 jusqu'à l'année actuelle
    for (var year = 2010; year < currentYear; year++) {
        var option = document.createElement("option");
        option.text = year;
        startYearDropdown.add(option);
    }

    // Remplir le menu déroulant de l'année de fin avec les mêmes années que l'année de début par défaut
    for (var year = 2010; year < currentYear; year++) {
        var option = document.createElement("option");
        option.text = year;
        endYearDropdown.add(option); 
    } 
}

// Mettre à jour les options du menu déroulant de l'année de fin en fonction de l'année sélectionnée comme date de début
function updateEndYearOptions() {
    var startYearDropdown = document.getElementById("startYear");
    var endYearDropdown = document.getElementById("endYear");
    var startYear = parseInt(startYearDropdown.value);
    var currentYear = new Date().getFullYear();

    // Supprimer toutes les options actuelles du menu déroulant de l'année de fin
    endYearDropdown.innerHTML = "";

    // Remplir le menu déroulant de l'année de fin à partir de l'année sélectionnée comme date de début jusqu'à l'année actuelle
    for (var year = startYear; year < currentYear; year++) {
        var option = document.createElement("option");
        option.text = year;
        endYearDropdown.add(option);
    }
}

// Appel initial pour peupler les menus déroulants des années
populateYearDropdowns();


// TABLEAU RECAPITULATIF

// Fonction pour envoyer la station sélectionnée dans le tableau récapitulatif
function sendStation() {
    var selectedStation = document.getElementById("station").value;
    var latitude = parseFloat(document.getElementById("latitude").value);
    var longitude = parseFloat(document.getElementById("longitude").value);

    // Si la méthode de recherche est par coordonnées et que les coordonnées sont valides,
    // alors on recherche la station la plus proche des coordonnées fournies
    if (!isNaN(latitude) && !isNaN(longitude)) {
        var closestStation = findClosestStation(latitude, longitude);
        // Si la station la plus proche existe, on l'utilise
        if (closestStation) {
            selectedStation = closestStation.name;
        }
    }

    // Mettre à jour la cellule du tableau avec le nom de la station sélectionnée
    document.getElementById("stationName").textContent = selectedStation;
}


// Fonction pour envoyer les dates sélectionnées dans le tableau récapitulatif
function sendDates() {
    // Récupérer les dates sélectionnées
    var startDate = document.getElementById("startYear").value;
    var endDate = document.getElementById("endYear").value;

    // Mettre à jour les cellules du tableau avec les dates sélectionnées
    document.getElementById("startDate").textContent = startDate;
    document.getElementById("endDate").textContent = endDate;

    // Enregistrer les dates dans le stockage local
    localStorage.setItem('selectedStartDate', startDate);
    localStorage.setItem('selectedEndDate', endDate);
} 


//ENVOYER LES PARAMETRES POUR GENERER LA BASE DE DONNEE
// Fonction pour envoyer les paramètres à l'application Flask et rediriger vers la page de visualisation des données
function envoyerParametres() {
    // Récupérer les valeurs des paramètres
    var station = document.getElementById("stationName").innerText;
    var dateDebut = document.getElementById("startDate").innerText;
    var dateFin = document.getElementById("endDate").innerText; 

    // Créer un objet avec les données à envoyer
    var donnees = {
        station: station,
        date_debut: dateDebut,
        date_fin: dateFin
    };

    // Envoyer les données à l'application Flask
    fetch('http://127.0.0.1:5000/recuperer-donnees', { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify(donnees)
    })
    .then(response => {
        if (response.ok) {
            alert('Vous pouvez à présent visualiser les données ou générer des fichiers exploitables.');
        } else {
            console.error('Erreur lors de la récupération des données');
        }
    })
    .catch(error => console.error('Erreur :', error));
}









