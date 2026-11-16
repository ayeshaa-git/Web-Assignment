document.addEventListener("DOMContentLoaded", () => {

    const themeToggleBtn = document.getElementById("theme-toggle");
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener("click", () => {
            document.body.classList.toggle("dark");
        });
    }

    const readMoreBtn = document.getElementById("read-more-btn");
    const moreText = document.getElementById("more-text");
    if (readMoreBtn && moreText) {
        readMoreBtn.addEventListener("click", () => {
            const hidden = moreText.style.display === "none" || moreText.style.display === "";
            moreText.style.display = hidden ? "block" : "none";
            readMoreBtn.textContent = hidden ? "Read Less" : "Read More";
        });
    }

    const statusBanner = document.getElementById("status-banner");
    if (statusBanner) {
        const currentHour = new Date().getHours();
        if (currentHour >= 8 && currentHour < 20) {
            statusBanner.textContent = "We are Open!";
            statusBanner.style.color = "green";
        } else {
            statusBanner.textContent = "Closed - Open at 8 AM";
            statusBanner.style.color = "red";
        }
    }

    const checkboxes = document.querySelectorAll(".item-check");
    const totalDisplay = document.getElementById("total");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", () => {
            let total = 0;
            checkboxes.forEach((box) => {
                if (box.checked) {
                    total += parseInt(box.value, 10);
                }
            });
            totalDisplay.textContent = `Total: ${total}pkr`;
        });
    });

    const tableRows = document.querySelectorAll(".menu-table tbody tr");
    tableRows.forEach((row) => {
        row.addEventListener("mouseover", () => {
            row.style.backgroundColor = "#fce4ec";
        });
        row.addEventListener("mouseout", () => {
            row.style.backgroundColor = "";
        });
    });

    const filterButtons = document.querySelectorAll(".filter-btn");
    filterButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const filter = btn.getAttribute("data-filter");
            tableRows.forEach((row) => {
                const category = row.cells[1].textContent.trim().toLowerCase();
                row.style.display = (filter === "all" || category === filter) ? "" : "none";
            });
        });
    });

    const specialNotes = document.getElementById("special-notes");
    const charCount = document.getElementById("char-count");
    if (specialNotes && charCount) {
        const maxLength = parseInt(specialNotes.getAttribute("maxlength"), 10);
        specialNotes.addEventListener("input", () => {
            const remaining = maxLength - specialNotes.value.length;
            charCount.textContent = `${remaining} characters remaining`;
        });
    } 

    const form = document.querySelector("#order form");
    const formMessage = document.getElementById("form-message");
    const discountMessage = document.getElementById("discount-message");
    const birthYearInput = document.getElementById("birth-year");

    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const username = document.getElementById("fullname").value.trim();
            if (username) {
                formMessage.textContent = `Thank you for visiting, ${username}! We have received your order.`;
            }

            const birthYearVal = birthYearInput.value.trim();
            discountMessage.textContent = "";

            if (birthYearVal !== "") {
                const birthYear = parseInt(birthYearVal, 10);
                const currentYear = new Date().getFullYear();

                if (isNaN(birthYear) || birthYear < 1900 || birthYear > currentYear) {
                    discountMessage.textContent = "Please enter a valid numeric birth year.";
                    discountMessage.style.color = "red";
                } else {
                    const age = currentYear - birthYear;
                    if ((age >= 16 && age <= 25) || age >= 60) {
                        discountMessage.textContent = `Congratulations! At ${age} years old, you qualify for our special discount!`;
                        discountMessage.style.color = "green";
                    } else {
                        discountMessage.textContent = `Thank you! You are ${age} years old.`;
                        discountMessage.style.color = "inherit";
                    }
                }
            }
        });
    }

}); 