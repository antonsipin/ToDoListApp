const { PrismaClient } = require ('@prisma/client')

class PrismaService {
    constructor() {
        this.client = new PrismaClient()
    }

    async connect() {
        try {
            await this.client.$connect()
            console.log(`[PrismaService]: Connected to the ${process.env.DB_NAME} database`)
        } catch (e) {
            if (e instanceof Error) {
                console.log(`[PrismaService]: Error connecting to the ${process.env.DB_NAME} database: ${e.message}`)
            }
        }
    }

    async disconnect() {
        await this.client.$disconnect()
    }
}

module.exports = PrismaService