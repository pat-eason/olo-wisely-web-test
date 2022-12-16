import {createInitialRestaurant} from "./utils/startup-hydration";

require('source-map-support/register')
import { Sequelize } from 'sequelize-typescript'

import { RouterServer } from './RouterServer'
import * as entities from './models/entities'

(async () => {
  new RouterServer().start(8080)

  const sequelize = new Sequelize(process.env.DATABASE_CONNECTION_STRING, {
    dialect: 'postgres',
    logging: process.env.LOG === 'debug' ? console.log : false,
    models: Object.keys(entities).map(k => entities[k])
  })

  await sequelize.sync({
    alter: true
  })

  await createInitialRestaurant()
})()
