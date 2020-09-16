const { db } = require("../providers/firebase");
const validationHandler = require("../middlewares/validationHandler");

exports.index = async (req, res, next) => {
  try {
    const clients = await db
      .collection("clients")
      .orderBy("createdAt", "desc")
      .get();

    let entries = [];

    clients.forEach((client) =>
      entries.push({ id: client.id, ...client.data() })
    );
    res.json(entries);
  } catch (error) {
    next(error);
  }
};

exports.show = async (req, res, next) => {
  try {
    const id = req.params.id;
    const client = await db.doc(`/clients/${id}`).get();
    if (client.exists) {
      res.json(client.data());
    } else {
      const error = new Error("This client doesn't exists");
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

    const newClient = {
      ...req.body,
      picture: photo
        ? `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${photo.name}?alt=media`
        : "",
      createdAt: new Date().getTime(),
      cars: [],
    };

    const savedClient = await db.collection("clients").add(newClient);

    return res.json({ id: savedClient.id, ...newClient });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    validationHandler(req);

    const id = req.params.id;
    const client = await db.doc(`/clients/${id}`).get();
    if (client.exists) {
      const photo = req.files.file;

      const updateClient = {
        ...req.body,
        picture: photo
          ? `https://firebasestorage.googleapis.com/v0/b/${process.env.STORAGE_BUCKET}/o/${photo.name}?alt=media`
          : "",
      };

      const updatedClient = await db.doc(`/clients/${id}`).update(updateClient);

      return res.json({ id: updatedClient.id, ...updateClient });
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
    const client = await db.doc(`/clients/${id}`).get();
    if (client.exists) {
      await db.doc(`/clients/${id}`).delete();
      res.json({ message: "Client deleted successfully..." });
    } else {
      const error = new Error("This client doesn't exists");
      error.statusCode = 400;
      throw error;
    }
  } catch (error) {
    next(error);
  }
};
