import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livrosResultado = await livros.find().populate("autor");
      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static listarLivro = async (req, res) => {
    const { id } = req.params;

    try {
      const livro = await livros.findById(id).populate("autor", "nome");
      res.status(200).send(livro);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    const editora = req.query.editora;

    try {
      const livrosResultado = await livros.find({ editora: editora });
      res.status(200).json(livrosResultado);
    } catch (err) {
      res.status(400).json(err);
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      const livro = new livros(req.body);
      await livro.save();
      res.status(201).send(livro.toJSON());
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static atualizarLivro = async (req, res) => {
    const { id } = req.params;

    try {
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (err) {
      res.status(500).json(err);
    }
  };

  static deletarLivro = async (req, res) => {
    const { id } = req.params;

    try {
      await livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro deletado com sucesso" });
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default LivroController;
