const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
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

// async function run() {
//   try {
//     const userCollection = client.db("nodeMongoCrud").collection("users");
//     const user = {
//       name: "Rahim",
//       email: "Rahim@gmail.com",
//     };
//     const result = await userCollection.insertOne(user);
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   } finally {
//     app.listen(port, () => {
//       console.log(`Server is running on port ${port}`);
//     });
//   }
// }

async function run() {
  try {
    // connecting db
    const userCollection = client.db("nodeMongoCrud").collection("users");

    app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
  } finally {
    
  }
}

run().catch((error) => console.error(error));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
