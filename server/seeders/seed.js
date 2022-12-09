const db = require("../config/connection");
const { User, Thought } = require("../models");
const userSeeds = require("./userSeeds.json");
const thoughtSeeds = require("./thoughtSeeds.json")

db.once("open", async () => {
    try{
        await Thought.deleteMany({});
        await User.deleteMany({});

        await User.create(userSeeds);

        for (let i=0; i < thoughtSeeds.length; i++){
            const { username } = await Thought.create(thoughtSeeds[i]);
        }
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
    console.log("Done!")
    process.exit(0);
})