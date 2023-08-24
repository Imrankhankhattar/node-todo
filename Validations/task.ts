let validateTask = (data:any) => {
    const { name } = data;
    const errors = [];
    if (!name) {
        errors.push('name is required');
    } else if (typeof name !== 'string') {
        errors.push('name should be a string');
    } else if (name.length < 6) {
        errors.push('name should be at least 6 characters');
    }
    return errors;
}

module.exports = {validateTask};