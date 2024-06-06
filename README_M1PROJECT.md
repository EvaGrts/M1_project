# **Application de génération de fichiers Excel**

## Table des matières
1. [Informations générales](#infos-generales)
2. [Fonctionnalités](#fonctionnalites)
3. [Installation](#installation)
4. [Utilisation](#utilisation)



## Informations générales  

Cette application web permet de générer des fichiers Excel à partir de données stockées localement. Elle utilise une combinaison de JavaScript, HTML et CSS pour le front-end et Flask et Python pour le back-end.


## Fonctionnalités

**Visualisation de la météo en temps réel des stations**
L'application récupère les données météorologiques en temps réel des différentes stations météorologiques à partir de l'API OpenWeatherMap. Les utilisateurs peuvent cliquer sur les marqueurs de la carte pour voir les détails météorologiques de chaque station.

**Choix des paramètres**
L’utilisateur est invité à choisir la station ainsi que la période temporelle, paramètres pour lesquels il souhaite récupérés les données. Les données seront récupérées via l’API d’Opendatasoft.  

**Visualisation des données cibles**
Les données météorologiques cibles sont visualisées sous forme de graphiques 2D et 3D. Les utilisateurs peuvent choisir la variable qu'ils souhaitent visualiser (température, humidité, point de rosée) et les graphiques sont mis à jour en conséquence.

**Téléchargement des fichiers Excel**
L'application permet aux utilisateurs de télécharger les données météorologiques au format Excel pour une analyse ultérieure. Cette fonctionnalité est implémentée à l'aide de scripts Python qui téléchargent les données à partir de sources externes et les enregistrent dans des fichiers Excel.


## Installation

Clonez le répertoire du projet sur votre machine.
Assurez vous d'avoir Python installé.
Installez Flask en exécutant : pip install flask
Installez les bibliothèques nécessaires :
pip install pandas
pip install flask-cors
pip install openpyxl
Lancez l'application en exécutant : python app_flask.py
Accédez à l'application dans votre navigateur à l'adresse : http://localhost:5000


## Utilisation

1. Sélectionnez une station météorologique à partir de la liste déroulante ou en rentrant les coordonnées.
2. Choisissez une plage de dates en utilisant les options disponibles.
3. Sélectionnez une année spécifique à partir du menu déroulant.
4. Cliquez sur le bouton "Générer Fichier Excel" pour générer et télécharger le fichier correspondant à l'année sélectionnée pour la station choisie.
Vous pouvez également cliquer sur le bouton "Générer Fichier Excel Moyenne" pour générer et télécharger un fichier Excel pour une moyenne d'années pour la station sélectionnée. 



*Autrices : Eva GRATIUS & Auxane MARREC* 
