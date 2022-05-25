import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule(
    'different',
    (value, [field], options) => {
        if (!options.root[field] || value === options.root[field]) {
            options.errorReporter.report(
                options.pointer,
                'different',
                'different validation failed',
                options.arrayExpressionPointer
            )
        }
    }
)