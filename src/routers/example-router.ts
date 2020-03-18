import { Router } from 'express';
import log from '../helpers/log';
import { createExample } from '../services/example-service';

const router = Router()

router.post('/', async (req, res, next) => {
  const text = req.body?.text;

  try {
    const example = await createExample(text)
    res.status(200);
    res.json(example)
  } catch (e) {
    log(e);
    res.status(e.code);
    res.json(e.toJSON());
  }
})

export default router;