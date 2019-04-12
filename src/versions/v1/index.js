const projectRoutes = require('./resources/project');
const userRoutes = require('./resources/user');
const taskRoutes = require('./resources/task');

module.exports = ({
    "/project":  projectRoutes,
    "/user":  userRoutes,
    "/task": taskRoutes,
});
