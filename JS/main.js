const toUpBtn = document.createElement("button");
toUpBtn.className = "fa-solid fa-arrow-up";
toUpBtn.style.cssText =
  "width: 50px; height: 50px; background-color: var(--color10PERCENT); position: fixed; border-radius: 10px; bottom: 20px; right: 20px; z-index: 7; cursor: pointer; border: none; outline: none; color: white; font-size: 1.5rem; transition: all 0.5s;";
toUpBtn.style.display = "none"; // Initially hide the button
document.body.appendChild(toUpBtn);

function toUp() {
  if (window.scrollY >= 370) {
    toUpBtn.style.display = "block";
  } else {
    toUpBtn.style.display = "none";
  }
}

window.addEventListener("scroll", toUp);

toUpBtn.addEventListener("click", function () {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

/* Confirmation popup */
    const form = document.getElementById("contact-form");
    const popup = document.getElementById("confirmation-popup");
    const overlay = document.getElementById("popup-overlay");
    const messageBox = document.getElementById("confirmation-message");
    const closeBtn = document.getElementById("popup-close");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      try {
        const response = await fetch("/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          const arabic = isArabic(data.name);
          const message = arabic
            ? `شكرًا لك يا <b>${data.name}</b> على تواصلك!<br>
            لقد استلمنا رسالتك بنجاح وسأقوم بمراجعتها والرد عليك في أقرب وقت ممكن.<br>
            إذا كانت لديك أي استفسارات إضافية أو ترغب في مناقشة مشروع محدد، فلا تتردد في التواصل.<br>
            يسعدني أن أكون جزءًا من رحلتك الرقمية!`
            : `Thank you <b>${data.name}</b> for your communication!<br>
            We have successfully received your message, and I will review it and respond to you as soon as possible.<br>
            If you have any additional questions or would like to discuss a specific project, please feel free to reach out.<br>
            I'd love to be a part of your digital journey!`;

          showPopup(message, arabic);
          form.reset();
        } else {
          showPopup("Something went wrong. Please try again later.");
        }
      } catch (error) {
        showPopup(
          "An error occurred. Please check your connection and try again."
        );
      }
    });

    function isArabic(text) {
      return /[\u0600-\u06FF]/.test(text);
    }

    function showPopup(message, isRTL = false) {
      messageBox.innerHTML = message;
      popup.style.direction = isRTL ? 'rtl' : 'ltr';
      closeBtn.textContent = isRTL ? 'إغلاق' : 'Close';
      overlay.style.display = "flex";
    }

    function closePopup() {
      overlay.style.display = "none";
    }

    // Make it work when clicking close or outside
    closeBtn.addEventListener("click", closePopup);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closePopup();
    });

    // Expose globally in case inline HTML references it
    window.closePopup = closePopup;


/* Current Year Value In The Footer */
// Get the current year
const currentYear = new Date().getFullYear();

// Update the content of the 'currentYear' element
document.querySelector("#currentYear").textContent = currentYear;
