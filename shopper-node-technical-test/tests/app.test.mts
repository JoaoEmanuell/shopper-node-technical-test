import { uploadService } from "../src/service/upload.service";
import { confirmService } from "../src/service/confirm.service";
import { listService } from "../src/service/list.service";
import { uploadBodyInterface } from "../src/interfaces/upload.interface";

import { describe, it } from "node:test";
import assert from "node:assert";
import { readFileSync } from "node:fs";
import { IncomingMessage } from "node:http";
import { confirmBodyInterface } from "../src/interfaces/confirm.interface";
import path, { join } from "node:path";

const fakeRequestObject = {
  headers: {
    host: "localhost:8080",
  },
}; // simulate a IncomingMessage

const absolutePath = path.resolve("./");

const randomInteger = (min: number, max: number) => {
  // https://javascript.info/task/random-int-min-max
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

describe("all application test", () => {
  let measureUUID: string, measureValue: number;
  const customerCode = `${randomInteger(
    1,
    10000
  )}-test_customer-${randomInteger(1, 10000)}`;
  const measureType = "water";

  it("upload test", async () => {
    const image = readFileSync(
      join(absolutePath, "tests", "files", "test-image.jpg")
    ).toString("base64"); // get the image and encode as base64
    const randomYear = randomInteger(1500, 2000); // get a random year
    const randomMonth = randomInteger(0, 11); // get a random month
    const data = {
      image: image,
      customer_code: customerCode,
      measure_datetime: new Date(randomYear, randomMonth, 1),
      measure_type: measureType,
    } as uploadBodyInterface; // data to request
    const result = await uploadService(
      data,
      fakeRequestObject as IncomingMessage
    );
    // validate
    assert.equal(result.hasOwnProperty("measure_uuid"), true);
    assert.equal(result.hasOwnProperty("measure_value"), true);
    assert.equal(result.hasOwnProperty("image_url"), true);

    measureUUID = result.measure_uuid;
    measureValue = result.measure_value;
  });

  it("confirm test", async () => {
    const data = {
      confirmed_value: measureValue,
      measure_uuid: measureUUID,
    } as confirmBodyInterface;
    const result = await confirmService(data);
    assert.equal(result.hasOwnProperty("success"), true);
  });

  it("list test", async () => {
    const result = await listService(
      fakeRequestObject as IncomingMessage,
      customerCode,
      measureType
    );
    assert.equal(result.hasOwnProperty("customer_code"), true);
    assert.equal(result.hasOwnProperty("measures"), true);
  });
});
