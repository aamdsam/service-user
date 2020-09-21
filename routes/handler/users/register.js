const bcrypt = require('bcrypt');
const {User} = require('../../../models');
const Validator = require('fastest-validator');
const v = new Validator();

module.exports = async (req,res) =>{
    const schema = {
        name: 'string|emty:false',
        email: 'email|emty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length){
        return res.status(400).json({
            status: 'error',
            message: validate
        });
    }

    const v_email_exist = await User.findOne({
        where: { email: req.body.email }
    })

    if (v_email_exist){
        return res.status(409).json({
            status: "error",
            message: "email already exist"
        })
    }

    const password = await bcrypt.hash(req.body.password,10);

    const data = {
        password,
        name: req.body.name,
        email: req.body.email,
        profession: req.body.profession,
        role: 'student'
    };

    const createUser = await User.create(data);

    return res.json({
        status: 'success',
        data: {
            id: createUser.id
        }

    });
}