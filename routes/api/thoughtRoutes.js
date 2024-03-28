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
        const singleThought = await Thought.find({_id: req.params.objectId});
        res.status(200).json(singleThought);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ error: "something went wrong" })
    }
});