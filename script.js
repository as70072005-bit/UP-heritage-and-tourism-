/* =====================================
   UP HERITAGE & TOURISM WEBSITE
   JavaScript functionality
===================================== */




const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("active");
});

document.querySelectorAll("#navLinks a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("active");
    });
});


/* 2. FESTIVAL CALENDAR */

const monthSelect = document.getElementById("monthSelect");
const festivalResult = document.getElementById("festivalResult");

const festivals = {
    January: "Magh Mela – A major religious gathering held in Prayagraj.",
    February: "Basant Panchami – Celebrated with devotion and the arrival of spring.",
    March: "Holi – The colourful festival celebrated across Uttar Pradesh.",
    April: "Ram Navami – Celebrates the birth of Lord Rama.",
    May: "Buddha Purnima – Celebrated at important Buddhist sites, including Sarnath.",
    June: "Ganga Dussehra – Celebrates the sacred River Ganga.",
    July: "Guru Purnima – A day dedicated to teachers and spiritual guides.",
    August: "Janmashtami – Celebrated especially in Mathura and Vrindavan.",
    September: "Ganesh Chaturthi – Celebrated in various parts of the state.",
    October: "Dussehra and Ram Leela – Traditional celebrations across Uttar Pradesh.",
    November: "Dev Deepawali and Ganga Mahotsav – Famous cultural celebrations in Varanasi.",
    December: "Christmas and winter cultural celebrations across the state."
};

monthSelect.addEventListener("change", function () {
    const selectedMonth = monthSelect.value;

    if (selectedMonth) {
        festivalResult.textContent = festivals[selectedMonth];
    } else {
        festivalResult.textContent =
            "Your festival information will appear here.";
    }
});


/* 3. IMAGE SLIDER */

const slides = [
    {
        image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?w=1200",
        caption: "The timeless beauty of Varanasi"
    },
    {
        image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=1200",
        caption: "The magnificent Taj Mahal of Agra"
    },
    {
        image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81?w=1200",
        caption: "Discover India's architectural heritage"
    },
    {
        image: "https://images.unsplash.com/photo-1548013146-72479768bada?w=1200",
        caption: "Experience the spiritual atmosphere of India"
    }
];

let currentSlide = 0;

const sliderImage = document.getElementById("sliderImage");
const slideCaption = document.getElementById("slideCaption");

function showSlide(index) {
    currentSlide = (index + slides.length) % slides.length;

    sliderImage.src = slides[currentSlide].image;
    slideCaption.textContent = slides[currentSlide].caption;
}

document.getElementById("nextSlide").addEventListener("click", function () {
    showSlide(currentSlide + 1);
});

document.getElementById("prevSlide").addEventListener("click", function () {
    showSlide(currentSlide - 1);
});


/* 4. INTERACTIVE DESTINATION MAP */

const destinations = {
    Varanasi: {
        title: "Varanasi – The Spiritual Capital",
        description:
            "Explore the famous Kashi Vishwanath Temple, Dashashwamedh Ghat, Sarnath and the beautiful Ganga Aarti."
    },

    Agra: {
        title: "Agra – The City of the Taj",
        description:
            "Visit the world-famous Taj Mahal, Agra Fort and Fatehpur Sikri to experience Mughal architecture."
    },

    Lucknow: {
        title: "Lucknow – The City of Nawabs",
        description:
            "Discover Bara Imambara, Rumi Darwaza, Chota Imambara and the rich Awadhi culture."
    },

    Prayagraj: {
        title: "Prayagraj – The Sacred Confluence",
        description:
            "Visit Triveni Sangam, Anand Bhavan and historic sites connected with India's cultural heritage."
    },

    Mathura: {
        title: "Mathura – The Birthplace of Lord Krishna",
        description:
            "Explore Shri Krishna Janmabhoomi, Dwarkadhish Temple and nearby Vrindavan."
    }
};

const mapPins = document.querySelectorAll(".map-pin");

mapPins.forEach(function (pin) {
    pin.addEventListener("click", function () {
        const place = pin.dataset.place;
        const destination = destinations[place];

        document.getElementById("placeTitle").textContent =
            destination.title;

        document.getElementById("placeDescription").textContent =
            destination.description;
    });
});


/* 5. HERITAGE QUIZ */

const questions = [
    {
        question: "Which city is famous for the Taj Mahal?",
        options: ["Varanasi", "Agra", "Lucknow", "Mathura"],
        answer: "Agra"
    },

    {
        question: "Which river flows through Varanasi?",
        options: ["Yamuna", "Godavari", "Ganga", "Narmada"],
        answer: "Ganga"
    },

    {
        question: "Dev Deepawali is especially famous in which city?",
        options: ["Agra", "Varanasi", "Kanpur", "Meerut"],
        answer: "Varanasi"
    },

    {
        question: "Which city is associated with the birthplace of Lord Krishna?",
        options: ["Mathura", "Prayagraj", "Lucknow", "Ayodhya"],
        answer: "Mathura"
    },

    {
        question: "Which classical dance form has strong historical roots in Uttar Pradesh?",
        options: ["Bharatanatyam", "Kathak", "Kuchipudi", "Odissi"],
        answer: "Kathak"
    }
];

let currentQuestion = 0;
let score = 0;
let answered = false;

const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const answerOptions = document.getElementById("answerOptions");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const quizScore = document.getElementById("quizScore");

function loadQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    questionNumber.textContent =
        "Question " + (currentQuestion + 1) +
        " of " + questions.length;

    questionText.textContent = question.question;

    answerOptions.innerHTML = "";
    quizFeedback.textContent = "";

    nextQuestion.disabled = true;
    nextQuestion.textContent =
        currentQuestion === questions.length - 1
            ? "See My Score"
            : "Next Question →";

    question.options.forEach(function (option) {
        const button = document.createElement("button");

        button.textContent = option;

        button.addEventListener("click", function () {
            checkAnswer(option, button);
        });

        answerOptions.appendChild(button);
    });
}

function checkAnswer(selectedAnswer, selectedButton) {
    if (answered) return;

    answered = true;

    const correctAnswer = questions[currentQuestion].answer;
    const buttons = answerOptions.querySelectorAll("button");

    buttons.forEach(function (button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedAnswer === correctAnswer) {
        score++;
        quizFeedback.textContent = "Correct! Well done!";
        quizFeedback.style.color = "green";
    } else {
        selectedButton.classList.add("wrong");
        quizFeedback.textContent =
            "Not quite! The correct answer is " + correctAnswer + ".";
        quizFeedback.style.color = "red";
    }

    nextQuestion.disabled = false;
}

nextQuestion.addEventListener("click", function () {
    if (!answered) return;

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        questionNumber.textContent = "Quiz Completed!";
        questionText.textContent = "Thank you for exploring UP Heritage!";
        answerOptions.innerHTML = "";
        quizFeedback.textContent = "";

        nextQuestion.style.display = "none";

        quizScore.textContent =
            "Your Score: " + score + " / " + questions.length;
    }
});

loadQuestion();


/* 6. TRAVEL CHECKLIST WITH LOCAL STORAGE */

const checklistItems = document.querySelectorAll(".trip-check");
const checklistProgress = document.getElementById("checklistProgress");

function updateChecklist() {
    let completed = 0;

    checklistItems.forEach(function (item) {
        if (item.checked) {
            completed++;
        }
    });

    checklistProgress.textContent =
        completed + " of " + checklistItems.length +
        " items completed";

    localStorage.setItem(
        "upHeritageChecklist",
        JSON.stringify(
            Array.from(checklistItems).map(function (item) {
                return item.checked;
            })
        )
    );
}

// Restore previously saved checklist
const savedChecklist = JSON.parse(
    localStorage.getItem("upHeritageChecklist") || "null"
);

if (savedChecklist) {
    checklistItems.forEach(function (item, index) {
        item.checked = savedChecklist[index] || false;
    });
}

checklistItems.forEach(function (item) {
    item.addEventListener("change", updateChecklist);
});

updateChecklist();


/* 7. CONTACT FORM */

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("visitorName").value.trim();

    document.getElementById("formMessage").textContent =
        "Thank you, " + name +
        "! Your message has been received in this demo.";

    contactForm.reset();
});


/* 8. BACK TO TOP BUTTON */

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", function () {
    if (window.scrollY > 350) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }
});

backToTop.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});