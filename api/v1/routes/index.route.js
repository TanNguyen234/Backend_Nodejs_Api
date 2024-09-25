const taskRoute = require('./task.route');
const userRoute = require('./user.route');

const authMiddleware = require('../middleware/auth.middleware')

module.exports = (app) => {
    const version = '/api/v1'

    app.use(version + '/tasks', authMiddleware.requestAuth, taskRoute)
    app.use(version + '/users', userRoute)
}