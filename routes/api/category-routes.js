const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const allCatagories = await Category.findAll();
    res.status(200).json(allCatagories);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const oneCategory = await Category.findByPk(req.params.id, {
      include: [{ 
        model: Product, 
        attributes: ["id", "product_name", "price", "stock"] 
      }]});
    if (!oneCategory) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json(oneCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

  // update a category by its `id` value

// router.put('/:id', (req, res) => {
//   // update product data
//   Category.update(req.body, {
//     where: {
//       id: req.params.id,
//     },
//   })
//     .then((category) => {
//       // find all associated tags from ProductTag
//       return Category.findAll({ where: { category_id: req.params.id } });
//     })
//     .then((categoryTags) => {
//       // get list of current tag_ids
//       const categoryIds = categoryTags.map(({ tag_id }) => tag_id);
//       // create filtered list of new tag_ids
//       const newCategoryTags = req.body.tagIds
//         .filter((tag_id) => !categoryIds.includes(tag_id))
//         .map((tag_id) => {
//           return {
//             category_id: req.params.id,
//             tag_id,
//           };
//         });
//       // figure out which ones to remove
//       const categoryToRemove = product
//         .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
//         .map(({ id }) => id);

//       // run both actions
//       return Promise.all([
//         ProductTag.destroy({ where: { id: categoryToRemove } }),
//         ProductTag.bulkCreate(newProduct),
//       ]);
//     })
//     .then((updatedCategory) => res.json(updatedCategory))
//     .catch((err) => {
//       // console.log(err);
//       res.status(400).json(err);
//     });
// });


// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    if (!deleteCategory) {
      res.status(404).json({ message: 'not found' });
      return;
    }
    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
