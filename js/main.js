window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("mainHeader").style.backgroundColor = "#191919";
        document.getElementById("mainHeader").style.borderBottom = "1px solid #19c79a";

    } else {
        document.getElementById("mainHeader").style.backgroundColor = "transparent";
        document.getElementById("mainHeader").style.borderBottom = "none";

    }
}

document.addEventListener('DOMContentLoaded', function () {
    const btn = document.getElementById('btn');
    new bootstrap.Tooltip(btn, {
        customClass: 'custom-tooltip',
        placement: 'top'
    });
});
