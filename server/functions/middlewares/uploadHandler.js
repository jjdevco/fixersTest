const os = require("os");
const fs = require("fs");
const path = require("path");
const Busboy = require("busboy");

const { admin } = require("../providers/firebase");

module.exports = (req, res, next) => {
  if (req.method !== "POST") {
    // Return a "method not allowed" error
    return res.status(405).end();
  }
  const busboy = new Busboy({ headers: req.headers });
  const tmpdir = os.tmpdir();

  // This object will accumulate all the fields, keyed by their name
  const fields = {};

  // This object will accumulate all the uploaded files, keyed by their name.
  const uploads = {};

  // This code will process each non-file field in the form.
  busboy.on("field", (fieldname, val) => {
    // TODO(developer): Process submitted field values here
    console.log(`Processed field ${fieldname}: ${val}.`);
    fields[fieldname] = val;
  });

  const fileWrites = [];

  // This code will process each file uploaded.
  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    // Note: os.tmpdir() points to an in-memory file system on GCF
    // Thus, any files in it must fit in the instance's memory.
    console.log(`Processed file ${filename}`);

    const extension = filename.split(".")[filename.split(".").length - 1];
    const name = `${Math.round(Math.random() * 100000000000)}.${extension}`;
    const filepath = path.join(tmpdir, name);

    uploads[fieldname] = { filepath, name, mimetype };

    const writeStream = fs.createWriteStream(filepath);
    file.pipe(writeStream);

    // File was processed by Busboy; wait for it to be written.
    // Note: GCF may not persist saved files across invocations.
    // Persistent files must be kept in other locations
    // (such as Cloud Storage buckets).
    const promise = new Promise((resolve, reject) => {
      file.on("end", () => {
        writeStream.end();
      });
      writeStream.on("finish", resolve);
      writeStream.on("error", reject);
    });
    fileWrites.push(promise);
  });

  // Triggered once all uploaded files are processed by Busboy.
  // We still need to wait for the disk writes (saves) to complete.
  busboy.on("finish", async () => {
    await Promise.all(fileWrites);

    // TODO(developer): Process saved files here
    for (const file in uploads) {
      await admin
        .storage()
        .bucket()
        .upload(uploads[file].filepath, {
          resumable: false,
          metadata: {
            metadata: {
              contentType: uploads[file].mimetype,
            },
          },
        });
      fs.unlinkSync(uploads[file].filepath);
    }

    req.body = fields;
    req.files = uploads;
    next();
  });

  busboy.end(req.rawBody);
};
