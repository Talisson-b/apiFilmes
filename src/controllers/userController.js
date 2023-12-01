const knex = require("../database/knex");
const { hash } = require("bcrypt");
class UserController {
  async create(req, res) {
    try {
      const { name, email, password } = req.body;

      if (name === "" || email === "" || password === "") {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser preenchidos" });
      }

      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Todos os campos devem ser preenchidos" });
      }

      const [emailAreadyExists] = await knex("users").where({ email: email });

      if (emailAreadyExists !== undefined) {
        return res.status(400).json({ message: "Email already Exists" });
      }

      const hashPassword = await hash(password, 8);

      const user = await knex("users").insert({
        name,
        email,
        password: hashPassword,
      });
      res.status(201).json();
    } catch (error) {
      console.log(error);
    }
  }

  async update(req, res) {
    const { name, email, password } = req.body;
    const { id } = req.params;

    let [user] = await knex("users").where({ id });
    const [emailAreadyExists] = await knex("users").where({ email });

    if (user === undefined) {
      res.status(400).json({ message: "User not found" });
    }

    console.log(emailAreadyExists.id === Number(id));

    if (emailAreadyExists && emailAreadyExists.id !== Number(id)) {
      return res.status(400).json("Email já está em uso");
    }

    user.name = name ?? user.name;
    user.password = password ?? user.password;
    user.email = email ?? user.email;

    await knex("users").where({ id }).update(user);

    res.json(user);
  }

  async delete(req, res) {
    const { id } = req.params;

    await knex("users").where({ id }).delete();

    res.json();
  }

  async index(req, res) {
    const { id } = req.params;

    const [user] = await knex("users").where({ id });

    if (user === undefined) {
      res.status(400).json({ message: "User not found" });
    }

    res.json(user);
  }
}

module.exports = UserController;
