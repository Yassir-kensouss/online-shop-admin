import { admin } from "./instances";

export const totalRevenues = () => {
  return admin({
    method: "GET",
    url: `statistics/total/revenues`,
  });
};
