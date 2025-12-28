import { Sequelize } from 'sequelize'

const database = process.env.DB_NAME || 'bookmarksdb',
username = process.env.DB_USER || 'root',
password = process.env.DB_PASSWORD || '',
host = process.env.DB_HOST || 'localhost',
port = process.env.DB_PORT || '5432'

const sequelize = new Sequelize({
    database,
    username,
    password,
    host,
    port: parseInt(port),
    dialect: 'postgres'
})

export {
    sequelize
}