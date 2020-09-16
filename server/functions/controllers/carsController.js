const { db } = require("../providers/firebase");
const validationHandler = require("../middlewares/validationHandler");

exports.index = (req, res, next) => {
  try {
    const cars = db.collection("cars").orderBy("createdAt", "desc").get();
    let entries = [];
    cars.forEach((card) => entries.push({ id: card.id, ...card.data() }));
    res.json(cars);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await db.doc(`/cars/${id}`).get();
    if (car.exists) {
      res.json(car.data());
    } else {
      const error = new Error("This car doesn't exists");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};

exports.store = async (req, res, next) => {
  try {
    validationHandler(req);
    const photo = req.files.file;

    const client = await db.doc(`/clients/${req.body.client}`).get();

    if (client.exists) {
      const photo = req.files.file;

      const newCar = {
        ...req.body,
        picture: photo
          ? `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${photo.name}?alt=media`
          : "",
        createdAt: new Date().getTime(),
        repairs: [],
      };

      const savedCar = await db.collection("cars").add(newCar);
      console.log(savedCar);

      const updateClient = {
        ...client.data(),
        cars: client.data().cars.concat(savedCar.id),
      };

      const updatedClient = await db
        .doc(`/clients/${req.body.client}`)
        .update(updateClient);
      return res.json({ id: savedCar.id, ...newCar });
    }
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    validationHandler(req);

    const id = req.params.id;
    const car = await db.doc(`/cars/${id}`).get();
    if (car.exists) {
      const photo = req.files.file;

      const updatecar = {
        ...req.body,
        picture: photo
          ? `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${photo.name}?alt=media`
          : "",
      };

      const updatedcar = await db.doc(`/cars/${id}`).update(updatecar);

      return res.json({ id: updatedcar.id, ...updatecar });
    } else {
      const error = new Error("This client doesn't exists");
      error.statusCode = 400;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const car = await db.doc(`/cars/${id}`).get();
    if (car.exists) {
      await db.doc(`/cars/${id}`).delete();
      res.json({ message: "car deleted successfully..." });
    } else {
      const error = new Error("This car doesn't exists");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
