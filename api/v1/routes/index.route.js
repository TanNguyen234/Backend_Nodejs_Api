const taskRoute = require('./task.route');

module.exports = (app) => {
    app.use("/api/v1/tasks", taskRoute) //Chat nhóm
}