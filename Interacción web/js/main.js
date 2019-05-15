
// Variables declaradas FUERA de window.onscroll
let scrollY,
    mobiles = document.querySelectorAll('.mobile-inertia'),
    messages = document.querySelectorAll('.message-inertia'),
    slider = document.querySelector('.slider-track'),
    mouseInertia = document.querySelectorAll('.mouse-inertia'),
    darkBg = document.querySelector('.bg-dark')



// Plugin Vivus SVG para trazado de paths
new Vivus('relojSVG', { duration: 200 }, () => document.querySelector('#relojSVG').classList.add('done'));




window.onscroll = () => {


    // Profundidad de usuario
    scrollY = window.scrollY


    // Efecto menú de navegación replegado
    scrollY > 0 ?
        document.querySelector('.navigation').classList.add('sticky') :
        document.querySelector('.navigation').classList.remove('sticky')


    // Efecto Parallax texto hero
    isInViewport(document.getElementById('hero')) ?
        document.querySelector('.hero-inertia').style.transform = `translateY(${scrollY * .2}px)` :
        null


    // Efectos varios Scroll Reveal
    document.querySelectorAll('.reveal').forEach(elm => {

        isInViewport(elm) ?
            elm.classList.add('visible') :
            elm.classList.remove('visible')
    })


    // Efecto desplazamiento lateral móviles
    if (isInViewport(document.querySelector('.features'))) {
        mobiles[0].style.transform = `translateX(${mobiles[0].getBoundingClientRect().top * .2}px)`
        mobiles[1].style.transform = `translateX(${mobiles[1].getBoundingClientRect().top * .3}px)`
    }



    // Message box transitions
    if (isInViewport(document.querySelector('.facts'))) {
        messages[0].style.transform = `translate(${-messages[0].getBoundingClientRect().top * .2}px, ${messages[0].getBoundingClientRect().top * .1}px)`
        messages[1].style.transform = `translate(${messages[1].getBoundingClientRect().top * .1}px, ${messages[1].getBoundingClientRect().top * .05}px)`
        messages[2].style.transform = `translate(${messages[2].getBoundingClientRect().top * .3}px, ${-messages[2].getBoundingClientRect().top * .05}px)`
    }



    // Isometric slider transform
    (isInViewport(document.querySelector('.join'))) ?
        slider.style.transform = `translateX(${slider.getBoundingClientRect().top}px)` :
        null;



    (isInViewport(document.querySelector('.dark-background'))) ?
        darkBg.style.opacity = 1 :
        darkBg.style.opacity = 0;





}



// Mobile screens inertia

document.querySelector('.contact').onmousemove = e => {
    mouseInertia[0].style.transform = `translate(${e.x * .03}px, ${e.y * .03}px)`
    mouseInertia[1].style.transform = `translate(${e.x * .09}px, ${e.y * .09}px)`
    mouseInertia[2].style.transform = `translate(${e.x * .15}px, ${e.y * .15}px)`
    mouseInertia[3].style.transform = `translate(${e.x * .21}px, ${e.y * .21}px)`
}



// Función comprobadora de estancia en viewport
const isInViewport = el => {
    const rect = el.getBoundingClientRect()
    const vertInView = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0)
    const horInView = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0)
    return (vertInView && horInView)
}
