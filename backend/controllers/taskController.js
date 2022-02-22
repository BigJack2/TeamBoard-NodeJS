import task from "../models/task.js";


const registerTask = async (req, res) => {

  if (!req.body.name || !req.body.description)
    return res.status(400).send({ message: "Imcomplete data" });


  let schemaTask = new task({
    name: req.body.name,
    description: req.body.description,
    imgUrl: req.body.imgUrl,
    tackStatus: "to-do",
  });


  let myResult = await schemaTask.save();

  if (!myResult) return res.status(500).send({ message: "Fail to register task" });

  res.status(200).send({ myResult })
};


const listTask = async (req, res) => {

  let tasks = await task.find();

  if (tasks.length === 0) return res.status(400).send({ message: "No search results" });

  return res.status(200).send({ tasks });
};


const updateTask = async (req, res) => {
  if (!req.body._id || !req.body.tackStatus)
    return res.status(400).send({ message: "Imcomplete data" });

  //Si no hay problema pasamos a realizar la actualizacion
  const editTask = await task.findByIdAndUpdate(req.body._id, {
    tackStatus: req.body.tackStatus,
  });

  if (!editTask) return res.status(500).send({ message: "Error editing task" });
  return res.status(200).send({ message: "Task updated" });
};

const deleteTask = async (req, res) => {
  if (!req.params["_id"]) return res.status(400).send({ message: "Incomplete data" });

  const tasks = await task.findByIdAndDelete(req.params["_id"]);

  return !tasks
    ? res.status(400).send({ message: "Error deleting task" })
    : res.status(200).send({ message: "Task delete" });
};

export default { registerTask, listTask, updateTask, deleteTask };