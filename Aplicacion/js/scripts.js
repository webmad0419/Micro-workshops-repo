// Promises
const getIngredients = orderNumber => axios.get(`http://cosasdigitales.com/documentacion/pedidos.php?numero=${orderNumber}`)
const getStock = orderNumber => axios.get(`http://cosasdigitales.com/documentacion/stock.php?numero=${orderNumber}`)
const getFryerAvailability = orderNumber => axios.get(`http://cosasdigitales.com/documentacion/freidora.php?numero=${orderNumber}`)
const getHovenAvailability = orderNumber => axios.get(`http://cosasdigitales.com/documentacion/horno.php?numero=${orderNumber}`)
const getGrillAvailability = orderNumber => axios.get(`http://cosasdigitales.com/documentacion/plancha.php?numero=${orderNumber}`)


// Aux
const handleError = e => errorMessage.innerHTML = `<strong>Imposible procesar pedido:</strong><br>${e.response.statusText}`
const resetPanel = () => { errorMessage.innerHTML = ''; result.innerHTML = ''; order.value = ''; orderStatus.innerHTML = 'Introduce un número de pedido' }
const printIngredients = ingredients => {
    let text = '';
    ingredients.forEach(elm => text += `<li>${elm}</li>`);
    result.innerHTML = `<ul>${text}</ul>`;
}
const checkStock = (ingredients, orderNumber) => {
    printIngredients(ingredients)
    orderStatus.innerHTML = 'Esperando stock...'
    return getStock(orderNumber)
}
const checkAvailability = (stock, orderNumber) => {
    printIngredients(stock)
    orderStatus.innerHTML = 'Esperando disponibilidad...'
    return Promise.all([getFryerAvailability(orderNumber), getHovenAvailability(orderNumber), getGrillAvailability(orderNumber)])
}
const confirmOrder = response => {
    response.forEach(elm => result.innerHTML += `<small>${elm.data.statud},</small>`)
    orderStatus.innerHTML = '<strong style="color: green">Pedido confirmado</strong>'
}



form.onsubmit = e => {

    e.preventDefault()

    const orderNumber = order.value
    orderStatus.innerHTML = 'Esperando ingredientes...'

    getIngredients(orderNumber)
        .then(response => checkStock(response.data.ingredientes, orderNumber))
        .then(response => checkAvailability(response.data.stock, orderNumber))
        .then(response => confirmOrder(response))
        .catch(e => handleError(e))
        .finally(() => setTimeout(resetPanel, 5000))
}