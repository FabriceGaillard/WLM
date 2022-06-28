export default abstract class RulesHelper {
    private static format(rule: string, field: string, args?: object) {
        const error = {
            rule, field, message: `${rule} validation failed`
        }
        if (args) Object.assign(error, { args })
        return error
    }

    public static uuid = (field: string) => this.format('uuid', field)
    public static url = (field: string) => this.format('url', field)
    public static mobile = (field: string) => this.format('mobile', field)
    public static exists = (field: string) => this.format('exists', field)
    public static boolean = (field: string) => this.format('boolean', field)
    public static required = (field: string) => this.format('required', field)
    public static email = (field: string) => this.format('email', field)
    public static unique = (field: string) => this.format('unique', field)
    public static confirmed = (field: string) => this.format('confirmed', field)
    public static regex = (field: string) => this.format('regex', field)
    public static different = (field: string) => this.format('different', field)
    public static string = (field: string) => this.format('string', field)

    public static maxLength(field: string, length: number) {
        return this.format('maxLength', field, { maxLength: length })
    }

    public static minLength(field: string, length: number) {
        return this.format('minLength', field, { minLength: length })
    }

}