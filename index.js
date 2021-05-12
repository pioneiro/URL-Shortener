import express from "express";
import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PORT = process.env.PORT || 5192;
const host = `http://localhost:${PORT}/`;

const dbURI =
	"mongodb+srv://pioneiro:dKdJDmNCK6KkweDd@main.504vi.mongodb.net/url?retryWrites=true&w=majority";

const urlSchema = new Schema(
	{
		url: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

const urldb = mongoose.model("URL", urlSchema);

const index = express();

const geturl = (id, parent) => new URL(id, parent).href;

index.set("view engine", "ejs");

index.use(express.static("assets"));
index.use(express.urlencoded({ extended: true }));

mongoose
	.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
		console.log("Connected to DB");

		index.listen(PORT, (error) => {
			if (error) {
				console.log(
					"Cannot initiate server due to the following error\n",
					error
				);
			} else {
				console.log(`Server initiated at ${host}`);
			}
		});
	});

index.get("/", (req, res) => {
	res.render("index");
});

index.post("/newurl", (req, res) => {
	const newURL = new URL(req.body.url).href;
	urldb.findOne({ url: newURL }, (errorFinding, foundURL) => {
		if (errorFinding) {
			res.send(`Error accessing DB while finding URL`);
		} else if (foundURL) {
			res.render("result", { url: geturl(foundURL._id, host) });
		} else {
			new urldb({ url: newURL })
				.save()
				.then((savedURL) => {
					res.render("result", { url: geturl(savedURL._id, host) });
				})
				.catch((errorSaving) => {
					res.send(`Error accessing DB whle saving URL`);
				});
		}
	});
});

index.get("/:urlid", (req, res) => {
	urldb.findById(req.params.urlid, (error, foundURL) => {
		if (error) {
			res.send(`Error accessing DB while getting URL`);
		} else {
			res.redirect(foundURL.url);
		}
	});
});