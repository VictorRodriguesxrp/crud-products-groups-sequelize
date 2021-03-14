const Products = require('../models/products')
const Groups = require('../models/groups')
const { uuid } = require ('uuidv4');

module.exports = {
  async validateGroups(req, res, next) {
    const {group_id} = req.body;

    try {
      const groups = await Groups.findOne({
        where: {
          id: group_id
        }
      });

      if(groups) {
        next();
      } else {
        return res.status(400).json({
          Erro: `Group ${group_id} not found `
        })
      }
    } catch (err) {
      return res.status(400).json({
        Erro: `Erro ao consultar grupo ${err}`
      })
    }

  },

  async validateIfProductExists(req, res, next) {
    const { id } = req.headers;

    const product = await Products.findByPk(id);

    if (!product) {
      return res.status(400).json({
        error: 'product does not exists!'
      })
    }

    req.id = id;
    next();
  },

  async index (req, res) {
    try {
      const product = await Products.findAll({
        order: [
          ['id', 'ASC']        
        ]
      });
      return res.status(200).json(product);
    } catch (err) {
      return res.status(400).json({
        Erro: `erro: ${err}`
      });
    }
  },

  async store(req, res) {
    const {description, shortname, group_id} = req.body;
    try {
      const product = await Products.create({
        hash: uuid(),
        description,
        shortname,
        group_id
      })
      return res.status(201).json(product);
    } catch (err) {
      return res.status(400).json({
        Erro: err
      })
    }
  },

  async indexById (req, res) {
    const { id } = req.params;
    try {
      const product = await Products.findByPk(id, {
        include: { association: 'ProductsGroups'}
      });
      return res.status(200).json(product);
    } catch (Err) {
      return res.status(400).json({
        Erro: err
      });
    }
  },

  async updateProduct (req, res) {
    const { id } = req;
    console.log(id)
    const { description, shortname, group_id } = req.body;
    
    try {
      await Products.update({
        description,
        shortname,
        group_id
      }, {
        where: {id : id}
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        erro: `Erro ao atualizar produto: ${err}`
      })
    }
  },

  async delete (req, res) {
    const { id } = req.headers;

    try {
      await Products.destroy({
        where: {
          id
        }
      });

      return res.status(200).send();
    } catch (err) {
      return res.status(400).json({
        erro: `Product could not be deleted!`
      })
    }
  }
}