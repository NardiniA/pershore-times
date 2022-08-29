export default (req, res) => {
    console.log(req.event);

    res.status(200).send({ message: "Received!" });
}