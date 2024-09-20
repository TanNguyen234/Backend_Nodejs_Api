const taskModel = require('../models/task.model');

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    const find = {
        deleted: false,
    }

    const sort = {}

    if(req.query.status) {
        find.status = req.query.status
    }

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue; //Vì key, value là linh động
    }

    const tasks = await taskModel.find(find).sort(sort)
    res.json(tasks)
};

//[GET] /api/v1/tasks/detail/:id
module.exports.detail = async (req, res) => {
    try {
        const id = req.params.id

        const task = await taskModel.findOne({
            _id: id,
            deleted: false,
        })

        res.json(task)
    } catch (error) {
        res.json('Không tìm thấy')
    }
};