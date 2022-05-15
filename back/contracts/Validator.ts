declare module '@ioc:Adonis/Core/Validator' {
    interface Rules {
        different(field: string): Rule
    }
}