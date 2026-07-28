import Joi from 'joi';
const registerSchema = Joi.object({
  first_name: Joi.string().min(2).max(50).required().messages({
    'string.empty': 'First name is required',
    'string.min': 'First name must be at least 2 characters'
  }),
  
  last_name: Joi.string().allow(null, '').optional(),
  
  email: Joi.string().email().required().messages({
    'string.email': 'enter valid email',
    'string.empty': 'Email is required'
  }),
  
  phone: Joi.string().pattern(/^[0-9]{10}$/).optional().messages({
    'string.pattern.base': 'Phone number must be 10 digits'
  }),
  
  password_hash: Joi.string().min(6).required().messages({
    'string.min': 'Password must be at least 6 characters'
  }),
  
  username: Joi.string().alphanum().min(3).max(30).required(),
  
  role: Joi.string().valid('CUSTOMER', 'ADMIN', 'SELLER', 'DELIVERY_PARTNER').default('CUSTOMER')
});

const loginSchema = Joi.object({
    email: Joi.string().email().optional(),
    username: Joi.string().alphanum().min(3).max(30).optional(),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters'
    })
}).or('email', 'username').messages({
    'object.missing': 'Either email or username is required'
});

export {
  registerSchema,
  loginSchema
};