let validateUser = (data: any) => {
    const { email, password } = data;
    const errors = [];
    if (!email) {
        errors.push('Email is required');
    } else if (typeof email !== 'string') {
        errors.push('Email should be a string');
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
        errors.push('Email is not valid');
    }
    if (!password) {
        errors.push('Password is required');
    } else if (typeof password !== 'string') {
        errors.push('Password should be a string');
    } else if (password.length < 6) {
        errors.push('Password should be at least 6 characters');
    }
    return errors;
}

module.exports = { validateUser };