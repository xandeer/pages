window.addEventListener('load', function () {
    var parent = document.getElementById('content');
    parent.insertBefore(document.getElementById('preamble'), parent.firstElementChild);
});
