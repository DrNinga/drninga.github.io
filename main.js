// Script principal pour le site Dr. NINGA

document.addEventListener('DOMContentLoaded', function() {
    // Gestion du quiz sur la page d'accueil
    const checkAnswerBtn = document.getElementById('check-answer');
    if (checkAnswerBtn) {
        checkAnswerBtn.addEventListener('click', function() {
            const selectedOption = document.querySelector('input[name="q1"]:checked');
            const feedback = document.getElementById('quiz-feedback');
            
            if (!selectedOption) {
                feedback.textContent = "Veuillez sélectionner une réponse.";
                feedback.className = "quiz-feedback incorrect";
                feedback.style.display = "block";
                return;
            }
            
            const isCorrect = selectedOption.value === 'b';
            
            feedback.className = isCorrect ? "quiz-feedback correct" : "quiz-feedback incorrect";
            feedback.innerHTML = isCorrect 
                ? "<strong>Correct !</strong> Selon la première loi de Cipolla, nous sous-estimons toujours le nombre de personnes stupides." 
                : "<strong>Incorrect.</strong> La bonne réponse est : Le nombre de personnes stupides.";
            feedback.style.display = "block";
            
            // Mettre en évidence la réponse correcte
            document.querySelectorAll('input[name="q1"]').forEach(input => {
                const label = input.parentElement;
                if (input.value === 'b') {
                    label.classList.add('correct');
                } else if (input === selectedOption) {
                    label.classList.add('incorrect');
                }
            });
            
            // Désactiver le bouton après la réponse
            checkAnswerBtn.disabled = true;
        });
    }
    
    // Navigation fluide pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Ne rien faire si le lien est juste "#" ou s'il s'agit d'un menu déroulant
            if (targetId === '#' || this.classList.contains('dropbtn')) {
                return;
            }
            
            e.preventDefault();
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion du menu déroulant sur mobile
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            const nav = document.querySelector('nav ul');
            nav.classList.toggle('show');
        });
    }
    
    // Mise en évidence de la section active lors du défilement
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Mettre à jour la navigation latérale si elle existe
        const navLinks = document.querySelectorAll('.theme-nav a');
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
