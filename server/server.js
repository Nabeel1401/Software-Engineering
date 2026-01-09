const path = require("path");
const express = require("express");
const app = express();

app.use(express.json());

// explicitly load server/.env
require("dotenv").config({ path: path.join(__dirname, ".env") });

const connections = require("./config/dbconfig");

const userRoute = require("./routes/user.Route");
const productRoute = require("./routes/products.Routes");
const bidsRoute = require("./routes/bids.Routes");
const notificationRoute = require("./routes/notification.Routes");

// ✅ ADD THIS (upload route)
const uploadRoute = require("./routes/upload");

const port = process.env.PORT || 8080;

// ✅ your routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/bids", bidsRoute);
app.use("/api/notifications", notificationRoute);

// ✅ ADD THIS (Cloudinary upload endpoint)
app.use("/api/upload", uploadRoute);

// ---------------- deployment configuration ----------------

// ✅ DO NOT overwrite __dirname
const rootDir = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(rootDir, "/client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(rootDir, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`listening on port number ${port}`));
