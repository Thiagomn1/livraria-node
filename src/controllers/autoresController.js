import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarAutor = async (req, res) => {
    const { id } = req.params;

    try {
      const autor = await autores.findById(id);
      res.status(200).send(autor);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      const autor = new autores(req.body);
      await autor.save();
      res.status(201).send(autor.toJSON());
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static atualizarAutor = async (req, res) => {
    const { id } = req.params;

    try {
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static deletarAutor = async (req, res) => {
    const { id } = req.params;

    try {
      await autores.findByIdAndDelete(id);
      res.status(200).send({ message: "Autor deletado com sucesso" });
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default AutorController;
