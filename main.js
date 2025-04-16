// Script principal pour le site sur la Théorie de la Stupidité

document.addEventListener('DOMContentLoaded', function() {
    // Animation du logo au chargement
    animateLogo();
    
    // Initialisation des animations au défilement
    initScrollAnimations();
    
    // Initialisation du quiz
    initQuiz();
    
    // Gestion du menu de navigation
    initNavigation();
});

// Animation du logo Dr. NINGA
function animateLogo() {
    const logo = document.querySelector('.hero-logo img');
    if (logo) {
        logo.style.opacity = '0';
        setTimeout(() => {
            logo.style.transition = 'opacity 1.5s ease, filter 2s infinite alternate';
            logo.style.opacity = '1';
        }, 500);
    }
}

// Animations au défilement
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
}

// Gestion du menu de navigation
function initNavigation() {
    const header = document.querySelector('header');
    const navLinks = document.querySelectorAll('nav a');
    
    // Effet de scroll sur le header
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Navigation fluide
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Initialisation du quiz interactif
function initQuiz() {
    const quizContainer = document.querySelector('.quiz-container');
    if (!quizContainer) return;
    
    const questions = [
        {
            question: "Selon la première loi de Cipolla, nous sous-estimons toujours...",
            options: [
                "Le nombre de personnes intelligentes",
                "Le nombre de personnes stupides",
                "Le pouvoir des bandits",
                "L'impact de nos actions"
            ],
            correct: 1
        },
        {
            question: "La stupidité, selon la deuxième loi, est...",
            options: [
                "Plus fréquente chez les personnes peu éduquées",
                "Liée au statut social",
                "Indépendante de toute autre caractéristique de la personne",
                "Un trait qui diminue avec l'âge"
            ],
            correct: 2
        },
        {
            question: "Une personne stupide est celle qui...",
            options: [
                "Cause des pertes aux autres sans en tirer aucun bénéfice",
                "Ne comprend pas les concepts complexes",
                "Agit toujours dans son propre intérêt",
                "Fait des erreurs fréquentes"
            ],
            correct: 0
        },
        {
            question: "Selon la quatrième loi, les personnes non stupides...",
            options: [
                "Peuvent facilement identifier les personnes stupides",
                "Sous-estiment le pouvoir destructeur des stupides",
                "Sont plus nombreuses que les personnes stupides",
                "Peuvent facilement devenir stupides"
            ],
            correct: 1
        },
        {
            question: "La cinquième loi affirme que la personne stupide est...",
            options: [
                "Facile à rééduquer",
                "Moins dangereuse qu'un bandit",
                "Le type d'individu le plus dangereux",
                "Consciente de sa stupidité"
            ],
            correct: 2
        }
    ];
    
    let currentQuestion = 0;
    let score = 0;
    
    // Afficher la première question
    showQuestion(currentQuestion);
    
    // Fonction pour afficher une question
    function showQuestion(index) {
        if (index >= questions.length) {
            showResults();
            return;
        }
        
        const question = questions[index];
        let questionHTML = `
            <div class="quiz-question">
                <h3>${question.question}</h3>
                <div class="quiz-options">
        `;
        
        question.options.forEach((option, i) => {
            questionHTML += `
                <div class="quiz-option" data-index="${i}">
                    ${option}
                </div>
            `;
        });
        
        questionHTML += `
                </div>
            </div>
            <div class="quiz-buttons">
                <button class="btn btn-prev" ${index === 0 ? 'disabled' : ''}>Précédent</button>
                <button class="btn btn-next" disabled>Suivant</button>
            </div>
        `;
        
        quizContainer.innerHTML = questionHTML;
        
        // Ajouter les écouteurs d'événements
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.addEventListener('click', function() {
                // Désélectionner toutes les options
                options.forEach(opt => opt.classList.remove('selected'));
                
                // Sélectionner l'option cliquée
                this.classList.add('selected');
                
                // Activer le bouton suivant
                document.querySelector('.btn-next').disabled = false;
            });
        });
        
        // Bouton précédent
        const prevButton = document.querySelector('.btn-prev');
        if (prevButton) {
            prevButton.addEventListener('click', function() {
                currentQuestion--;
                showQuestion(currentQuestion);
            });
        }
        
        // Bouton suivant
        const nextButton = document.querySelector('.btn-next');
        if (nextButton) {
            nextButton.addEventListener('click', function() {
                const selectedOption = document.querySelector('.quiz-option.selected');
                if (selectedOption) {
                    const selectedIndex = parseInt(selectedOption.getAttribute('data-index'));
                    if (selectedIndex === questions[currentQuestion].correct) {
                        score++;
                    }
                }
                
                currentQuestion++;
                showQuestion(currentQuestion);
            });
        }
    }
    
    // Fonction pour afficher les résultats
    function showResults() {
        let resultMessage = '';
        
        if (score === questions.length) {
            resultMessage = "Parfait ! Vous êtes un véritable expert de la Théorie de la Stupidité !";
        } else if (score >= questions.length * 0.7) {
            resultMessage = "Excellent ! Vous avez bien compris les principes de Carlo Cipolla.";
        } else if (score >= questions.length * 0.5) {
            resultMessage = "Pas mal ! Vous avez saisi les bases de la Théorie de la Stupidité.";
        } else {
            resultMessage = "Il semble que vous ayez encore des choses à apprendre sur la Théorie de la Stupidité.";
        }
        
        quizContainer.innerHTML = `
            <div class="quiz-results">
                <h3>Résultats</h3>
                <p>Votre score : ${score}/${questions.length}</p>
                <p>${resultMessage}</p>
                <button class="btn btn-restart">Recommencer le quiz</button>
                <div class="social-share">
                    <p>Partagez vos résultats :</p>
                    <div class="share-buttons">
                        <a href="#" class="share-facebook">Facebook</a>
                        <a href="#" class="share-twitter">Twitter</a>
                    </div>
                </div>
            </div>
        `;
        
        // Bouton pour recommencer
        const restartButton = document.querySelector('.btn-restart');
        if (restartButton) {
            restartButton.addEventListener('click', function() {
                currentQuestion = 0;
                score = 0;
                showQuestion(currentQuestion);
            });
        }
        
        // Boutons de partage
        const shareButtons = document.querySelectorAll('.share-buttons a');
        shareButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                // Logique de partage à implémenter
                alert('Fonctionnalité de partage à implémenter');
            });
        });
    }
}

// Graphique interactif des quatre types de personnes
function initQuadrantGraph() {
    const canvas = document.getElementById('quadrant-graph');
    if (!canvas || !canvas.getContext) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Dessiner les axes
    ctx.strokeStyle = '#e6a64d';
    ctx.lineWidth = 2;
    
    // Axe horizontal
    ctx.beginPath();
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    
    // Axe vertical
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.stroke();
    
    // Étiquettes des quadrants
    ctx.font = '16px Montserrat';
    ctx.fillStyle = '#f5f5f5';
    
    // Quadrant 1: Intelligent
    ctx.fillText('INTELLIGENT', width * 0.75, height * 0.25);
    
    // Quadrant 2: Abusé
    ctx.fillText('ABUSÉ', width * 0.25, height * 0.25);
    
    // Quadrant 3: Stupide
    ctx.fillText('STUPIDE', width * 0.25, height * 0.75);
    
    // Quadrant 4: Bandit
    ctx.fillText('BANDIT', width * 0.75, height * 0.75);
    
    // Étiquettes des axes
    ctx.fillText('Gain pour soi', width - 100, height / 2 - 10);
    ctx.fillText('Perte pour soi', 10, height / 2 - 10);
    ctx.fillText('Gain pour les autres', width / 2 + 10, 20);
    ctx.fillText('Perte pour les autres', width / 2 + 10, height - 10);
}

// Mode sombre/clair
function initDarkModeToggle() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    if (!darkModeToggle) return;
    
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('light-mode');
        
        // Sauvegarder la préférence
        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
            darkModeToggle.textContent = '🌙';
        } else {
            localStorage.setItem('theme', 'dark');
            darkModeToggle.textContent = '☀️';
        }
    });
    
    // Vérifier la préférence sauvegardée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        darkModeToggle.textContent = '🌙';
    }
}
