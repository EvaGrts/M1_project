// PEUPLER LE MENU DEROULANT 

// Fonction pour peupler le menu déroulant avec les années entre les dates sélectionnées
function populateYearsDropdown(startDate, endDate) {
    const selectYearDropdown = document.getElementById('selectedYear');

    for (let year = startDate; year <= endDate; year++) {
        const option = document.createElement('option');
        option.text = year;
        option.value = year;
        selectYearDropdown.add(option);
    }
}

// Attendez que le DOM soit chargé
document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les dates stockées localement
    const storedStartDate = localStorage.getItem('selectedStartDate');
    const storedEndDate = localStorage.getItem('selectedEndDate');
    
    // Vérifier si les dates sont disponibles
    if (storedStartDate && storedEndDate) {
        // Peupler le menu déroulant avec les dates stockées
        populateYearsDropdown(storedStartDate, storedEndDate);
    }
});


//ENVOYER LES PARAMETRES POUR GENERER LES FICHIERS EXCEL SUR UNE ANNEE PRECISE 

// Fonction pour envoyer l'année cible à l'application Flask et déclencher la génération des fichiers Excel
function envoyerAnnee() {
    // Récupérer la valeur de l'année sélectionnée dans le menu déroulant
    var anneecible = document.getElementById("selectedYear").value;

    // Créer un objet avec l'année à envoyer
    var annee = { "annee": anneecible };

    // Envoyer l'année à l'application Flask pour la génération du fichier Excel
    fetch('http://127.0.0.1:5000/telecharger-fichier-excel', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(annee) 
    })
    .then(response => {
        if (response.ok) {
            alert('Vous pouvez à présent générer des fichiers exploitables.');
        } else {
            console.error('Erreur');
        }
    })
    .catch(error => console.error('Erreur :', error));
}

// TELECHARGER LES FICHIERS EXPLOITABLES 

// Télécharger les fichiers pour une année cible  
function telechargerFichierExcel() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/fichier-excel', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            // Convertir les données JSON en objet JavaScript
            data = JSON.parse(xhr.responseText); 
            window.location.href = data;
        }
    };
    xhr.send();
}


// Fonction pour télécharger les fichiers Excel pour une moyenne d'années
function telechargerFichierExcelMoyenne() {
    // Effectuer une requête POST à la route Flask pour générer le fichier Excel de moyenne d'années
    fetch('http://127.0.0.1:5000/telecharger-fichier-excel-moyenne', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({}) // Vous pouvez passer des données si nécessaire
    })
    .then(response => {
        if (response.ok) {
            alert('Le fichier a été télécharger.');
        } else {
            // Gérer les erreurs de réponse ici
            console.error('Une erreur est survenue lors du lancement du script de génération du fichier Excel de moyenne d\'années.');
        }
    })
    .catch(error => {
        // Gérer les erreurs de requête ici
        console.error('Une erreur est survenue lors de la requête pour lancer le script de génération du fichier Excel de moyenne d\'années :', error);
    });
}
   

    


















