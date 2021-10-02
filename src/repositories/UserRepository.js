import HTTP from "@/common/http";

const resource = "users";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async findAll() {
    await sleep(1000);
    const response = await HTTP.get(resource);
    return response.data;
  },

  async findOne(id) {
    await sleep(1000);
    return (await HTTP.get(`${resource}/${id}`)).data;
  },

  async activate(id) {
    await sleep(1000);
    return (await HTTP.put(`${resource}/${id}/activate`)).data;
  },

  async deactivate(id) {
    await sleep(1000);
    return (await HTTP.put(`${resource}/${id}/deactivate`)).data;
  },

  async delete(id) {
    await sleep(1000);
    return await HTTP.delete(`${resource}/${id}`);
  },
};
