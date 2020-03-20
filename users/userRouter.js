const express = require('express');

const router = express.Router();
const UDB = require('./userDb');

router.post('/', validateUser, (req, res) => {
  // do your magic!
  UDB.insert(req.body).then(name => {
    res.status(201).json(name);
  });
});

router.post('/:id/posts', [validateUser, validatePost], (req, res) => {
  // do your magic!
  const { id } = req.params;
  const body = req.body;
  body.user_id = id;
  UDB.insert(body).then(find => {
    res.status(201).json(body);
  });
});

router.get('/', (req, res) => {
  // do your magic!
  UDB.get(req.body).then(user => {
    res.status(200).json(user);
  });
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  res.status(200).json(req.user);
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  UDB.getUserPosts(req.user.id).then(post => {
    res.status(200).json(post);
  });
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  UDB.remove(req.user.id).then(del => {
    res.status(200).json({ message: `${req.user.id} has been removed` });
  });
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  UDB.update(req.body.id).then(e => {
    res.status(200).json(e);
  });
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  const { id } = req.params;
  UDB.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(404).json({ message: 'user not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'failed', err });
    });
}

function validateUser(req, res, next) {
  // do your magic!
  user = req.body;
  if (Object.keys(user).length === 0) {
    res.status(400).json({ message: 'missing user data' });
  } else if (!user.name) {
    res.status(400).json({ error: 'missing required name field' });
  } else {
    next();
  }
}

function validatePost(req, res, next) {
  // do your magic!
  post = req.body;
  if (Object.keys(user).length === 0) {
    res.status(400).json({ message: ' missing post data' });
  } else if (!post.text) {
    res.status(400).json({ error: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
