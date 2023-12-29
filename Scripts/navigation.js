document.addEventListener("DOMContentLoaded", function () {

    fetch('/components/navigation.html')
        .then(response => response.text())
        .then(data => {
            document.body.innerHTML += data;
        })
        .catch(error => console.error('Unable to fetch footer.', error));
});