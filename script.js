document.addEventListener("DOMContentLoaded", () => {
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll("nav a").forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            document.getElementById(targetId).scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });

    // Toggle Mobile Menu
    const menuButton = document.createElement("button");
    menuButton.textContent = "☰";
    menuButton.classList.add("menu-toggle");
    document.querySelector("header").appendChild(menuButton);

    menuButton.addEventListener("click", () => {
        document.querySelector("nav ul").classList.toggle("show");
    });

    // Contact Form Validation
document.querySelector("#contact form").addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name === "" || email === "" || message === "") {
        alert("Please fill out all fields before submitting.");
        return;
    }

    // Simple email format validation
    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Your message has been sent successfully!");
    this.reset(); // Clear the form
});

// Email Format Validation Function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


    // Form Validation with Alerts
    const signupForm = document.querySelector("#signup form");
    signupForm.addEventListener("submit", e => {
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const location = document.getElementById("location").value.trim();

        if (!name || !email || !password || !location) {
            e.preventDefault();
            alert("Please fill out all fields.");
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            e.preventDefault();
            alert("Please enter a valid email address.");
        }
    });

    // Dynamic Header on Scroll
    const header = document.querySelector("header");
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Highlight Active Section in Navigation
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 70;
            if (scrollY >= sectionTop) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === current) {
                link.classList.add("active");
            }
        });
    });
});

// Animations on Scroll
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            } else {
                entry.target.classList.remove("visible");
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll("section").forEach(section => {
    observer.observe(section);
});
// Waste Impact Calculator with Advanced Features
function calculateImpact() {
    const wasteType = document.getElementById("waste-type").value;
    const weight = parseFloat(document.getElementById("weight").value);

    // Input validation
    if (isNaN(weight) || weight <= 0) {
        alert("Please enter a valid weight in kg.");
        return;
    }

    let result = "";
    let recommendations = "";

    // Logic for waste types
    if (wasteType === "plastic") {
        result = `You saved approximately ${(weight * 3.5).toFixed(2)} kg of CO2 emissions!`;
        recommendations = "Consider recycling or repurposing this plastic.";
    } else if (wasteType === "organic") {
        result = `Your waste can generate compost for ${(weight * 2).toFixed(2)} square meters of farmland!`;
        recommendations = "Great job! Composting can enrich soil and reduce the need for fertilizers.";
    } else if (wasteType === "metal") {
        result = `You saved ${(weight * 5).toFixed(2)} kg of raw materials from being mined!`;
        recommendations = "Recycle metals to conserve natural resources and energy.";
    }

    // Display results
    document.getElementById("impact-result").innerHTML = `
        <h3>${result}</h3>
        <p><strong>Recommendation:</strong> ${recommendations}</p>
    `;
}   



