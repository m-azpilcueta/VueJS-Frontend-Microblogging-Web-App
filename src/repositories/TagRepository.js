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
};
