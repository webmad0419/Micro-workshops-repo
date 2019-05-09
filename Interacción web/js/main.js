
// Variables declaradas FUERA de window.onscroll
let scrollY,
    mobiles = document.querySelectorAll('.mobile-inertia')


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
}




// Función comprobadora de estancia en viewport
const isInViewport = el => {
    const rect = el.getBoundingClientRect()
    const vertInView = (rect.top <= window.innerHeight) && ((rect.top + rect.height) >= 0)
    const horInView = (rect.left <= window.innerWidth) && ((rect.left + rect.width) >= 0)
    return (vertInView && horInView)
}
