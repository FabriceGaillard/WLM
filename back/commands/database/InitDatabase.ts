import { BaseCommand } from '@adonisjs/core/build/standalone'
import execa from 'execa'

export default class Init extends BaseCommand {
    /**
     * Command name is used to run the command
     */
    public static commandName = 'db:init'

    /**
     * Command description is displayed in the "help" output
     */
    public static description = 'Initilization of wlm database'

    public static settings = {
        /**
         * Set the following value to true, if you want to load the application
         * before running the command. Don't forget to call `node ace generate:manifest` 
         * afterwards.
         */
        loadApp: true,

        /**
         * Set the following value to true, if you want this command to keep running until
         * you manually decide to exit the process. Don't forget to call 
         * `node ace generate:manifest` afterwards.
         */
        stayAlive: false,
    }

    public async run() {
        const spinner = this.logger.await('Database initialisation')

        const { default: Database } = await import('@ioc:Adonis/Lucid/Database')
        const { default: Env } = await import('@ioc:Adonis/Core/Env')

        const database = 'postgres';
        Database.manager.add(
            database,
            {
                client: Env.get('DB_CONNECTION'),
                connection: {
                    host: Env.get('PG_HOST'),
                    port: Env.get('PG_PORT'),
                    user: Env.get('PG_USER'),
                    password: Env.get('PG_PASSWORD'),
                    database: database
                },
                healthCheck: true
            }
        );

        spinner.stop()

        const postgres = Database.connection(database)
        await postgres.rawQuery('DROP DATABASE IF EXISTS wlm')
        await postgres.rawQuery('CREATE DATABASE wlm')

        await execa.node('ace', ['migration:run'], {
            stdio: 'inherit',
        })

        await execa.node('ace', ['db:seed'], {
            stdio: 'inherit',
        })

        this.logger.success('Database initialisation successful.')
    }
}
