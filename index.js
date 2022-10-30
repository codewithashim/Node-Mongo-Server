const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000; // Port to listen on
const cors = require("cors");
app.use(cors());
app.use(express.json());

// Import the routes
app.get("/", (req, res) => {
  res.send("Hey Node Js Corud server is running");
});
// Start the server

// connect to the database

const uri =
  "mongodb+srv://admin:admin@cluster0.fmve61t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

async function run() {
  try {
    // connecting db
    const userCollection = client.db("nodeMongoCrud").collection("users");
    // read data from db
    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const user = await cursor.toArray();
      res.send(user);
    });

    // Create a new user
    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });

    // Delete a user

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
      console.log("Trying to delte",id);
    });

  } finally {
  }
}

run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
