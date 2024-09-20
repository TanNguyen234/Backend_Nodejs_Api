const Task = require('../models/task.model');
const paginationHelper = require('../../../helpers/pagination');

//[GET] /api/v1/tasks
module.exports.index = async (req, res) => {
    //Bộ lọc trạng thái
    const find = {
        deleted: false,
    }

    if(req.query.status) {
        find.status = req.query.status
    }
    //Pagination
    const countTasks = await Task.countDocuments(find); // Hàm count trong mongoose để tổng số sản phẩm

    let objectPagination = paginationHelper({
        currentPage: 1,
        limitItem: 2
    }, req.query, countTasks)
    //Sort
    const sort = {}

    if(req.query.sortKey && req.query.sortValue) {
        sort[req.query.sortKey] = req.query.sortValue; //Vì key, value là linh động
    }
    //End Sort

    const tasks = await Task.find(find).sort(sort).limit(objectPagination.limitItem).skip(objectPagination.skip);

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