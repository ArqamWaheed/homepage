$body = document.querySelector("body");
$themeSvg = document.querySelector(".lightdark-icon");

$themeSvg.addEventListener('click', function() {
    $body.classList.toggle("light");
})