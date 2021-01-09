module.exports = {
    ensureAuthenticated: function (fnName, where){//using fn to redirect/render to redirectWhere if no redirect
        return (req, res, next) => {
            if (req.isAuthenticated()) return next()
            req.flash('errors', ['You do not have authorization to go there'])
            if (fnName == 'render') return res.render(where);
            if (fnName == 'redirect') return res.redirect(where);
            throw 'Function not found...'
            }
    }
}

