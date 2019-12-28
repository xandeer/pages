window.addEventListener('load', function () {
    var parent = document.getElementById('content');
    parent.insertBefore(document.getElementById('preamble'), parent.firstElementChild);

    var cachedHash = '';
    $('.open-sidebar')[0].addEventListener('click', function () {
        cachedHash = location.hash;
        location.hash = '#table-of-contents';
    });

    $(".close-sidebar")[0].addEventListener('click', function () {
        location.hash = cachedHash;
    });

});
