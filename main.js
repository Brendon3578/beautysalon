// Toggle and Close menu when click on hamburguer and x icon
const nav = document.querySelector('#header nav')
const toggle = document.querySelectorAll('nav .toggle')

for (const element of toggle){
    element.addEventListener('click', function () {
        nav.classList.toggle('show')
    })
}

// when click on menu li, hidden the menu
const links = document.querySelectorAll('nav ul li a')

links.forEach(link => {

    link.addEventListener('click', () => {
        links.forEach(linkRemoveStyle => linkRemoveStyle.classList.remove('active'));

        nav.classList.remove('show')
        link.classList.add('active')
    });
});

for(const link of links){

    link.addEventListener('click', function () {
        nav.classList.remove('show')
        link.classList.add('active')
    })
}


// add style on header when page scroll
const header = document.querySelector("#header")
const navHeight = header.offsetHeight

function changeHeaderWhenScroll(){

    if(window.scrollY >= navHeight){
        // scroll greater than header height
        header.classList.add('scroll')
    }else{
        // lower than
        header.classList.remove('scroll')
    }
}


// change page color
const setBaseColor = (color) => document.documentElement.style.setProperty('--hue', Number(color));

const getBaseColor = () => {
    if (document.documentElement.style.getPropertyValue('--hue') == 0){
        setBaseColor(160)
    }
    return Number(document.documentElement.style.getPropertyValue('--hue'))
}
getBaseColor()

const colorButton = document.querySelector('.icon-droplet')
const colorThemes = [36, 270, 345, 160]
const colorThemesLength = colorThemes.length

let currentTheme = 4

colorButton.addEventListener('click', () => {

    if (currentTheme == colorThemesLength){
        currentTheme = 1
    } else{
        currentTheme++
    }


    setBaseColor(colorThemes[currentTheme - 1])

    // saving in local storage
    localStorage.setItem('theme-color', JSON.stringify({ idTheme: currentTheme, theme: colorThemes[currentTheme - 1]}))
})

// loading theme in local storage
const themeLocalStorage = JSON.parse(localStorage.getItem('theme-color'))

if (themeLocalStorage){
    currentTheme = themeLocalStorage.idTheme
    setBaseColor(themeLocalStorage.theme)
}

// dark mode theme
const darkModeButton = document.querySelector(".dark-mode")
const htmlRoot = document.documentElement

let darkModeIsOn = document.documentElement.classList.contains('dark-mode')

const changeDarkMode = () => {

    if(darkModeIsOn){
        localStorage.setItem('dark-mode', 'false') 
        htmlRoot.classList.remove('darkmode')
        darkModeIsOn = false
    } else{
        localStorage.setItem('dark-mode', 'true')
        htmlRoot.classList.add('darkmode')
        darkModeIsOn = true
    }
    
    darkModeButton.classList.toggle('icon-moon')
    darkModeButton.classList.toggle('icon-sun')
}

// get dark mode in local storage and add class in html element
if(localStorage.getItem('dark-mode') == 'true'){
    changeDarkMode()
}

darkModeButton.addEventListener('click', () => changeDarkMode() )



// Testimonials Slider / carousel
const swiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination'
    },
    mousewheel: false,
    keyboard: true,
    grabCursor: true,
    breakpoints: {
        767: {
            slidesPerView: 2,
            setWrapperSize: true
        }
    }

});

// Scroll Reveal / show elements when scroll page
const scrollReveal = ScrollReveal({
    origin: 'top',
    distance: '30px',
    duration: 700,
    reset: true,
})

scrollReveal.reveal(
    `#home .text, #home .image,
    #about .image, #about .text,
    #services header, #services .card,
    #testimonials header, #testimonials .testimonials,
    #contact .text, #contact .links,
    footer .brand, footer .social
    `,
    {interval: 100}
)

// back to top button visibility
const backToTopButton = document.querySelector('.back-to-top')

function backToTop(){
    
    if(window.scrollY >= 560){
        backToTopButton.classList.add('show')
    } else{
        backToTopButton.classList.remove('show')
    }
}

// active menu a(element) when visible section
const sections = document.querySelectorAll('section[id]')

function activateMenuAtCurrentSection() {
    
    const checkpoint = window.pageYOffset + (window.innerHeight / 8) * 4

    for(const section of sections){
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute('id')
    
        const checkpointStart = checkpoint >= sectionTop
        const checkpoitnEnd = checkpoint <= sectionTop + sectionHeight
    
        if(checkpointStart && checkpoitnEnd){
            document
                .querySelector('nav ul li a[href*=' +sectionId+ ']')
                .classList.add('active')
        } else{
            document
                .querySelector('nav ul li a[href*=' +sectionId+ ']')
                .classList.remove('active')
        }
    
    }
}

// *bugfix* remove menu after window width > 767
function removeMobileMenu(){
    if (window.innerWidth > 991){
        if(nav.classList.contains('show')){
            nav.classList.remove('show')
        }
    }
}

// Scroll Events with debounce function (underscore)

let functionDelay = _.debounce(function(){
    changeHeaderWhenScroll()
    backToTop()
    activateMenuAtCurrentSection()
}, 100)
window.addEventListener('scroll', functionDelay)

window.addEventListener('resize', _.debounce(function(){
    removeMobileMenu()
}, 1000))


// SMOOTH SCROLL JS
const allScrollElements = document.querySelectorAll(".menu a")

allScrollElements.forEach(linkElement => {
    linkElement.addEventListener("click", (e) => {
        e.preventDefault()
        let sectionId = linkElement.getAttribute("href")
        let section = document.querySelector(sectionId)
        let sectionTopHeight = section.offsetTop

        if(sectionId == '#home'){
            htmlRoot.scrollTo({
                top: sectionTopHeight - 150,
                behavior: 'smooth'
            });
        } else{
            htmlRoot.scrollTo({
                top: sectionTopHeight - 20,
                behavior: 'smooth'
            });
        }
       
        
    });
});