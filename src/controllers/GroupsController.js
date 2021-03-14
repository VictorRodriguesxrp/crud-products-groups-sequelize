const Groups = require('../models/groups');

module.exports = {
  async validateGroups(req, res, next){ 
    const { id } = req.headers;

    try {
      const group = await Groups.findByPk(id);
      if(!group) {
        return res.status(400).json({
          erro: "Group does not exists!"
        })
      }
    } catch (err) {
      return res.status(400).json({
        erro: `Group does not exists ${err}`
      })
    }

    req.id = id;
    next();
  },

  async index(req, res ) {
    try {
      const groups = await Groups.findAll();
      return res.status(200).json(groups);
    } catch (err) {
      return res.status(400).json({
        erro: `Erro ao selecionar grupos ${err}`
      })
    }  
  },

  async store(req, res) {
    const { description } = req.body;

    try {
      const group = await Groups.create({
        description
      });

      return res.status(201).send();
    } catch (err) {
      return res.status(400).json({
        Erro: `Erro ao salvar grupos ${err}`
      })
    }
  },

  async update(req, res) {
    const { id } = req;
    const { description } = req.body;

    try {
      await Groups.update({ description },
        {
        where: {
          id
        }
      });
      
      return res.status(200).send();
    } catch (err) {
      return res.status(400).json({
        error: `could not correctly update groups`
      })
    }
  },

  async delete(req, res) {
    const { id } = req;

    await Groups.destroy({
      where: {
        id
      }
    })

    return res.status(201).send()
  }
}