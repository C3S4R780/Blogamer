// @ts-nocheck
'use strict';

/**
 * platform controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::platform.platform', ({ strapi }) => ({
    async findOne(ctx) {
        const { id } = ctx.params

        const entity = await strapi.db.query('api::platform.platform').findOne({
            where: { slug: id },
            populate: true
        })

        const sanitizedEntity = await this.sanitizeOutput(entity, ctx)

        return this.transformResponse(sanitizedEntity)
    }
}));
