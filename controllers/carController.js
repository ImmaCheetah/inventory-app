function getStartCar(req, res) {
    res.render('car')
}

function getCar(req, res) {
    res.render('car', {param: req.params})
    console.log(req.params)
}

function createCar(req, res) {
    res.render('createCar', {param: req.params})
    console.log(req.params)
}

module.exports = {getStartCar, getCar, createCar};