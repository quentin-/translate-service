module.exports = {
  error(status) {
    this.response.status = status;
    this.body = { error: 'an error occurred' };
  },
};
