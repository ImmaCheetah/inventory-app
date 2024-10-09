function getStartCategory(req, res) {
    res.render('category')
}

function getCategory(req, res) {
    res.render('category', {param: req.params})
    console.log(req.params)
}

module.exports = {getStartCategory, getCategory};