const { Router } = require("express");
const MoviesController = require("../controllers/moviesController");

const moviesController = new MoviesController();
moviesRouter = Router();

moviesRouter.post("/:user_id", moviesController.create);

moviesRouter.delete("/:id", moviesController.delete);

module.exports = moviesRouter;
