const router = require('express').Router();
const { User, Thought, Reaction } = require("../../models/index");

router.get("/", async (req, res) => {
    try {
        const allThoughts = await Thought.find({});
        res.status(200).json(allThoughts);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ error: "something went wrong" })
    }
});

router.get("/:objectId", async (req, res) => {
    try {
        const singleThought = await Thought.find({ _id: req.params.objectId });
        res.status(200).json(singleThought);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ error: "something went wrong" })
    }
});

router.post("/", async (req, res) => {
    try {
        const newThought = await Thought.create(
            {
                thoughtText: req.body.thoughtText,
                userName: req.body.userName
            });

        res.status(200).json(newThought);
        console.log(newThought);

        const userWithNewThought = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: newThought } },
            { new: true }
        );

        console.log(userWithNewThought);

        if(!userWithNewThought){
            return res.status(404).json({
                message: "Thought created, but no user found with that ID"
            })
        };
        
        res.status(200).json("Created the thought!")
    } catch (err) {
        console.log(err);
        res.status(500).json({error: "oh no, something went wrong"})
    }
});

router.put("/find-one-update/:objectId", async (req, res) => {
    try {
        const filter = { _id: req.params.objectId };
        const update = {
            thoughtText: req.body.thoughtText,
            username: req.body.username
        };
        const option = { new: true };

        const updatedThought = await User(filter, update, option);

        console.log(updatedThought)
        res.status(200).json(updatedThought);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ message: "something went wrong..." });
    }
});

router.delete("/find-one-delete/:objectId", async (req, res) => {
    try {
        const deletedThought = await User.findOneAndDelete({ _id: req.params.objectId });
        res.status(200).json(deletedThought)
        console.log(`deleted: ${deletedThought}`);
    } catch (err) {
        console.log("something went wrong...");
        res.status(500).json({ error: "something went wrong.." });
    }
});

