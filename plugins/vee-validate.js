import { extend } from 'vee-validate'
import { email, required, min, max, confirmed } from 'vee-validate/dist/rules'

extend('required', {
    ...required,
    message: 'The {_field_} is required'
})

extend('email', {
    ...email,
    message: 'The {_field_} is not a valid email address'
})

extend('min', {
    ...min,
    params: ['length'],
    message: 'The {_field_} should have minimum {length} characters'
})

extend('max', {
    ...max,
    params: ['length'],
    message: 'The {_field_} should have maximum {length} characters'
})

extend('confirmed', {
    ...confirmed,
    message: 'The {_field_} did not match'
})
