import Joi from 'joi';

const name = Joi.string().regex(/^[a-zA-Z]+$/);
const password = Joi.string().min(6).max(24).strict();
const email = Joi.string().email();
const string = Joi.string();
const id = Joi.string().guid({ version: 'uuidv4' });

const registerUserSchema = Joi.object({
  firstname: name.required(),
  lastname: name.required(),
  email: email.required(),
  password: password.required()
});

// const editUserSchema = Joi.object({
//   first_name: name.required(),
//   last_name: name.required()
// });


// const checkEmailAvailabilitySchema = Joi.object({
//   email: email.required()
// });

// const changePasswordSchema = Joi.object({
//   old_password: password.required(),
//   password: password.required()
// });

// const searchUsersSchema = Joi.object({
//   query: string.required(),
//   team_id: id.required()
// });

export default {
  '/register': registerUserSchema,
//   '/changePassword': changePasswordSchema,
//   '/edit': editUserSchema,
//   '/search': searchUsersSchema
};