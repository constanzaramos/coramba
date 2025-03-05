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

document.addEventListener("DOMContentLoaded", function () {
    let readMoreBtn = document.getElementById("read-more-btn");
    if (readMoreBtn) {
      readMoreBtn.addEventListener("click", function () {
        let moreText = document.getElementById("more-about");
        if (moreText.style.display === "none" || moreText.style.display === "") {
          moreText.style.display = "block";
          readMoreBtn.textContent = "Read Less";
        } else {
          moreText.style.display = "none";
          readMoreBtn.textContent = "Read More";
        }
      });
    }
  });

  document.getElementById("contact-form").addEventListener("submit", function(event) {
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
        alert("Oops! Something went wrong, please try again.");
      }
    })
    .catch(error => {
      alert("Oops! Something went wrong, please try again.");
    });
  });