class LoggerController {
    static async getAll(req, res) {
        req.logger.fatal('Esto es un registro de error fatal')
        req.logger.error('Esto es un registro de error')
        req.logger.warning('Esto es un registro de advertencia')
        req.logger.info('Esto es un registro de informacion')
        req.logger.http('Esto es un registro HTTP')
        req.logger.debug('Esto es un registro de debug')

        res.send({status: 'Success', payload: 'Logger Test'})
    }
}

module.exports = LoggerController;