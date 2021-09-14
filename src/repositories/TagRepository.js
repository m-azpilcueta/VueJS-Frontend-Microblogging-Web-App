import HTTP from "@/common/http";

const resource = "tags";

export default {
  async findAll() {
    const response = await HTTP.get(resource);
    return response.data;
  },
};
