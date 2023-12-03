function createUserSession(req, user, action) { // user는 mongodb에서 오는 user
    req.session.uid = user._id.toString();
    req.session.save(action);
}

module.exports = {
    createUserSession: createUserSession
}