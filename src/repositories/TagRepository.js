import HTTP from "@/common/http";

const resource = "tags";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default {
  async findAll() {
    await sleep(1000);
    const response = await HTTP.get(resource);
    return response.data;
  },

  async create(name) {
    await sleep(1000);
    const response = await HTTP.post(`${resource}`, name);
    return response.data;
  },

  async update(tag) {
    await sleep(1000);
    return (await HTTP.put(`${resource}/${tag.id}`, tag)).data;
  },

  async remove(id) {
    await sleep(1000);
    return await HTTP.delete(`${resource}/${id}`);
  },
};
