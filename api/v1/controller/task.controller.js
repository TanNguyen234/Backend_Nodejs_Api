const Task = require('../models/task.model');
const paginationHelper = require('../../../helpers/pagination');
const searchHelper = require('../../../helpers/search');

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
    let objectSearch = searchHelper(req.query)
    if(req.query.keyword) {
        find.title = objectSearch.regex
    }

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

//[GET] /api/v1/tasks/change-status/:id
module.exports.changeStatus = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({
            _id: id
        },{
            status: req.body.status
        })
    
        res.json({
            code: 200,//success
            message: "Cập nhật trạng thái thành công"
        })
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Không tồn tại"
        })
    }
};

//[GET] /api/v1/tasks/change-multi
module.exports.changeMulti = async (req, res) => {
    try {
        const { ids, key, value } = req.body;
        
        switch (key) {
            case "status":
                await Task.updateMany({
                    _id: { $in: ids }
                },{
                    status: value
                })
                res.json({
                    code: 200,//success
                    message: `Cập nhật thành công`
                })

                break;
            case "delete":
                await Task.updateMany({
                    _id: { $in: ids }
                },{
                    deleted: true,
                    deleteAt: new Date()
                })

                res.json({
                    code: 200,//success
                    message: `Xóa thành công`
                })
            default:
                res.json({
                    code: 400,//fail
                    message: "Không tồn tại"
                })
                break;
        }

    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Không tồn tại"
        })
    }
};

//[GET] /api/v1/tasks/create
module.exports.create = async (req, res) => {
    try {
        req.body.createdBy = req.user.id;
        const task = new Task(req.body)
        const data = await task.save()

        res.json({
            code: 200,//success
            message: "Thêm mới thành công",
            data: data
        })
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Lỗi!"
        })
    }
}

//[PATCH] /api/v1/tasks/edit/:id
module.exports.edit = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({
            _id: id
        }, req.body)

        res.json({
            code: 200,//success
            message: "Cập nhật thành công",
        })
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Lỗi!"
        })
    }
}

//[DELETE] /api/v1/tasks/delete/:id
module.exports.delete = async (req, res) => {
    try {
        const id = req.params.id;

        await Task.updateOne({
            _id: id
        }, {
            deleted: true,
            deleteAt: new Date()
        })

        res.json({
            code: 200,//success
            message: "Xóa thành công",
        })
    } catch (err) {
        res.json({
            code: 400,//fail
            message: "Lỗi!"
        })
    }
}