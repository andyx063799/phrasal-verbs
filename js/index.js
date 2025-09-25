        // - Este es un arreglo de objetos con los phrasal verbs
        const phrasalVerbs = [
            {
                phrasal: "bring up",
                meaning: "mencionar, sacar (un tema)",
                example: "She brought up an interesting point during the meeting."
            },
            {
                phrasal: "carry out",
                meaning: "llevar a cabo, realizar, ejecutar",
                example: "The team will carry out the project next month."
            },
            {
                phrasal: "come across",
                meaning: "encontrarse con, toparse con, parecer (dar una impresión)",
                example: "I came across an old friend at the supermarket."
            },
            {
                phrasal: "come up with",
                meaning: "idear, inventar, proponer",
                example: "We need to come up with a solution quickly."
            },
            {
                phrasal: "cut off",
                meaning: "cortar, desconectar, interrumpir",
                example: "The phone call was cut off suddenly."
            },
            {
                phrasal: "drop out",
                meaning: "abandonar, dejar (la escuela, un curso), retirarse",
                example: "He decided to drop out of college."
            },
            {
                phrasal: "end up",
                meaning: "terminar (en un lugar o situación), acabar",
                example: "We ended up staying home because of the rain."
            },
            {
                phrasal: "figure out",
                meaning: "resolver, descubrir, entender",
                example: "I need to figure out this math problem."
            },
            {
                phrasal: "fill out",
                meaning: "completar (un formulario), rellenar",
                example: "Please fill out this application form."
            },
            {
                phrasal: "find out",
                meaning: "descubrir, averiguar, enterarse",
                example: "I found out the truth about what happened."
            },
            {
                phrasal: "get along",
                meaning: "llevarse bien, congeniar",
                example: "They get along very well with their neighbors."
            },
            {
                phrasal: "get away",
                meaning: "escapar, alejarse, salir (de vacaciones)",
                example: "We're planning to get away for the weekend."
            },
            {
                phrasal: "get back",
                meaning: "regresar, volver",
                example: "What time did you get back from work?"
            },
            {
                phrasal: "get by",
                meaning: "sobrevivir, arreglárselas, salir adelante",
                example: "It's hard to get by on such a small salary."
            },
            {
                phrasal: "get over",
                meaning: "superar, recuperarse (de algo)",
                example: "It took her months to get over the breakup."
            },
            {
                phrasal: "give up",
                meaning: "rendirse, abandonar, dejar de intentar",
                example: "Don't give up, you're almost finished!"
            },
            {
                phrasal: "go on",
                meaning: "continuar, suceder, pasar",
                example: "What's going on here?"
            },
            {
                phrasal: "grow up",
                meaning: "crecer, madurar",
                example: "I grew up in a small town."
            },
            {
                phrasal: "hang on",
                meaning: "aguantar",
                example: "Hang on a second, I'll be right back."
            },
            {
                phrasal: "hold on",
                meaning: "esperar, resistir",
                example: "Hold on, let me check my calendar."
            }
        ];

        // - Variables para el modo examen
        let currentQuestion = 0;
        let score = 0;
        let examQuestions = [];
        let examInProgress = false;

        // - Esta funcion va a ocultar todas las secciones xd
        function hideAllSections() {
            document.querySelectorAll('.quiz-section').forEach(section => {
                section.classList.remove('active');
            });
        }


        function startExamMode() {
            hideAllSections();
            document.getElementById('examMode').classList.add('active');

            // Si ya hay un examen en progreso, continuar donde se quedó
            if (examInProgress && examQuestions.length > 0 && currentQuestion < examQuestions.length) {
                showQuestion();
                return;
            }

            // Si no hay examen en progreso o ya terminó, reiniciar
            examQuestions = [...phrasalVerbs].sort(() => 0.5 - Math.random()).slice(0, 10);
            currentQuestion = 0;
            score = 0;
            examInProgress = true;
            showQuestion();
        }

        function showQuestion() {
            if (currentQuestion >= examQuestions.length) {
                showResults();
                return;
            }

            const question = examQuestions[currentQuestion];
            document.getElementById('questionCounter').textContent = `Pregunta ${currentQuestion + 1} de ${examQuestions.length}`;
            document.getElementById('question').innerHTML = `<strong>Significado:</strong> ${question.meaning}`;
            
            // - Para actualizar la barra de progreso
            const progress = ((currentQuestion) / examQuestions.length) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
            
            // - Limpiar salidas
            document.getElementById('phrasalAnswer').value = '';
            document.getElementById('exampleAnswer').value = '';
            document.getElementById('feedback').style.display = 'none';
            
            document.getElementById('phrasalAnswer').focus();
        }

        function checkAnswer() {
            const userPhrasal = document.getElementById('phrasalAnswer').value.trim().toLowerCase();
            const userExample = document.getElementById('exampleAnswer').value.trim();
            const correctPhrasal = examQuestions[currentQuestion].phrasal.toLowerCase();
            
            const feedback = document.getElementById('feedback');
            feedback.style.display = 'block';
            
            let isCorrect = false;
            
            // - Aplica una normalizacion para la comparacion de respuestas
            // - Esto me lo piratie del otro proyecto xd
            const normalizedUserPhrasal = userPhrasal.replace(/\s+/g, ' ').toLowerCase();
            const normalizedCorrectPhrasal = correctPhrasal.replace(/\s+/g, ' ').toLowerCase();
            
            if (normalizedUserPhrasal === normalizedCorrectPhrasal && userExample.length > 0) {
                feedback.className = 'feedback correct';
                feedback.innerHTML = `¡Correcto! <br><strong>Phrasal Verb:</strong> ${examQuestions[currentQuestion].phrasal}<br><strong>Ejemplo modelo:</strong> ${examQuestions[currentQuestion].example}`;
                score++;
                isCorrect = true;
            } else {
                feedback.className = 'feedback incorrect';
                let message = `Incorrecto.<br><strong>Phrasal verb correcto:</strong> ${examQuestions[currentQuestion].phrasal}<br><strong>Ejemplo modelo:</strong> ${examQuestions[currentQuestion].example}`;
                
                if (normalizedUserPhrasal !== normalizedCorrectPhrasal && userExample.length === 0) {
                    message += '<br><br>Recuerda escribir tanto el phrasal verb como un ejemplo.';
                } else if (normalizedUserPhrasal !== normalizedCorrectPhrasal) {
                    message += '<br><br>El phrasal verb no es correcto.';
                } else if (userExample.length === 0) {
                    message += '<br><br>No olvides escribir un ejemplo.';
                }
                
                feedback.innerHTML = message;
                document.querySelector('.card').classList.add('shake');
                setTimeout(() => {
                    document.querySelector('.card').classList.remove('shake');
                }, 500);
            }
            
            const button = document.querySelector('#examMode button');
            button.textContent = currentQuestion === examQuestions.length - 1 ? 'Ver Resultados' : 'Siguiente Pregunta';
            button.onclick = nextQuestion;
        }

        // - Esto lo agregue para mezclar los phrasal verbs en modo examen o practica
        function shufflePhrasal() {
            // - Para saber si funciono, una notificacion que avisa que se mezclaron con exito.
            function showNotification(msg) {
                const notif = document.getElementById('notification');
                notif.textContent = msg;
                notif.style.display = 'block';
                notif.style.background = '#e0f7fa';
                notif.style.color = '#00796b';
                notif.style.borderRadius = '8px';
                notif.style.padding = '8px 16px';
                setTimeout(() => {
                    notif.style.display = 'none';
                }, 1800);
            }
            if (document.getElementById('examMode').classList.contains('active') && examQuestions.length > 0) {
                examQuestions.sort(() => 0.5 - Math.random());
                currentQuestion = 0;
                showQuestion();
                showNotification('¡Preguntas del examen mezcladas!');
            } else {
                phrasalVerbs.sort(() => 0.5 - Math.random());
                showNotification('¡Phrasal verbs mezclados! Puedes comenzar el examen o modo práctica.');
            }
        }

        function nextQuestion() {
            currentQuestion++;
            showQuestion();
            
            const button = document.querySelector('#examMode button');
            button.textContent = 'Verificar Respuesta';
            button.onclick = checkAnswer;
        }

        function showResults() {
            hideAllSections();
            document.getElementById('results').classList.add('active');

            const finalScore = document.getElementById('finalScore');
            const scoreMessage = document.getElementById('scoreMessage');

            finalScore.textContent = `${score}/${examQuestions.length}`;

            const percentage = (score / examQuestions.length) * 100;

            // Marcar que el examen terminó
            examInProgress = false;

            if (percentage >= 90) {
                scoreMessage.textContent = '¡Excelente! Estás muy bien preparado para el examen. ';
                scoreMessage.style.color = '#00b894';
            } else if (percentage >= 70) {
                scoreMessage.textContent = '¡Bien hecho! Solo necesitas repasar un poco más. ';
                scoreMessage.style.color = '#f39c12';
            } else {
                scoreMessage.textContent = 'Necesitas estudiar más. ¡No te desanimes, sigue practicando! ';
                scoreMessage.style.color = '#e74c3c';
            }
        }

        function startPracticeMode() {
            hideAllSections();
            document.getElementById('practiceMode').classList.add('active');
            
            const practiceCards = document.getElementById('practiceCards');
            practiceCards.innerHTML = '';
            
            phrasalVerbs.forEach(verb => {
                const card = document.createElement('div');
                card.className = 'phrasal-card';
                card.innerHTML = `
                    <div class="phrasal-verb">${verb.phrasal}</div>
                    <div class="meaning">${verb.meaning}</div>
                    <div class="example"><strong>Ejemplo:</strong> ${verb.example}</div>
                `;
                practiceCards.appendChild(card);
            });
        }

        function showStudyGuide() {
            hideAllSections();
            document.getElementById('studyGuide').classList.add('active');
            
            const studyContent = document.getElementById('studyContent');
            studyContent.innerHTML = `
                <div style="margin-bottom: 30px;">
                    <h3 style="color: #667eea; margin-bottom: 15px;">Consejos para el Examen:</h3>
                    <ul style="line-height: 2; color: #555; padding-left: 20px;">
                        <li><strong>Estudia los 20 phrasal verbs</strong> - El examen preguntará 10 de estos</li>
                        <li><strong>Memoriza los significados exactos</strong> en español</li>
                        <li><strong>Practica ejemplos</strong> - necesitas escribir una oración</li>
                        <li><strong>Presta atención a la ortografía</strong> - escribir correctamente es crucial</li>
                        <li><strong>Usa el modo práctica</strong> para repasar todos los phrasal verbs</li>
                    </ul>
                </div>
                
                <div style="background: #f8f9fa; padding: 20px; border-radius: 10px; border-left: 4px solid #667eea;">
                    <h3 style="color: #667eea; margin-bottom: 15px;">Formato del Examen:</h3>
                    <p style="color: #555; line-height: 1.8;">
                        <strong>Te darán:</strong> El significado en español<br>
                        <strong>Debes escribir:</strong> El phrasal verb en inglés + Una oración de ejemplo
                    </p>
                </div>
            `;
        }

        // - Para que al pulsar "Enter" envie las respuestas en modo examen
        document.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && document.getElementById('examMode').classList.contains('active')) {
                const button = document.querySelector('#examMode button');
                if (button.textContent === 'Verificar Respuesta') {
                    checkAnswer();
                } else {
                    nextQuestion();
                }
            }
        });

        // - Esto inicia la guia de estudio por defecto
        showStudyGuide();