module.exports = ({ env }) => ({
    slugify: {
        enabled: true,
        config: {
            contentTypes: {
                post: {
                    field: 'slug',
                    references: 'title',
                },
                platform: {
                    field: 'slug',
                    references: 'name',
                },
                user: {
                    field: 'slug',
                    references: 'username'
                }
            },
        },
    },
});