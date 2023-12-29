document.addEventListener("DOMContentLoaded", function () {

    fetch('/components/footer.html')
        .then(response => response.text())
        .then(data => {
            const currentYear = new Date().getFullYear();
            const startYear = 2020;

            document.body.innerHTML += data;
            document.getElementById("currentYear").textContent = `${startYear} - ${currentYear}`;
        })
        .catch(error => console.error('Unable to fetch footer.', error));
});