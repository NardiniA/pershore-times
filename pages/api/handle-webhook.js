export default (req, res) => {
    if (!req.body.event) res.status(400).send({ message: "Invalid Body Params" });
    if (!req.body.success) res.status(500).send({ message: req.body.error || "Unknown Error" });

    if (req.body.event === "post_publish") {
        console.log("Post Published");
        res.status(200).send({ message: "Published" });
    } else {
        res.status(500).send({ message: "Event not handled" });
    }
}