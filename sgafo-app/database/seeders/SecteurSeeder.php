<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class SecteurSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // 1. Création des CDCs avec leurs secteurs et métiers
        $hierarchy = [
            'Digital & Intelligence Artificielle' => [
                'code' => 'DIG',
                'secteurs' => [
                    'Développement Digital' => ['Full Stack', 'Front-end React/Angular', 'Back-end Laravel/Spring'],
                    'Infrastructure Digitale' => ['Administration Systèmes', 'Cloud Computing', 'Réseaux Informatiques'],
                    'Intelligence Artificielle' => ['Data Engineering', 'Machine Learning', 'Big Data'],
                    'Cybersécurité' => ['Sécurité des Réseaux', 'Audit et Pentesting'],
                    'Design Graphique & UX/UI' => ['Infographie', 'UX/UI Design'],
                ]
            ],
            'Gestion & Commerce' => [
                'code' => 'GES',
                'secteurs' => [
                    'Gestion des Entreprises' => ['Gestion PME', 'Ressources Humaines'],
                    'Commerce et Marketing' => ['E-commerce', 'Marketing Digital', 'Force de Vente'],
                    'Comptabilité et Finance' => ['Comptabilité d\'Entreprise', 'Finance et Banque'],
                    'Logistique et Transport' => ['Gestion de la Chaîne Logistique', 'Achat et Approvisionnement'],
                ]
            ],
            'Industrie' => [
                'code' => 'IND',
                'secteurs' => [
                    'Électromécanique' => ['Électromécanique des Systèmes Automatisés', 'Maintenance Industrielle'],
                    'Fabrication Mécanique' => ['Usinage', 'Chaudronnerie'],
                    'Génie Électrique' => ['Électricité de Maintenance Industrielle', 'Électronique'],
                    'Automobile' => ['Diagnostic Automobile', 'Réparation des Véhicules'],
                ]
            ],
            'Tourisme, Hôtellerie & Restauration' => [
                'code' => 'THR',
                'secteurs' => [
                    'Art Culinaire' => ['Cuisine Marocaine', 'Cuisine Internationale', 'Pâtisserie'],
                    'Management Touristique' => ['Animation Touristique', 'Gestion d\'Agence de Voyage'],
                    'Hébergement' => ['Réception', 'Gouvernance'],
                ]
            ],
            'Ingénierie Pédagogique' => [
                'code' => 'PED',
                'secteurs' => [
                    'Formation des Formateurs' => ['Pédagogie Active', 'Andragogie'],
                    'Soft Skills' => ['Communication', 'Leadership', 'Intelligence Émotionnelle'],
                ]
            ]
        ];

        foreach ($hierarchy as $cdcName => $cdcData) {
            $cdc = \App\Models\Cdc::firstOrCreate(
                ['code' => $cdcData['code']],
                [
                    'nom' => $cdcName,
                    'description' => "Complexe de Développement des Compétences spécialisé en $cdcName"
                ]
            );

            $secteurIndex = 1;
            foreach ($cdcData['secteurs'] as $secteurName => $metiers) {
                $secteurCode = $cdc->code . '-S' . $secteurIndex;
                $secteur = \App\Models\Secteur::firstOrCreate(
                    ['code' => $secteurCode],
                    [
                        'nom' => $secteurName,
                        'cdc_id' => $cdc->id
                    ]
                );

                $metierIndex = 1;
                foreach ($metiers as $metierName) {
                    $metierCode = $secteur->code . '-M' . $metierIndex;
                    \App\Models\Metier::firstOrCreate(
                        ['code' => $metierCode],
                        [
                            'nom' => $metierName,
                            'secteur_id' => $secteur->id
                        ]
                    );
                    $metierIndex++;
                }
                $secteurIndex++;
            }
        }
    }
}
