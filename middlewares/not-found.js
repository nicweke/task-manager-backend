const notFound = (req, res) => res.status(400).send("The route does not exist");

module.exports = notFound;
