const knex = require("../database/knex");

class MoviesController {
  async create(req, res) {
    const { user_id } = req.params;
    const { title, description, rating, name } = req.body;

    const [note_id] = await knex("movie_notes").insert({
      title,
      description,
      rating,
      user_id,
    });

    const tagsInsert = name.map((tags) => {
      return {
        user_id,
        note_id,
        name: tags,
      };
    });

    await knex("movie_tags").insert(tagsInsert);

    res.status(201).json();
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("movie_notes").where({ id }).delete();

    res.json();
  }
}

module.exports = MoviesController;
