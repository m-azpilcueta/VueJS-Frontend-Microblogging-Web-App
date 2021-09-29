import HTTP from "@/common/http";

const resource = "users";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    return response.data;
  },

  async findOne(id) {
    await sleep(1000);
    return (await HTTP.get(`${resource}/${id}`)).data;
  },
};
