$body = document.querySelector("body");
$themeSvg = document.querySelector("nav svg");

$themeSvg.addEventListener('click', function() {
    $body.classList.toggle("light");
})