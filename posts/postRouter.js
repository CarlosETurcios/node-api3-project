const express = require('express');
const PDB = require('./postDb');
const router = express.Router();

router.get('/', (req, res) => {
  // do your magic!
  PDB.get(req.body).then(post => {
    res.status(200).json(post);
  });
});

router.get('/:id', validatePostId, (req, res) => {
  // do your magic!
  res.status(200).json(req.post);
});

router.delete('/:id', validatePostId, (req, res) => {
  // do your magic!
  PDB.remove(req.post.id).then(del => {
    res.status(200).json({ message: `${req.post.id} has been removed ` });
  });
});

router.put('/:id', validatePostId, (req, res) => {
  // do your magic!
  PDB.update(req.body.id).then(update => {
    res.status(200).json(update);
  });
});

// custom middleware

function validatePostId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  UDB.getById(id)
    .then(post => {
      if (post) {
        req.post = post;
        next();
      } else {
        res.status(404).json({ message: 'post not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'failed', err });
    });
}

module.exports = router;
