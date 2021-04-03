const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint


// find all tags
// be sure to include its associated Product data
router.get('/', async (req, res) => {
  try {
    const allTags = await Tag.findAll();
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
// be sure to include its associated Product data
router.get('/:id', async (req, res) => {
  try {
    const oneTag = await Tag.findByPk(req.params.id, {
      include: [{ 
        model: Product, 
        attributes: ["id", "product_name", "price", "stock"] 
      }]});
    if (!oneTag) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json(oneTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update a tag's name by its `id` value
// router.put('/:id', (req, res) => {
//   // update product data
//   Tag.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((tagAll) => {
//       // find all associated tags from ProductTag
//       return Tag.findAll({ where: { tag_id: req.params.id } });
//     })
//     .then((tag) => {
//       // get list of current tag_ids
//       const tagIds = tag.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newTag = req.body.tagIds
//         .filter((tag_id) => !tagIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             product_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const tagToRemove = product
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: tagToRemove } }),
//         ProductTag.bulkCreate(newTag),
//       ]);
//     })
//     .then((updatedProduct) => res.json(updatedProduct))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteTag) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
