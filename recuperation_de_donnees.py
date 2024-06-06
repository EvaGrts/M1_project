## Imports de base 
import pandas as pd 
from datetime import datetime
import requests
#import wet_bulb
from openpyxl import Workbook
from openpyxl.utils.dataframe import dataframe_to_rows
from openpyxl.styles import Color, Border, Side
from openpyxl.formatting.rule import ColorScaleRule
 

def recuperation_donnees_via_API(station, date_debut, date_fin):
    """
    Cette fonction récupère les données météorologiques à partir de l'API d'OpenDataSoft pour une station donnée
    dans une plage de dates spécifiée.
    arguments:
        station (str): Identifiant de la station météorologique.
        date_debut (str): Date de début au format 'YYYY-MM-DD'.
        date_fin (str): Date de fin au format 'YYYY-MM-DD'.
    returns:
        pandas.DataFrame or None: Un DataFrame contenant les données météorologiques si des enregistrements sont
        trouvés, sinon None.

    """
    # URL de l'API d'OpenDataSoft pour les observations météorologiques
    url_api = f'https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/donnees-synop-essentielles-omm/records?select=numer_sta%2C%20date%2C%20td%2C%20u%2C%20tc%2C%20latitude%2C%20longitude%2C%20libgeo%2C%20codegeo%2C%20nom_dept&where=numer_sta%20%3D%20%27{station}%27%20AND%20date%20%3E%3D%20%27{date_debut}T00%3A00%3A00%2B00%3A00%27%20AND%20date%20%3C%3D%20%27{date_fin}T00%3A00%3A00%2B00%3A00%27&order_by=date&limit=-1'
                

    # Effectuer la requête HTTP pour obtenir les données météorologiques
    response = requests.get(url_api)
    # Vérifier si la requête a réussi (code 200) et si la réponse contient du contenu
    if response.status_code == 200 and response.text:
        # Obtenir les données brutes au format JSON
        donnees_json = response.json()
        # Extraire la liste des enregistrements (results)
        records = donnees_json.get('results', [])

        # Vérifier si des enregistrements sont disponibles
        if records:
            # Créer un DataFrame pandas
            df = pd.json_normalize(records)
            # Convertir la colonne 'date' en format datetime
            df['date'] = pd.to_datetime(df['date'])
            # Retourner le DataFrame
            return df
        else:
            print("Aucun enregistrement trouvé.")
            return None
    else:
        print(f"Erreur de requête pour les données météorologiques : {response.status_code}")
        return None
    

# Fonction pour transformer les données en nombres pairs afin de mettre les données d'humidite par pas de 2 pour faciliter l'integration dans la tableau excel
def transformer_en_pairs(data):
    """
    Cette fonction prend une liste de données en entrée et retourne une nouvelle liste où chaque élément est un
    nombre pair. Si un élément de la liste d'entrée est impair, il est augmenté de 1 pour devenir pair.
    arguments:
        data (list): Une liste de données.
    returns:
        list: Une nouvelle liste de données avec tous les éléments pairs.
    """
    return [x + 1 if x % 2 != 0 else x for x in data]


def gestion_bdd(station, date_debut, date_fin):
    ## RECUPERATION DES DONNEES

    donnees_df = recuperation_donnees_via_API(station, date_debut, date_fin)

    #vérification si les données ont été récupérées avec succès
    if donnees_df is not None:
        #recuperation de toutes les données demandées car seulement 100 lignes à la fois avec l'api

        #initialisation à une date minimale
        derniere_date_df = datetime.min 
        while derniere_date_df != date_fin:

            #récupération de la date de la dernière ligne du DataFrame
            derniere_date_df = donnees_df.iloc[-1]['date']

            #conversion de la chaîne en objet de date
            derniere_date_df = pd.to_datetime(derniere_date_df)

            #isolation de la date (sans les heures)
            derniere_date_df = derniere_date_df.strftime("%Y-%m-%d")
            
            #appel de la fonction traitement_donnees() pour obtenir les données à partir de la dernière date jusqu'à la date de fin
            donnees =  recuperation_donnees_via_API(station, derniere_date_df, date_fin)

            #vérification si de nouvelles données ont été récupérées avec succès
            if donnees is not None:
                #concaténation des nouvelles données au DataFrame existant
                donnees_df = pd.concat([donnees_df, donnees], ignore_index=True)
            else:
                break  #sortir de la boucle si aucune donnée n'est disponible

        print("Les données ont bien été récupérées")
        # Supprimer les doublons en se basant sur toutes les colonnes
        donnees_df = donnees_df.drop_duplicates()

        ## GESTION DES COLONNES A CONSERVER

        # Liste des colonnes à conserver 
        colonnes_specifiques = ['numer_sta', 'date', 'td', 'u', 'tc', 'latitude', 'longitude', 'libgeo', 'codegeo', 'nom_dept']

        # Définir de nouveaux noms de colonnes
        nouveaux_noms_colonnes = ['id_station', 'date', 'pt_de_rosee', 'humidite', 'temp_celsius', 'latitude', 'longitude', 'nom_commune', 'code_commune', 'nom_dept']

        # Assigner les nouveaux noms de colonnes
        donnees_df.columns = nouveaux_noms_colonnes


        ## GESTION DES VALEURS MANQUANTES DANS LA BASE DE DONNEES

        #gerer les problemes de donnees manquantes
        donnees_df['humidite'] = donnees_df['humidite'].fillna((donnees_df['humidite'].shift() + donnees_df['humidite'].shift(-1)) / 2)
        donnees_df['temp_celsius'] = donnees_df['temp_celsius'].fillna((donnees_df['temp_celsius'].shift() + donnees_df['temp_celsius'].shift(-1)) / 2)

        #arrondir les donnees de temeprature et d'humidite 
        donnees_df['temp_celsius'] = round(donnees_df['temp_celsius'])
        donnees_df['humidite'] = round(donnees_df['humidite'])

        ##GESTION DES DONNEES POUR MIEUX LES INTEGRER DANS LE FICHIER EXCEL

        #Transformation des données en nombres pairs afin de mettre les données d'humidite par pas de 2
        donnees_df['humidite'] = transformer_en_pairs(donnees_df['humidite'])

    return donnees_df
