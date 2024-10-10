function getStartCar(req, res) {
    res.render('car')
}

function getCar(req, res) {
    res.render('car', {param: req.params})
    console.log(req.params)
}

function createCarGet(req, res) {
    res.render('createCar', {param: req.params})
    console.log(req.params)
}

function createCarPost(req, res) {

    console.log('car posted')
}

module.exports = {getStartCar, getCar, createCarGet, createCarPost};