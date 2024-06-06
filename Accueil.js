$(document).ready(function () {
    
    let apiKey = ""; // Initialisation de la variable contenant la clé API 
    let map; // Déclaration de la variable de carte à l'échelle globale
    let showAlert = true; // Déclaration de la variable showAlert

    // Fonction pour initialiser la carte avec les coordonnées de Paris
    function initializeMap() {
        const centerCoordinates = [48.8566, 2.3522]; // Coordonnées de Paris
        const initialZoomLevel = 6; // Niveau de zoom initial
        // Initialise la carte avec les coordonnées et le niveau de zoom choisis
        map = L.map('map').setView(centerCoordinates, initialZoomLevel); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(map);
    }

    // Initialiser la carte après avoir récupéré la clé API
    initializeMap();

    $("#meteoTR").on("click", function () {
        // Obtention de la clé API à partir du champ de saisie 
        apiKey = $("#apiKey").val();

        // Vérification que la clé API est entrée 
        if (apiKey.trim() === "") {
            alert("S'il vous plaît, entrez votre clé API");
            return;
        }

        // Récupération des données météorologiques à l'aide de la clé API saisie
        fetchWeatherData();

    });

    // Définition de l'icône personnalisée et de la fonction de traduction à l'intérieur de $(document).ready()
    const customIcon = L.divIcon({
        className: 'custom-marker',
        iconSize: [10, 10],
        iconAnchor: [5, 5],
        popupAnchor: [0, -30],
    });

    // Traduction des description météorologiques et affichage des icones associées 
    function traduireDescription(description) {
        const traductions = {
            "clear sky": "Ciel dégagé",
            "few clouds": "Quelques nuages",
            "scattered clouds": "Nuages épars",
            "broken clouds": "Nuages fragmentés",
            "overcast clouds": "Ciel couvert",
            "shower rain": "Averses",
            "rain": "Pluie",
            "thunderstorm": "Orage",
            "snow": "Neige",
            "mist": "Brume",
            "thunderstorm with light rain": "Orage avec pluie légère",
            "thunderstorm with rain": "Orage avec pluie",
            "thunderstorm with heavy rain": "Orage avec fortes pluies",
            "light thunderstorm": "Orage léger",
            "heavy thunderstorm": "Orage violent",
            "ragged thunderstorm": "Orage déchiqueté",
            "thunderstorm with light drizzle": "Orage avec bruine légère",
            "thunderstorm with drizzle": "Orage avec bruine",
            "thunderstorm with heavy drizzle": "Orage avec forte bruine",
            "light intensity drizzle": "Bruine légère",
            "drizzle": "Bruine",
            "heavy intensity drizzle": "Forte bruine",
            "light intensity drizzle rain": "Pluie légère avec bruine",
            "drizzle rain": "Pluie avec bruine",
            "heavy intensity drizzle rain": "Pluie forte avec bruine",
            "shower rain and drizzle": "Averses de pluie et bruine",
            "heavy shower rain and drizzle": "Fortes averses de pluie et bruine",
            "shower drizzle": "Averses de bruine",
            "light rain": "Pluie légère",
            "moderate rain": "Pluie modérée",
            "heavy intensity rain": "Pluie forte",
            "very heavy rain": "Pluie très forte",
            "extreme rain": "Pluie extrême",
            "freezing rain": "Pluie verglaçante",
            "light intensity shower rain": "Averses légères de pluie",
            "shower rain": "Averses de pluie",
            "heavy intensity shower rain": "Averses fortes de pluie",
            "ragged shower rain": "Averses déchiquetées de pluie",
            "light snow": "Neige légère",
            "heavy snow": "Neige abondante",
            "sleet": "Pluie verglaçante",
            "light shower sleet": "Averses légères de pluie verglaçante",
            "shower sleet": "Averses de pluie verglaçante",
            "light rain and snow": "Pluie légère et neige",
            "rain and snow": "Pluie et neige",
            "light shower snow": "Averses légères de neige",
            "shower snow": "Averses de neige",
            "heavy shower snow": "Fortes averses de neige",
            "smoke": "Fumée",
            "haze": "Brume sèche",
            "dust": "Poussière",
            "sand/dust whirls": "Tourbillons de sable/poussière",
            "fog": "Brouillard",
            "sand": "Sable",
            "volcanic ash": "Cendres volcaniques",
            "squalls": "Rafales",
            "tornado": "Tornade"
        }; 
        
        // Association des icônes aux descriptions météorologiques 
        const icons = {
            "clear sky": "Images/clearsky.png",
            "few clouds": "Images/fewclouds.png",
            "scattered clouds": "Images/scatteredclouds.png",
            "broken clouds": "Images/brokenclouds.png",
            "overcast clouds": "Images/brokenclouds.png",
            "shower rain": "Images/showerrain.png",
            "light intensity drizzle": "Images/showerrain.png",
            "drizzle": "Images/showerrain.png",
            "heavy intensity drizzle": "Images/showerrain.png",
            "light intensity drizzle rain": "Images/showerrain.png",
            "drizzle rain": "Images/showerrain.png",
            "heavy intensity drizzle rain": "Images/showerrain.png",
            "shower rain and drizzle": "Images/showerrain.png",
            "heavy shower rain and drizzle": "Images/showerrain.png",
            "shower drizzle": "Images/showerrain.png",
            "light rain": "Images/rain.png",
            "moderate rain": "Images/rain.png",
            "heavy intensity rain": "Images/rain.png",
            "very heavy rain": "Images/rain.png",
            "extreme rain": "Images/rain.png",
            "freezing rain": "Images/rain.png",
            "light intensity shower rain": "Images/showerrain.png",
            "shower rain": "Images/showerrain.png",
            "heavy intensity shower rain": "Images/showerrain.png",
            "ragged shower rain": "Images/showerrain.png",
            "light snow": "Images/snow.png",
            "heavy snow": "Images/snow.png",
            "sleet": "Images/snow.png",
            "light shower sleet": "Images/snow.png",
            "shower sleet": "Images/snow.png",
            "light rain and snow": "Images/snow.png",
            "rain and snow": "Images/snow.png",
            "light shower snow": "Images/snow.png",
            "shower snow": "Images/snow.png",
            "heavy shower snow": "Images/snow.png",
            "mist": "Images/mist.png",
            "smoke": "Images/mist.png",
            "haze": "Images/mist.png",
            "dust": "Images/mist.png",
            "sand/dust whirls": "Images/mist.png",
            "fog": "Images/mist.png",
            "sand": "Images/mist.png",
            "volcanic ash": "Images/mist.png",
            "squalls": "Images/mist.png",
            "tornado": "Images/mist.png",
        };

        const icon = icons[description] || 'default.png';

        return `${traductions[description] || description} <img src="${icon}" alt="${description} icon" width="20" height="20"/>`;
    }

    function fetchWeatherData() {

        const cities = [ 
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
            { "name": "Nice", "stationNumber": "07690", "coordinates": [43.7102, 7.262] },
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
            { "name": "Les Eparses de l'océan Indien", "stationNumber": "61976", "coordinates": [13.4397, 49.8805]}
        ]
         
            

        cities.forEach(city => {
            const marker = L.marker(city.coordinates, { icon: customIcon }).addTo(map);
            marker.bindPopup(`<b>${city.name}</b><br>Données: En attente...`);

            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.coordinates[0]}&lon=${city.coordinates[1]}&appid=${apiKey}&units=metric`;

            // Utilisation de fetch pour récupérer les données météo
        fetch(apiUrl)
        .then(response => {
            // Vérification de la réponse de l'API
            if (!response.ok) {
                throw new Error('Erreur lors de la récupération des données météo. Veuillez vérifier votre clé API.');
            }
            return response.json();
        })
        .then(data => {
            // Traitement des données météo
            const content = `
                <b>${city.name}</b><br>
                Température: ${data.main.temp}°C<br>
                Description: ${traduireDescription(data.weather[0].description)}<br>
                Humidité: ${data.main.humidity}%<br>
                Vitesse du vent: ${data.wind.speed} m/s
            `;
            marker.setPopupContent(content);
        })
        .catch(error => {
            console.error(`Erreur lors de la récupération des données météo pour ${city.name}`, error);
            // Afficher l'alerte uniquement si showAlert est vrai
            if (showAlert) {
                showAlert = false; // Désactiver l'affichage de l'alerte pour les prochaines erreurs
                alert('Erreur lors de la récupération des données météo. Veuillez vérifier votre clé API.');
            }
        });  
    }); 

}});   