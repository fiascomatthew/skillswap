-- Démarrer une transaction
BEGIN;

-- Insérer des utilisateurs dans la table users
INSERT INTO users (firstname, lastname, email, password, image, location, created_at, updated_at) VALUES
('Jean', 'Dupont', 'jean.dupont@example.com', 'motdepasse1', NULL, 'Paris', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marie', 'Curie', 'marie.curie@example.com', 'motdepasse2', NULL, 'Lyon', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Alice', 'Martin', 'alice.martin@example.com', 'motdepasse3', NULL, 'Marseille', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Pierre', 'Durand', 'pierre.durand@example.com', 'motdepasse4', NULL, 'Toulouse', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Claire', 'Lefevre', 'claire.lefevre@example.com', 'motdepasse5', NULL, 'Nice', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('David', 'Moreau', 'david.moreau@example.com', 'motdepasse6', NULL, 'Nantes', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Eva', 'Roux', 'eva.roux@example.com', 'motdepasse7', NULL, 'Strasbourg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('François', 'Petit', 'francois.petit@example.com', 'motdepasse8', NULL, 'Montpellier', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Géraldine', 'Blanc', 'geraldine.blanc@example.com', 'motdepasse9', NULL, 'Bordeaux', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Hugo', 'Garcia', 'hugo.garcia@example.com', 'motdepasse10', NULL, 'Lille', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des catégories dans la table category
INSERT INTO category (name, created_at, updated_at) VALUES
('Programmation', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Design', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Marketing', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gestion de projet', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Réseaux', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des compétences dans la table skill
INSERT INTO skill (description, category_id, created_at, updated_at) VALUES
('Développement Web', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('UI/UX Design', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('SEO', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Gestion de projet Agile', 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Administration réseau', 5, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Développement Mobile', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Graphisme', 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
('Publicité en ligne', 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des disponibilités dans la table availability
INSERT INTO availability (user_id, date, start_time, end_time, created_at, updated_at) VALUES
(1, '2023-10-01', '09:00:00', '12:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, '2023-10-02', '13:00:00', '16:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, '2023-10-03', '10:00:00', '14:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, '2023-10-04', '08:00:00', '11:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, '2023-10-05', '15:00:00', '18:00:00', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des messages dans la table message
INSERT INTO message (sender_id, receiver_id, content, created_at, updated_at) VALUES
(1, 2, 'Bonjour Marie, comment ça va ?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 'Salut Jean, je vais bien merci !', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 'Salut Pierre, tu es disponible pour une réunion ?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 'Oui Alice, je suis disponible demain.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 6, 'Bonjour David, as-tu terminé le projet ?', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des évaluations dans la table review
INSERT INTO review (reviewer_id, reviewee_id, rating, review, created_at, updated_at) VALUES
(1, 2, 5, 'Excellent travail !', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 4, 'Très bon développeur.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 3, 'Bon travail, mais peut s''améliorer.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 5, 'Parfait, rien à redire.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 6, 2, 'Peut mieux faire.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des compétences possédées par un utilisateur dans la table user_has_skill
INSERT INTO user_has_skill (user_id, skill_id, description, priority, created_at, updated_at) VALUES
(1, 1, 'Expert en développement web', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 2, 'Spécialiste en UI/UX Design', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 3, 'Expert en SEO', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 4, 'Gestion de projet Agile', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 'Administration réseau', 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des compétences recherchées par un utilisateur dans la table user_has_interest
INSERT INTO user_has_interest (user_id, interest_id, priority, created_at, updated_at) VALUES
(1, 2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 5, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Insérer des abonnements (followers) dans la table user_has_follower
INSERT INTO user_has_follower (user_id, follower_id, created_at, updated_at) VALUES
(1, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 4, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 3, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 6, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

-- Valider la transaction
COMMIT;