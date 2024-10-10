function getStartCategory(req, res) {
    res.render('category')
}

function getCategory(req, res) {
    res.render('category', {param: req.params})
    console.log(req.params)
}

function createCategoryGet(req, res) {
    res.render('createCategory', {param: req.params})
    console.log(req.params)
}

function createCategoryPost(req, res) {
    console.log('category posted')
}

module.exports = {
    getStartCategory, 
    getCategory, 
    createCategoryGet, 
    createCategoryPost
};