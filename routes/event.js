const eventRoutes = require("express").Router();
const Event = require("../models/EventSchema");
eventRoutes.get("/", async (req, res) => {
  try {
    const allEvent = await Event.find();
    res.status(200).send(allEvent);
  } catch (error) {
    res.send(error);
  }
});
eventRoutes.post("/", async (req, res) => {
  try {
    if (req.body.title === "") {
      res.status(400).send({
        error: "Validation Error: title is required",
      });
      if (req.body.title.length > 3) {
        res.send(400).send({
          error: "Validation Error:title length must have 3 character",
        });
      }
    }
    if (req.body.description === "") {
      res.status(400).send({
        error: "Validation Error: description is required",
      });
      if (req.body.description.length > 3) {
        res.send(400).send({
          error: "Validation Error:description length must have 3 character",
        });
      }
    }
    if (req.body.location === "") {
      res.status(400).send({
        error: "Validation Error: location is required",
      });
      if (req.body.location.length > 3) {
        res.send(400).send({
          error: "Validation Error:location length must have 3 character",
        });
      }
    }
    let newEvent = await Event.create({
      title: req.body.title,
      description: req.body.description,
      location: req.body.location,
    });
    res.status(201).send(newEvent);
  } catch (error) {
    res.send(error);
  }
});
eventRoutes.get("/:id", async (req, res) => {
  try {
    const getSpecificId = await Event.findById({ _id: req.params.id });

    res.status(200).send(getSpecificId);
  } catch (error) {
    res.status(404).send({
      error: "There is no event with that id",
    });
  }
});
eventRoutes.delete("/:id", async (req, res) => {
  try {
    const unwantedEvent = await Event.findByIdAndDelete({
      _id: req.params.id,
    });
    res.status(204).send("");
  } catch (error) {
    res.status(204).send("");
    // res.send(error);
  }
});
eventRoutes.put("/:id", async (req, res) => {
  try {
    let flag = false;
    if (req.body.title === "") {
      flag = true;
      res.status(400).send({
        error: "Validation Error: title is required",
      });
      if (req.body.title.length > 3) {
        flag = true;

        res.send(400).send({
          error: "Validation Error:title length must have 3 character",
        });
      }
    }
    if (req.body.description === "") {
      flag = true;

      res.status(400).send({
        error: "Validation Error: description is required",
      });
      if (req.body.description.length > 3) {
        flag = true;

        res.send(400).send({
          error: "Validation Error:description length must have 3 character",
        });
      }
    }
    if (req.body.location === "") {
      flag = true;

      res.status(400).send({
        error: "Validation Error: location is required",
      });
      if (req.body.location.length > 3) {
        flag = true;

        res.send(400).send({
          error: "Validation Error:location length must have 3 character",
        });
      }
    }
    if (!flag) {
      const { title, description, location } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(
        { _id: req.params.id },
        { title, description, location },
        { new: true }
      );
      res.status(200).send(updatedEvent);
    }
  } catch (error) {
    res.send(error);
  }
});
module.exports = eventRoutes;
