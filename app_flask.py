from flask import Flask, jsonify, request
from generation_fichiers_excel import fichier_excel
from generation_fichiers_excel import fichier_excel_moyenne
from recuperation_de_donnees import gestion_bdd 
from datetime import datetime
import pandas as pd 
from flask_cors import CORS 


app = Flask(__name__) 
CORS(app)

data = pd.DataFrame() # Déclaration de la variable data
fichier_moyenne = ""

# Déclaration de la liste des stations avec les noms associés aux numéros
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


# Fonction pour trouver le numéro de station à partir du nom de la station
def trouver_numero_station(nom_station):
    for station in stations:
        if station['name'].upper() == nom_station.upper():
            return station['stationNumber']
    return None

## RECUPERATION DES DONNEES
@app.route('/recuperer-donnees', methods=['GET', 'POST'])
def recuperer_donnees():
    global data 
    # Récupérer les données envoyées depuis le formulaire
    donnees = request.json 
    station_nom = donnees['station']
    annee_debut = donnees['date_debut'] 
    annee_fin = donnees['date_fin'] 
    # Trouver le numéro de la station à partir de son nom
    numero_station = trouver_numero_station(station_nom)
    # Formatage de la date de début au format ISO 8601
    date_debut = str(datetime(int(annee_debut), 1, 1).date())  
    # Ajouter 1 à l'année de fin
    annee_fin_int = int(annee_fin)
    annee_fin_int += 1
    date_fin = str(datetime(int(annee_fin_int), 1, 1).date()) 
    # Appel de la fonction gestion_bdd pour récupérer les données
    data = gestion_bdd(numero_station, date_debut, date_fin)
    # Vérifier si des données ont été récupérées avec succès
    if data is not None:
        return '', 204
    else:
        # Retourner une réponse indiquant que les données n'ont pas pu être récupérées
        return jsonify({'message': 'Erreur lors de la récupération des données'}), 500


##ENVOI DES DONNEES
@app.route('/data', methods=['GET'])
def recup_data(): 
    global data
    if data is not None:
        # Convertir le DataFrame pandas en JSON
        data_json = data.to_json(orient='records')
        return data_json, 200 
    else:
        # Si aucune donnée n'est disponible, renvoyer une réponse avec le code de statut HTTP 204 (NO CONTENT)
        return '', 204


## GENERATION DE FICHIERS EXCEL POUR UNE ANNEE PRECISE 
@app.route('/telecharger-fichier-excel', methods=['POST'])
def telecharger_fichier_excel():
    global fichier 
    global data
    # Récupérer les données envoyées depuis le formulaire
    donnees = request.json
    annee_cible = donnees['annee']
    # Formater l'année en int 
    annee_cible = int(annee_cible)
    # Logique pour la génération du fichier Excel
    fichier = fichier_excel(data, annee_cible) 
    # Ne rien renvoyer  
    return ''  

## TELECHARGEMENT DES FICHIERS POUR UNE ANNEE
@app.route('/fichier-excel', methods=['GET'])
def excel(): 
    global fichier 
    # Téléchargement du fichier 
    return fichier 

## GENERATION DE FICHIERS EXCEL POUR UNE MOYENNE D'ANNEES
@app.route('/telecharger-fichier-excel-moyenne', methods=['POST'])
def telecharger_fichier_excel_moyenne():
    global fichier_moyenne 
    global data
    # Logique pour la génération du fichier Excel
    fichier_moyenne = fichier_excel_moyenne(data)  
    # Ne rien renvoyer  
    return '' 

## TELECHARGEMENT DES FICHIERS POUR UNE MOYENNE D'ANNEES
@app.route('/fichier-excel-moyenne', methods=['GET'])
def excel_moyenne(): 
    global fichier_moyenne 
    # Téléchargement du fichier 
    return fichier_moyenne


if __name__ == '__main__': 
    app.run(debug=True) 
