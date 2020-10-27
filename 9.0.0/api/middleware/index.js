const jwt = require('jsonwebtoken');

const { UnauthorizedError } = require('../error');

module.exports = {
    generateJWT: async (id, email, next) => {
        try {
            const payload = { id, email };
            return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 3600 });
        } catch (err) {
            next(err);
        }
    },
    authorize: (req, res, next) => {
       try {
           const authHeader = req.get('Authorization') || '';

           if (!authHeader) {
                throw new UnauthorizedError('Authorization failed');
           }

           const token = authHeader.split(' ')[1];

           req.user = jwt.verify(token, process.env.JWT_SECRET);

           next();
       } catch (err) {
           next(err);
       }
    }
};
