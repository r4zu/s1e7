interface IData {
  pressure: number;
  specific_volume_liquid: number;
  specific_volume_vapor: number;
}

const data: IData[] = [
  {
    pressure: 0.05,
    specific_volume_liquid: 0.00105,
    specific_volume_vapor: 30.0,
  },
  {
    pressure: 0.1,
    specific_volume_liquid: 0.00108,
    specific_volume_vapor: 20.0,
  },
  {
    pressure: 0.5,
    specific_volume_liquid: 0.0011,
    specific_volume_vapor: 10.0,
  },
  {
    pressure: 1.0,
    specific_volume_liquid: 0.0012,
    specific_volume_vapor: 5.0,
  },
  {
    pressure: 1.5,
    specific_volume_liquid: 0.00125,
    specific_volume_vapor: 3.5,
  },
  {
    pressure: 2.0,
    specific_volume_liquid: 0.0013,
    specific_volume_vapor: 2.5,
  },
  {
    pressure: 2.5,
    specific_volume_liquid: 0.00135,
    specific_volume_vapor: 2.0,
  },
  {
    pressure: 3.0,
    specific_volume_liquid: 0.0014,
    specific_volume_vapor: 1.5,
  },
  {
    pressure: 3.5,
    specific_volume_liquid: 0.00145,
    specific_volume_vapor: 1.2,
  },
  {
    pressure: 4.0,
    specific_volume_liquid: 0.0015,
    specific_volume_vapor: 1.0,
  },
  {
    pressure: 4.5,
    specific_volume_liquid: 0.00155,
    specific_volume_vapor: 0.8,
  },
  {
    pressure: 5.0,
    specific_volume_liquid: 0.0016,
    specific_volume_vapor: 0.6,
  },
  {
    pressure: 5.5,
    specific_volume_liquid: 0.00165,
    specific_volume_vapor: 0.55,
  },
  {
    pressure: 6.0,
    specific_volume_liquid: 0.0017,
    specific_volume_vapor: 0.5,
  },
  {
    pressure: 6.5,
    specific_volume_liquid: 0.0018,
    specific_volume_vapor: 0.45,
  },
  {
    pressure: 7.0,
    specific_volume_liquid: 0.002,
    specific_volume_vapor: 0.4,
  },
  {
    pressure: 7.5,
    specific_volume_liquid: 0.0022,
    specific_volume_vapor: 0.35,
  },
  {
    pressure: 8.0,
    specific_volume_liquid: 0.0025,
    specific_volume_vapor: 0.3,
  },
  {
    pressure: 8.5,
    specific_volume_liquid: 0.0028,
    specific_volume_vapor: 0.25,
  },
  {
    pressure: 9.0,
    specific_volume_liquid: 0.003,
    specific_volume_vapor: 0.2,
  },
  {
    pressure: 9.5,
    specific_volume_liquid: 0.0033,
    specific_volume_vapor: 0.15,
  },
  {
    pressure: 10.0,
    specific_volume_liquid: 0.0035,
    specific_volume_vapor: 0.0035,
  },
];

const interpolate = (
  pressure: number,
  p1: number,
  p2: number,
  v1: number,
  v2: number
) => {
  return v1 + ((pressure - p1) * (v2 - v1)) / (p2 - p1);
};

export const getSpecificVolumes = (pressure: number) => {
  for (let i = 0; i < data.length - 1; i++) {
    const point1 = data[i];
    const point2 = data[i + 1];

    if (pressure >= point1.pressure && pressure <= point2.pressure) {
      const specificVolumeLiquid = interpolate(
        pressure,
        point1.pressure,
        point2.pressure,
        point1.specific_volume_liquid,
        point2.specific_volume_liquid
      );
      const specificVolumeVapor = interpolate(
        pressure,
        point1.pressure,
        point2.pressure,
        point1.specific_volume_vapor,
        point2.specific_volume_vapor
      );

      return {
        specific_volume_liquid: Math.round(specificVolumeLiquid * 1e5) / 1e5,
        specific_volume_vapor: Math.round(specificVolumeVapor * 1e5) / 1e5,
      };
    }
  }

  return {
    error: `No data available for pressure ${pressure} MPa`,
  };
};
