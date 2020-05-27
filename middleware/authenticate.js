function authenticating(req,res, next) {
    console.log('Authenticating...');
    next();
}

module.exports= authenticating;