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

function updateCategoryGet(req, res) {
    res.render('updateCategory', {param: req.params})
    console.log('update category page',req.params)
}

function createCategoryPost(req, res) {
    console.log('category posted')
}

function updateCategoryPost(req, res) {
    console.log('category updated')
}

module.exports = {
    getStartCategory, 
    getCategory, 
    createCategoryGet, 
    createCategoryPost,
    updateCategoryGet,
    updateCategoryPost
};