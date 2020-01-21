import express = require('express');
import LabelFormController from '../controllers/label-form.controller';

const router: express.Router = express.Router();

router.route('/')
  .get((req: express.Request, res: express.Response) => LabelFormController.getAll(req, res))
  .post((req: express.Request, res: express.Response) => LabelFormController.create(req, res));

router.route('/:id')
  .get((req: express.Request, res: express.Response) => LabelFormController.getOne(req, res))
  .put((req: express.Request, res: express.Response) => LabelFormController.update(req, res))
  .delete((req: express.Request, res: express.Response) => LabelFormController.delete(req, res));

export default router;