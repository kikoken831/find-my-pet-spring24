import { validationMetadatasToSchemas } from 'class-validator-jsonschema'
import type { Application } from 'express'
import fs from 'fs'
import { dump } from 'js-yaml'
import { SchemaObject } from 'openapi3-ts'
import { getMetadataArgsStorage } from 'routing-controllers'
import { routingControllersToSpec } from 'routing-controllers-openapi'
import swaggerUi from 'swagger-ui-express'

import { routingOptions } from '../config/routing'

export function useSwagger(app: Application) {
  const storage = getMetadataArgsStorage()
  const schemas = validationMetadatasToSchemas({
    refPointerPrefix: '#/components/schemas/',
  }) as Record<string, SchemaObject>

  const spec = routingControllersToSpec(storage, routingOptions, {
    components: {
      schemas,
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    info: {
      description: 'Fall 2024',
      title: 'Find My Pet',
      version: '1.0.0',
    },
  })

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(spec))

  const yamlString = dump(spec)
  fs.writeFileSync('api_spec.yaml', yamlString)

  // Render spec on root:
  app.get('/swagger.json', (_req, res) => {
    res.json(spec)
  })
}
