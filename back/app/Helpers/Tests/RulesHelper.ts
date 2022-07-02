export default abstract class RulesHelper {
    private static format(rule: string, field: string, message?: string, args?: object) {
        const error = {
            rule, field, message: message || `${rule} validation failed`
        }
        if (args) Object.assign(error, { args })
        return error
    }

    public static uuid = (field: string, message?: string) => this.format('uuid', field, message)
    public static url = (field: string, message?: string) => this.format('url', field, message)
    public static mobile = (field: string, message?: string) => this.format('mobile', field, message)
    public static exists = (field: string, message?: string) => this.format('exists', field, message)
    public static boolean = (field: string, message?: string) => this.format('boolean', field, message)
    public static required = (field: string, message?: string) => this.format('required', field, message)
    public static email = (field: string, message?: string) => this.format('email', field, message)
    public static unique = (field: string, message?: string) => this.format('unique', field, message)
    public static confirmed = (field: string, message?: string) => this.format('confirmed', field, message)
    public static regex = (field: string, message?: string) => this.format('regex', field, message)
    public static different = (field: string, message?: string) => this.format('different', field, message)
    public static string = (field: string, message?: string) => this.format('string', field, message)
    public static number = (field: string, message?: string) => this.format('number', field, message)

    public static maxLength(field: string, length: number) {
        return this.format('maxLength', field, undefined, { maxLength: length })
    }

    public static minLength(field: string, length: number) {
        return this.format('minLength', field, undefined, { minLength: length })
    }

    public static enum(field: string, choices: string[]) {
        return this.format('enum', field, undefined, { choices })
    }

    public static range(field: string, args: { [k: string]: any }) {
        return this.format('range', field, undefined, { ...args })
    }

}