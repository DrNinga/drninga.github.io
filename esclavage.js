// Script spécifique pour la page sur l'esclavage transsaharien

// Variables pour le quiz
let currentQuestion = 1;
let totalQuestions = 5;
let score = 0;
let answeredQuestions = {};

// Fonction pour vérifier les réponses du quiz
function checkAnswer(questionId, selectedOption) {
    // Si la question a déjà été répondue, ne rien faire
    if (answeredQuestions[questionId]) {
        return;
    }
    
    // Marquer la question comme répondue
    answeredQuestions[questionId] = true;
    
    // Définir les réponses correctes
    const correctAnswers = {
        'q1': 'b', // Du VIIe au XXe siècle
        'q2': 'c', // Environ 17 millions
        'q3': 'b', // Mauritanie
        'q4': 'c', // Les Berbères ibâdites
        'q5': 'c'  // 7,6 victimes pour 1 000 personnes
    };
    
    // Récupérer les éléments du DOM
    const options = document.querySelectorAll(`#question${questionId.substring(1)} .quiz-option`);
    const feedback = document.getElementById(`feedback-${questionId}`);
    
    // Vérifier si la réponse est correcte
    const isCorrect = selectedOption === correctAnswers[questionId];
    
    // Mettre à jour le score
    if (isCorrect) {
        score++;
    }
    
    // Afficher le feedback
    feedback.style.display = 'block';
    feedback.className = isCorrect ? 'quiz-feedback correct' : 'quiz-feedback incorrect';
    feedback.innerHTML = isCorrect 
        ? '<strong>Correct !</strong> Bonne réponse.' 
        : `<strong>Incorrect.</strong> La bonne réponse était l'option ${correctAnswers[questionId].toUpperCase()}.`;
    
    // Mettre en évidence la réponse correcte et incorrecte
    options.forEach(option => {
        const optionValue = option.querySelector('span').textContent.toLowerCase().charAt(0);
        if (optionValue === correctAnswers[questionId]) {
            option.classList.add('correct');
        } else if (optionValue === selectedOption) {
            option.classList.add('incorrect');
        }
    });
    
    // Activer le bouton suivant
    document.getElementById('next-btn').disabled = false;
    
    // Si toutes les questions ont été répondues, afficher les résultats
    if (Object.keys(answeredQuestions).length === totalQuestions) {
        document.getElementById('next-btn').textContent = 'Voir les résultats';
    }
}

// Fonction pour passer à la question suivante
function nextQuestion() {
    // Si on est à la dernière question et qu'elle a été répondue, afficher les résultats
    if (currentQuestion === totalQuestions && answeredQuestions[`q${currentQuestion}`]) {
        showResults();
        return;
    }
    
    // Cacher la question actuelle
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    
    // Passer à la question suivante
    currentQuestion++;
    
    // Afficher la nouvelle question
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
    
    // Activer le bouton précédent
    document.getElementById('prev-btn').disabled = false;
    
    // Désactiver le bouton suivant si la question n'a pas encore été répondue
    document.getElementById('next-btn').disabled = !answeredQuestions[`q${currentQuestion}`];
}

// Fonction pour revenir à la question précédente
function previousQuestion() {
    // Cacher la question actuelle
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    
    // Revenir à la question précédente
    currentQuestion--;
    
    // Afficher la nouvelle question
    document.getElementById(`question${currentQuestion}`).style.display = 'block';
    
    // Désactiver le bouton précédent si on est à la première question
    document.getElementById('prev-btn').disabled = currentQuestion === 1;
    
    // Activer le bouton suivant car on a forcément répondu à la question précédente
    document.getElementById('next-btn').disabled = false;
    
    // Mettre à jour le texte du bouton suivant
    document.getElementById('next-btn').textContent = 'Question suivante';
}

// Fonction pour afficher les résultats du quiz
function showResults() {
    // Cacher la dernière question
    document.getElementById(`question${currentQuestion}`).style.display = 'none';
    
    // Cacher les boutons de navigation
    document.querySelector('.quiz-navigation').style.display = 'none';
    
    // Afficher les résultats
    const resultsDiv = document.getElementById('quiz-results');
    resultsDiv.style.display = 'block';
    
    // Mettre à jour le score
    document.getElementById('score').textContent = score;
    
    // Afficher un message en fonction du score
    const messageDiv = document.getElementById('quiz-message');
    if (score === totalQuestions) {
        messageDiv.innerHTML = '<p>Félicitations ! Vous avez un excellent niveau de connaissance sur ce sujet.</p>';
    } else if (score >= totalQuestions * 0.7) {
        messageDiv.innerHTML = '<p>Bon travail ! Vous avez une bonne compréhension du sujet.</p>';
    } else if (score >= totalQuestions * 0.5) {
        messageDiv.innerHTML = '<p>Pas mal ! Vous avez une connaissance moyenne du sujet.</p>';
    } else {
        messageDiv.innerHTML = '<p>Vous pourriez améliorer vos connaissances sur ce sujet. N\'hésitez pas à relire les informations sur cette page.</p>';
    }
}

// Fonction pour réinitialiser le quiz
function resetQuiz() {
    // Réinitialiser les variables
    currentQuestion = 1;
    score = 0;
    answeredQuestions = {};
    
    // Cacher les résultats
    document.getElementById('quiz-results').style.display = 'none';
    
    // Afficher la première question
    document.getElementById('question1').style.display = 'block';
    
    // Réinitialiser les styles des options
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('correct', 'incorrect');
    });
    
    // Cacher les feedbacks
    const feedbacks = document.querySelectorAll('.quiz-feedback');
    feedbacks.forEach(feedback => {
        feedback.style.display = 'none';
    });
    
    // Réinitialiser les boutons de navigation
    document.querySelector('.quiz-navigation').style.display = 'flex';
    document.getElementById('prev-btn').disabled = true;
    document.getElementById('next-btn').disabled = true;
    document.getElementById('next-btn').textContent = 'Question suivante';
    
    // Cacher les questions 2 à 5
    for (let i = 2; i <= totalQuestions; i++) {
        document.getElementById(`question${i}`).style.display = 'none';
    }
}

// Fonction pour suivre la progression de lecture
function trackReadingProgress() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    document.getElementById("readingProgress").style.width = scrolled + "%";
}

// Fonction pour mettre en évidence la section active dans la navigation latérale
function highlightActiveSection() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.theme-nav a');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// Ajouter les écouteurs d'événements lorsque le DOM est chargé
document.addEventListener('DOMContentLoaded', function() {
    // Écouteur pour la barre de progression de lecture
    window.addEventListener('scroll', function() {
        trackReadingProgress();
        highlightActiveSection();
    });
    
    // Navigation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
});
