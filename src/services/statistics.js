import { admin } from "./instances";

export const totalRevenues = () => {
  return admin({
    method: "GET",
    url: `statistics/total/revenues`,
  });
};

export const revenueByDate = (interval) => {
  return admin({
    method: "GET",
    url: `statistics/revenue/interval?interval=${interval}`,
  })
}

export const browsersTraffic = () => {
  return admin({
    method: "GET",
    url: `statistics/traffic/browsers`,
  })
}

export const deviceTraffic = () => {
  return admin({
    method: "GET",
    url: `statistics/traffic/device`,
  })
}


export const osTraffic = () => {
  return admin({
    method: "GET",
    url: `statistics/traffic/os`,
  })
}