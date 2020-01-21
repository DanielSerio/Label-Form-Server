import express = require('express');
import LabelForm from '../models/label-form.model';
import { MongooseDocument } from 'mongoose';

export default class LabelFormController {
  
  private static serverError(res: express.Response, e: Error): express.Response {
    return res.status(500).json({error: e});
  }

  private static clientError(res: express.Response, e: Error): express.Response {
    return res.status(400).json({error: e});
  }

  private static id(req: express.Request): string { return req.params.id; }

  public static async create(req: express.Request, res: express.Response) {
    const body = req.body;

    try {
      await LabelForm.findOne({name: body.name}, (err: Error, doc: MongooseDocument) => {
        if (err) return this.serverError(res, err);
        if (doc) return this.clientError(res, new Error(`${doc} already exists`)); 
        
        try {
          const labelForm = new LabelForm({...body});

          labelForm.save((err: Error) => {
            if (err) return this.serverError(res, err);
            return res.status(201).json({message: 'Label form created'});
          });

        } catch(e) { return this.serverError(res, e) }
      });
    } catch(e) { return this.serverError(res, e) } 
  }

  public static async getAll(req: express.Request, res: express.Response) {
    try {
      await LabelForm.find((err: Error, docs: MongooseDocument[]) => {
        if (err) return this.serverError(res, err);
        if (!docs) return res.status(204).json({message: 'No content'});

        return res.status(200).json({items: docs});
      });
    } catch (e) { return this.serverError(res, e) }
  }
  
  public static async getOne(req: express.Request, res: express.Response) {
    const id: string = this.id(req);

    try {
      await LabelForm.findOne({_id: id}, (err: Error, doc: MongooseDocument) => {
        if (err) return this.serverError(res, err);
        if (!doc) return this.clientError(res, new Error('No content'));
        
        return res.status(200).json({item: doc});
      });
    } catch (e) { return this.serverError(res, e) }
  }
  
  public static async update(req: express.Request, res: express.Response) {
    const id: string = this.id(req);
    const body = req.body;

    try {
      await LabelForm.updateOne({_id: id}, {...body}, (err: Error) => {
        if (err) return this.serverError(res, err);
        return res.status(204).json({message: `Updated label form '${id}'`});
      });
    } catch (e) { return this.serverError(res, e) }
  }
  
  public static async delete(req: express.Request, res: express.Response) {
    const id: string = this.id(req);
    
    try {
      await LabelForm.deleteOne({_id: id}, (err: Error) => {
        if (err) return this.serverError(res, err);
        return res.status(204).json({message: `Deleted label form '${id}'`});
      });
    } catch (e) { return this.serverError(res, e) }
  }
}
