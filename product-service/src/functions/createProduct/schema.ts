export default {
    type: 'object',
    properties: {
        product: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                description: { type: 'string' },
                title: { type: 'string' },
                price: { type: 'number' },
                count: { type: 'number' },
            },
            required: ['id', 'description', 'title', 'price', 'count']
        },
    },
    required: ['product'],
} as const;
