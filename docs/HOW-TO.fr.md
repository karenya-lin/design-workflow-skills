# Mode d’emploi · raccourcis

Sélectionner un élément sur la page ou dans l’arbre DOM replie automatiquement les réglages RWD. Le survol ne les replie pas. Rouvrez la ligne RWD pour modifier les dimensions ; la sélection et votre demande restent intactes.

**Icônes :** ↻ actualise les calques, sans recharger la page ; − réduit le panneau ; × le ferme ; ⇄ échange largeur et hauteur. Le chevron à droite de RWD ouvre ou ferme les réglages. Survolez une icône pour lire son nom, ou utilisez Tab puis Entrée/Espace. Les boutons ont une cible de 44px et une icône de 22px. Les étapes, la langue, les exclusions et la copie gardent leur texte. [Images actualisées](VISUAL-GUIDE.md#larger-icon-controls).

**Commandes actuelles :** l’option par défaut affiche **Langue** et détecte la langue automatiquement. Le bouton de la démo ouvre le panneau extérieur. Dans Périmètre, les repères numérotés permettent de rejoindre les éléments. **À copier** affiche les éléments inclus et le bouton ambré permet de choisir les exclusions. [État des vérifications](RELEASE-STATUS.md).

[Français](HOW-TO.fr.md) · [English](HOW-TO.en.md) · [繁體中文](HOW-TO.zh-TW.md) · [日本語](HOW-TO.ja.md)

L’interface UI Inspect et RWD existe en français. Les manuels complets des skills, captures et vidéos existent en anglais et chinois traditionnel ; cette page est un démarrage rapide, pas leur traduction intégrale.

| Besoin | Accès |
|---|---|
| Installer | [Guide débutant en anglais](BEGINNER.en.md) |
| Choisir un skill | [Index des skills](SKILL-MAP.md) |
| Voir chaque étape | [Galeries en anglais](../README.md#step-by-step-pictures) |
| Vidéo | [Démonstration en anglais](videos/inspector-en.webm) · [Transcription et limites](videos/README.md) |
| Vérifier les permissions | [Sécurité](../SECURITY.md) |

## Démarrer

Depuis le dépôt téléchargé, avec Python 3.11+ :

```sh
python ui-element-inspector/scripts/preview_server.py --port VOTRE_PORT_LIBRE
python scripts/settings.py --workspace "CHEMIN_COMPLET_DU_PROJET" --language en
```

Remplacez les paramètres en majuscules. Sous Windows, utilisez `py -3`. Ouvrez l’URL locale affichée et ajoutez `?lang=fr`. Le menu Python est anglais/chinois, mais la préférence de réponse de l’agent accepte `fr`.

Le sélecteur de langue s’illumine brièvement au premier lancement. Choisissez Français ou Automatique. L’ordre est : choix explicite, préférence fournie par l’IA, langue de la page, navigateur, puis anglais. L’outil ne peut pas lire les paramètres privés d’une autre application IA. Le lanceur peut fournir `?aiLang=fr`. Aucune préférence n’est enregistrée silencieusement. Le mode de réduction des animations conserve un simple contour.

## ① Sélection → ② Périmètre → ③ Demande

1. Ouvrez UI Inspect. Survolez la page ou l’arbre DOM pour prévisualiser. Cliquez sur le nom pour sélectionner ; les flèches déplient les conteneurs.
2. Repérez les éléments de même classe, balise ou annotation. Utilisez Précédent/Suivant et cochez les exceptions. Il s’agit de cette page, pas de tous les fichiers du projet.
3. Rédigez la modification, vérifiez le contexte puis copiez la demande dans votre conversation IA. Le texte saisi et les identifiants ne sont pas traduits automatiquement.

## Raccourcis

| Touche / contrôle | Action |
|---|---|
| Tab / Maj+Tab | Déplacer le focus ; Entrée/Espace active le contrôle |
| ← / →, Début / Fin sur les onglets | Changer de catégorie |
| ↑ / ↓ dans le DOM | Déplacer le focus entre calques visibles |
| → / ← dans le DOM | Déplier/entrer ou replier/remonter |
| Échap | Quitter la capture, sinon fermer l’inspecteur ; fermer les réglages RWD si ouverts |
| Ctrl+C / Cmd+C | Copier le texte sélectionné si la copie automatique est refusée |
| PrtSc / Print Screen | Capture selon les réglages Windows, après préparation de la fiche |
| Win+Maj+S | Sélection de capture Windows |
| Maj+Cmd+4 | Sélection de capture macOS |

Pour une capture : saisissez la demande, ouvrez Capture : la fiche et les contours apparaissent directement. Capturez la cible **et** la fiche lisible. Pour un contenu long, faites plusieurs images ou joignez le texte copié. Vérifiez les données privées avant de partager.

Les boutons Windows nécessitent le serveur local avec `--enable-snipping` et/ou `--enable-printscreen`, désactivés par défaut. Ils ne lisent pas le presse-papiers. Une requête acceptée ne prouve ni la capture ni le collage. Arrêtez votre serveur avec Ctrl+C ; ne fermez pas les processus d’autrui. Une routine doit être essayée manuellement puis vérifiée lors de sa première exécution réelle.

[Minimum install & optional companions / 最小安裝與選用搭配](../README.md#minimum-install-and-optional-companions) · [繁體中文](../README.zh-TW.md#最小安裝與建議搭配)

## Port

Le port n’est pas fixe : choisissez-le ou demandez à l’IA d’en choisir un disponible et d’indiquer l’URL réelle. `--port` doit contenir ce numéro. Réutilisez un aperçu autorisé ; ne terminez pas le processus d’autrui.


Dans l’espace autorisé de même origine, survolez l’aperçu pour ouvrir automatiquement l’inspecteur et l’arbre DOM. Aucun clic Démarrer/Reprendre n’est nécessaire. Le survol conserve la sélection et la demande ; cliquez pour changer de sélection. Sur un écran étroit, développez RWD pour afficher les réglages.
