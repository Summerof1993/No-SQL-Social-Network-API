const router = require('express').Router();
const { User, Thought, Reaction } = require("../../models/index");

router.get("/", async (req, res) => {
    try {
        const allUsers = await User.find({});
        res.status(200).json(allUsers);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ error: "something went wrong" })
    }
});

router.get("/:objectId", async (req, res) => {
    try {
        const singleUser = await User.find({ _id: req.params.objectId })
            .populate("thoughts")
            .populate("friends");
        res.status(200).json(singleUser);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ error: "something went wrong" });
    }
});

router.post("/", async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        if (newUser) {
            res.status(200).json(newUser);
        };
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.put("/find-one-update/:objectId", async (req, res) => {
    try {
        const filter = { _id: req.params.objectId };
        const update = {
            username: req.body.username,
            email: req.body.email
        };
        const option = { new: true };
        const updatedUser = await User(filter, update, option);

        console.log(updatedUser)
        res.status(200).json(updatedUser);
    } catch (err) {
        console.log("uh oh, something went wrong");
        res.status(500).json({ message: "something went wrong..." });
    }
});

router.delete("/find-one-delete/:objectId", async (req, res) => {
    try {
        const deletedUser = await User.findOneAndDelete({ _id: req.params.objectId });
        res.status(200).json(deletedUser)
        console.log(`deleted: ${deletedUser}`);
    } catch (err) {
        console.log("something went wrong...");
        res.status(500).json({ error: "something went wrong.." });
    }
});

router.post("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true }
        )
        if (!user) {
            return res.status(404).json({
                message: "no user found with that userId"
            });
        }
        res.status(200).json(`Added friend to friend list: ${user}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.delete("/:userId/friends/:friendId", async (req, res) => {
    try {
        const user = await User.findOne(
            { _id: req.params.userId },
        )

        const deletedFriend = user.friends.pull(req.params.friendId);
        user.save();
        console.log(deletedFriend);

        if (!user) {
            return res.status(404).json({
                message: "no user found with that userId"
            });
        }
        res.status(200).json(`Removed friend from friends list: ${user}`);
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});


