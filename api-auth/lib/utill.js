/* eslint-disable strict */
const validatorapi = require('validator');

module.exports = {
	isExist: (val) => {
		const exist = !!(val && val !== undefined && val !== null && val.length > 0);
		return exist;
	},
};
