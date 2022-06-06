import { BaseCommand } from '@adonisjs/core/build/standalone'
import execa from 'execa'
import Drive from '@ioc:Adonis/Core/Drive'

import { AVATAR_UPLOAD_DIR } from 'App/Controllers/Http/UsersController'

export default class InitDatabase extends BaseCommand {
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
        spinner.stop()

        Drive.delete(AVATAR_UPLOAD_DIR)

        await execa.node('ace', ['db:wipe'], {
            stdio: 'inherit',
        })

        await execa.node('ace', ['migration:run'], {
            stdio: 'inherit',
        })

        await execa.node('ace', ['db:seed'], {
            stdio: 'inherit',
        })

        this.logger.success('Database initialisation successful.')
    }
}
