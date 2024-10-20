const userController = require('./controllers/authController')
const middleware = require("./middleware/auth")
const questionController = require("./controllers/questionController")

exports.init_routes = function (app) {
    app.post("/login",userController.login );
    app.post("/register", userController.register);
    app.get("/gelval", userController.getvalue);

     //protect router
    app.use("/api", middleware);

    app.post('/api/create/question', questionController.QuestionRegister );
    app.get('/api/get/question', questionController.getQuestions );
    app.delete('/api/delete/question/:id', questionController.deleteQuestion );
    app.put('/api/edit/question/:id', questionController.updateQuestion );
    app.post('/api/submit/answers', questionController.scroe );
    app.get('/api/get/previous-score/:id', questionController.getScore );
    // app.get('/api/tasks', taskController.getTasks);
    // app.get('/api/tasks/:id', taskController.getTaskById);
    // app.put('/api/tasks/:id', taskController.updateTask);
    // app.delete('/api/tasks/:id', taskController.deleteTask);

}  