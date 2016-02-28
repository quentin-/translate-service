module.exports = {
  error: function(status) {
    this.response.status = status;
    this.body = {error: 'an error occurred'};
  }
}
