# Photographies du site

Le site affiche ses images depuis `public/images/`. Déposez vos propres fichiers dans ce dossier
**avec exactement les noms ci-dessous** — aucun redémarrage nécessaire (en dev : `npm run dev`).

Tant qu'un fichier est absent, le site affiche un emplacement de remplacement élégant
(papier ivoire, trame fine, monogramme **AB** + légende) : rien ne casse, les proportions sont déjà justes.

| Fichier | Emplacement sur le site | Sujet suggéré | Dimensions conseillées |
| --- | --- | --- | --- |
| `hero-patio.jpg` | Accueil — grand hero plein écran | Patio marocain contemporain : arches, bassin d'eau, murs en pierre ou tadelakt, détails sculptés, végétation | 2400 × 1500 |
| `about-artisan.jpg` | À propos — colonne de gauche | Artisan travaillant la pierre à la main dans un atelier | 1400 × 1750 |
| `portfolio-01.jpg` | Carte 01 — Arc espagnol | Semaine d'expert : arc de pierre style espagnol, blocs taillés et assemblés | 1200 × 1050 |
| `portfolio-02.jpg` | Carte 02 — Pilier de cheminée | Pilier de cheminée en pierre sculptée | 1200 × 1050 |
| `portfolio-03.jpg` | Carte 03 — Pieds de table | Deux pieds de table sculptés d'un motif floral | 1200 × 1050 |
| `portfolio-04.jpg` | Carte 04 — Pilier de table | Pilier intérieur cylindrique en pierre (support de table) | 1200 × 1050 |
| `portfolio-05.jpg` | Carte 05 — Panneau calligraphie | Panneau de pierre avec calligraphie arabe ciselée au ciseau | 1200 × 1050 |
| `portfolio-06.jpg` | Carte 06 — Nettoyage & restauration | Façade de l'atelier : nettoyage et reprise des sculptures détériorées | 1200 × 1050 |
| `portfolio-07.jpg` | Carte 07 — Linteau plat-bande | Linteau de cheminée en pierre, type plat-bande, taillé et sculpté | 1200 × 1050 |
| `portfolio-08.jpg` | Carte 08 — Encadrement de fenêtre | Encadrement de fenêtre en pierre à motifs floraux traditionnels | 1200 × 1050 |
| `portfolio-09.jpg` | Carte 09 — Base de chapiteau | Base de chapiteau en pierre sculptée | 1200 × 1050 |
| `portfolio-10.jpg` | Carte 10 — Chapiteau romain | Chapiteau de pierre d'inspiration romaine, motifs floraux en relief | 1200 × 1050 |
| `portfolio-11.jpg` | Carte 11 — Plateau de table **(EN COURS)** | À déposer quand le projet sera terminé — la carte affiche « EN COURS » tant que `wip: true` est présent dans le dictionnaire | 1200 × 1050 |
| `featured-texture.jpg` | Projet à la une — grande image verticale | Arc en pierre cintré ou détail de claveaux assemblés | 1400 × 1750 |
| `project-hero.jpg` | Page projet — hero | Arc espagnol monté dans l’atelier de l’Académie | 2400 × 1500 |
| `gallery-01.jpg` | Galerie projet — « Le traçage » | Traçage des gabarits et des cintres sur la pierre | 1000 × 1250 |
| `gallery-02.jpg` | Galerie projet — « La taille » | Taille des blocs aux outils traditionnels (ciseaux, gradine, massette) | 1000 × 1250 |
| `gallery-03.jpg` | Galerie projet — « Le cintrage » | Mise en cintre de la partie supérieure de l'arc | 1000 × 1250 |
| `gallery-04.jpg` | Galerie projet — « L'assemblage » | Assemblage des blocs taillés de l'arc | 1000 × 1250 |
| `gallery-05.jpg` | Galerie projet — « Le détail » | Éléments décoratifs inspirés de l'architecture traditionnelle | 1000 × 1250 |

## Notes

- **Ordre des fichiers** : `portfolio-01.jpg` → `portfolio-11.jpg` suivent **l'ordre d'affichage des cartes** sur le site (et non l'ordre des projets dans le CV). La carte 11 (plateau de table) est en cours de réalisation : déposez `portfolio-11.jpg` puis retirez `wip: true` de la carte dans `src/i18n/dict.fr.js` / `dict.ar.js` pour l'afficher.

- Formats : `.jpg` (ou `.webp`), profil **sRGB**, qualité 80–85.
- Un léger filtre chaud (assoupli, légère désaturation) est appliqué automatiquement pour unifier
  l'ensemble dans la palette minérale du site — inutile de pré-traiter les photos.
- Sur les cartes du portfolio, un voile sombre transparent est posé par-dessus les images pour
  garantir la lisibilité des titres blancs.
- Le site bascule automatiquement en **arabe / RTL** (sélecteur FR–AR dans l'en-tête) ; les photos
  sont utilisées telles quelles dans les deux langues.
