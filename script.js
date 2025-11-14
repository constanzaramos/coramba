let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('.navbar a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a [href*=' + id + ']').classList.add('active');
            });
        }
    })
}


menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function setupReadMoreButton() {
    let readMoreBtn = document.getElementById("read-more-btn");
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", function () {
        let moreText = document.getElementById("more-about");
        if (moreText.style.display === "none" || moreText.style.display === "") {
          moreText.style.display = "block";
          readMoreBtn.textContent = i18next.t("about.readLess");
        } else {
          moreText.style.display = "none";
          readMoreBtn.textContent = i18next.t("about.readMore");
        }
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contact-form");
    if (!contactForm) return;
    
    contactForm.addEventListener("submit", function(event) {
    event.preventDefault(); 

    var form = event.target;
    var formData = new FormData(form);


    var jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    fetch("https://formspree.io/f/mzzepzdb", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(jsonObject)
    })
    .then(response => {
      if (response.ok) {
        document.getElementById("form-message").style.display = "block";
        form.reset();
      } else {
        alert(i18next.t("contact.error"));
      }
    })
    .catch(error => {
      alert(i18next.t("contact.error"));
    });
    });
  });

  document.addEventListener("DOMContentLoaded", function () {
    i18next
      .use(i18nextHttpBackend)
      .use(i18nextBrowserLanguageDetector)
      .init({
        debug: true,
        fallbackLng: "en",
        backend: {
          loadPath: "locales/{{lng}}.json"
        }
      }, function (err, t) {
        if (err) return console.error(err);
        updateContent();
        setupReadMoreButton();
      });
  
    function updateContent() {
      document.documentElement.lang = i18next.language;
      
      document.querySelectorAll("[data-i18n]").forEach(element => {
        const key = element.getAttribute("data-i18n");
        element.textContent = i18next.t(key);
      });
  
      document.querySelectorAll("[data-i18n-aria-label]").forEach(element => {
        const key = element.getAttribute("data-i18n-aria-label");
        element.setAttribute("aria-label", i18next.t(key));
      });
  
      document.querySelector('input[name="name"]').placeholder = i18next.t("contact.name");
      document.querySelector('input[name="email"]').placeholder = i18next.t("contact.email");
      document.querySelector('input[name="phone"]').placeholder = i18next.t("contact.phone");
      document.querySelector('input[name="subject"]').placeholder = i18next.t("contact.subject");
      document.querySelector('textarea[name="message"]').placeholder = i18next.t("contact.message");
      document.querySelector('input[type="submit"]').value = i18next.t("contact.send");
      
      const readMoreBtn = document.getElementById("read-more-btn");
      if (readMoreBtn) {
        const moreText = document.getElementById("more-about");
        if (moreText && moreText.style.display === "block") {
          readMoreBtn.textContent = i18next.t("about.readLess");
        } else {
          readMoreBtn.textContent = i18next.t("about.readMore");
        }
      }
    }
  
    document.getElementById("language-switcher").addEventListener("change", function () {
      const selectedLanguage = this.value;
      i18next.changeLanguage(selectedLanguage, updateContent);
      localStorage.setItem("language", selectedLanguage);
    });
  
    const savedLanguage = localStorage.getItem("language") || "en";
    document.getElementById("language-switcher").value = savedLanguage;
    i18next.changeLanguage(savedLanguage, updateContent);
  });
  
  document.addEventListener("DOMContentLoaded", function () {
    const resumeBtn = document.getElementById("resume-btn");
    const languageSwitcher = document.getElementById("language-switcher");
  
    function updateResumeLink() {
      const selectedLanguage = languageSwitcher.value;
      if (selectedLanguage === "es") {
        resumeBtn.href =  "./assets/resume/Constanza Ramos CV Español.pdf"
      } else {
        resumeBtn.href = "./assets/resume/Constanza Ramos Resume.pdf"; 
      }
    }
  
    updateResumeLink();
  
    languageSwitcher.addEventListener("change", updateResumeLink);
  });