$body = document.querySelector("body");
$themeSvg = document.querySelector(".lightdark-icon");
$menuBtn = document.querySelector(".menu-icon");
$container = document.querySelector(".container");
$leftMenuPanel = document.querySelector(".leftMenuPanel");

$themeSvg.addEventListener('click', function() {
    $body.classList.toggle("light");
})

$menuBtn.addEventListener('click', function(e) {
    e.stopPropagation(); 
    const currentTransform = $leftMenuPanel.style.transform;
    
    if (currentTransform === 'translateX(0px)') {
        $leftMenuPanel.style.transform = 'translateX(-300px)';
        $container.style.filter = 'none';
    } else {
        $leftMenuPanel.style.transform = 'translateX(0px)';
        $container.style.filter = 'blur(3px)';
    }
})

document.addEventListener('click', function(e) {
    const isMenuOpen = $leftMenuPanel.style.transform === 'translateX(0px)';
    const clickedInsideMenu = $leftMenuPanel.contains(e.target);
    if (isMenuOpen && !clickedInsideMenu) {
        $leftMenuPanel.style.transform = 'translateX(-300px)';
        $container.style.filter = 'none';
    }
})

$leftMenuPanel.addEventListener('click', function(e) {
    e.stopPropagation();
})

