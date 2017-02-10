if (document.forms[0] && window.FormData) {

    var message = new Object();
    message.loading = 'Laden...';
    message.success = 'Vielen Dank für die Anfrage';
    message.failure = 'Whoops! There was a problem sending your message.';

    var form = document.forms[0];

    var submitButton = document.getElementById('formSubmit');

    var statusMessage = document.createElement('div');
    statusMessage.className = 'status';

    var request = new XMLHttpRequest();
    request.open('POST', '//formspree.io/pyrior@max-appeal.com', true);
    request.setRequestHeader('accept', 'application/json');

    form.addEventListener('submit', function (evt) {
        evt.preventDefault();
        form.appendChild(statusMessage);
        submitButton.disabled = true;

        var formData = new FormData(form);

        request.send(formData);

        request.onreadystatechange = function () {
            if (request.readyState < 4) {
                statusMessage.innerHTML = message.loading;
            }
            else if (request.readyState === 4) {
                if (request.status == 200 && request.status < 300) {
                    submitButton.style.display = 'none';
                    statusMessage.innerHTML = message.success;
                }
                else {
                    form.insertAdjacentHTML('beforeend', message.failure);
                    submitButton.disabled = false;
                }
            }
        }
    });
}


