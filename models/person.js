const mongoose = require("mongoose");

// if (process.argv.length < 5 && process.argv.length > 3) {
//   console.log("missing arguements");
//   process.exit(1);
// }

// const password = process.argv[2];
// const name = process.argv[3];
// const number = process.argv[4];

const URL = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);

mongoose.connect(URL);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
