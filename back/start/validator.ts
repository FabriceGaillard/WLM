import { validator } from '@ioc:Adonis/Core/Validator'
import ObjectHelper from 'App/Helpers/ObjectHelper'

validator.rule(
    'different',
    (value, [field], options) => {
        const property = ObjectHelper.getPropertyFromPointedString(options.root, field)
        if (!property || value === property) {
            options.errorReporter.report(
                options.pointer,
                'different',
                'different validation failed',
                options.arrayExpressionPointer
            )
        }
    }
)