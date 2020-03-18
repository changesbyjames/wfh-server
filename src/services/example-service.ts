import db from  './database-client';
import { Model, DataTypes } from 'sequelize';

import { MissingParameterError, DatabaseError } from '../helpers/errors';
import log from '../helpers/log';
import { syncOptions } from '../helpers/options';

class Example extends Model {}
Example.init({
  text: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize: db,
  modelName: 'example'
})

Example.sync(syncOptions)
  .then(() => {
    console.log('[DEV] Successful table sync for "Example"');
  })
  .catch((err: Error) => {
    console.log('[DEV] Failed table sync for "Example"');
    console.error(err);
    process.exit(1);
  });

export const createExample = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const response = await Example.create({ text });
    return response.toJSON();  
  } catch (e) {
    log(e);
    throw new DatabaseError('Could not save this event.');
}}

export const getExample = async (id: string) => {
  if (!id) throw new MissingParameterError('id');

  try {
    const response = await Example.findOne({ where: { id }});
    return response.toJSON();  
  } catch (e) {
    log(e);
    throw new DatabaseError('Could not get this event.');
}}

export const getExamples = async (text: string) => {
  if (!text) throw new MissingParameterError('text');

  try {
    const responses = await Example.findAll({ where: { text }});
    return responses.map((res: any) => res.toJSON());  
  } catch (e) {
    log(e);
    throw new DatabaseError('Could not get these examples.');
}}