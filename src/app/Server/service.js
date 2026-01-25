"use server";

import { ObjectId } from "mongodb";

const { dbConnect, collection } = require("../lib/dbConnects");


export const getService = async () => {
    const services = await dbConnect(collection.SERVICES).find().toArray();
    return services;

}

export const getSingleService = async (slug) => {
    if (!slug) {
        return{};
    }


// const query = { _id: new ObjectId(id)};
const service = await dbConnect(collection.SERVICES).findOne({
    slug: slug,
  });

return service || {};
}

