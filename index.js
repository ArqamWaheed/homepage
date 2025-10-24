const $body = document.querySelector("body");
const $themeSvg = document.querySelector(".lightdark-icon");
const $menuBtn = document.querySelector(".menu-icon");
const $container = document.querySelector(".container");
const $leftMenuPanel = document.querySelector(".leftMenuPanel");
const $loaderWrapper = document.querySelector(".loader-wrapper");

if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}


window.scrollTo(0, 0);
document.documentElement.scrollTop = 0;

window.onload = function() {
    $body.classList.remove("preload");
    $loaderWrapper.style.opacity = 0;
    setTimeout(() => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        $loaderWrapper.style.display = "none";
    }, 500);
};

$themeSvg.addEventListener('click', function() {
    $body.classList.toggle("light");
})

function toggleLeftMenuPanel() {
    const currentTransform = $leftMenuPanel.style.transform;
    if (currentTransform === 'translateX(0px)') {
        $leftMenuPanel.style.transform = 'translateX(-300px)';
        $container.style.filter = 'none';
    } else {
        $leftMenuPanel.style.transform = 'translateX(0px)';
        $container.style.filter = 'blur(3px)';
    }
}

$leftMenuPanel.addEventListener('click', function(e) {
    if (e.target.tagName == 'LI' ) {
        toggleLeftMenuPanel();
    }
})

$menuBtn.addEventListener('click', function(e) {
    e.stopPropagation(); 
    toggleLeftMenuPanel();
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

const $emailCopyBtn = document.querySelector('.emailDivSVG');
const emailText = 'arqam.waheed.dev@gmail.com';

$emailCopyBtn.addEventListener('click', async function() {
    try {
        await navigator.clipboard.writeText(emailText);
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification';
        notification.textContent = '✓ Email copied!';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
        
    } catch (err) {
        console.error('Failed to copy email:', err);
        
        const notification = document.createElement('div');
        notification.className = 'copy-notification error';
        notification.textContent = '✗ Failed to copy';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 2000);
    }
});

const contactForm = document.getElementById('contactForm');
const submitBtn = contactForm.querySelector('.submitBtn');
const submitBtnText = contactForm.querySelector('.submitBtnText');
const submitBtnIcon = contactForm.querySelector('.submitBtnIcon');
const submitBtnSpinner = contactForm.querySelector('.submitBtnSpinner');
const formMessage = contactForm.querySelector('.formMessage');

contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    submitBtn.disabled = true;
    submitBtnText.textContent = 'Sending...';
    submitBtnIcon.style.display = 'none';
    submitBtnSpinner.style.display = 'block';
    formMessage.textContent = '';
    formMessage.className = 'formMessage';
    
    const formData = new FormData(contactForm);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    
    try {
        const response = await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: json
        });
        
        const data = await response.json();
        
        if (data.success) {
            formMessage.textContent = '✓ Message sent successfully!';
            formMessage.classList.add('success');
            contactForm.reset();
        } else {
            console.error('Web3Forms error:', data);
            formMessage.textContent = `✗ ${data.message || 'Failed to send message. Please check your API key.'}`;
            formMessage.classList.add('error');
        }
    } catch (error) {
        console.error('Form submission error:', error);
        formMessage.textContent = '✗ Failed to send. Check console for details.';
        formMessage.classList.add('error');
    } finally {
        submitBtn.disabled = false;
        submitBtnText.textContent = 'Submit';
        submitBtnIcon.style.display = 'block';
        submitBtnSpinner.style.display = 'none';
    }
});

const hiddenElements = document.querySelectorAll('.hidden');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } 
    })
})

hiddenElements.forEach((el) => observer.observe(el));

