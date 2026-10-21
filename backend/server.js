import Fastify from 'fastify';

const fastify = Fastify({
    logger: true
})


fastify.get('/', (req, rep) => {
    rep.send({ hello: 'world' })
})

fastify.listen({ port: 8001, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }
    fastify.log.info(`Server is running on ${address}`)
})