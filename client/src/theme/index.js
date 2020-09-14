const spacing = (first, second, third, fourth) => {
  const sides = [first, second, third, fourth].filter((s) => !!s).length;
  switch (sides) {
    case 4: {
      return `${first}px ${second}px ${third}px ${fourth}px`;
    }
    case 3: {
      return `${first}px ${second}px ${third}px ${second}px`;
    }
    case 2: {
      return `${first}px ${second}px ${first}px ${second}px`;
    }
    case 1: {
      return `${first}px ${first}px ${first}px ${first}px`;
    }
    default: {
      break;
    }
  }
};

const shadow = (elevation = 1) => {
  const extraEl = elevation - 1;
  const getSize = (v1, v24) =>
    `${v1 + Math.round(((v24 - v1) / 23) * extraEl)}px`;
  const getShade = (y, blur, spread, alpha) =>
    `0 ${getSize(y[0], y[1])} ${getSize(blur[0], blur[1])} ${getSize(
      spread[0],
      spread[1]
    )} rgba(0,0,0,${alpha})`;

  return `${getShade([2, 11], [1, 15], [-1, -7], 0.2)}, ${getShade(
    [1, 24],
    [1, 38],
    [0, 3],
    0.14
  )}, ${getShade([1, 9], [3, 46], [0, 8], 0.12)};`;
};

export default {
  colors: {
    primary: {
      main: "#4379EE",
      lighten: "#A4C0FF",
      darken: "#3D6CD0",
    },
    secondary: {
      main: "#6226EF",
      lighten: "#DFD3FC",
      darken: "#5321CB",
    },
    success: {
      main: "#03B69C",
      lighten: "#CCF0EB",
      darken: "#079782",
    },
    info: {
      main: "#BA29FF",
      lighten: "#F1D4FF",
      darken: "#9520CC",
    },
    warning: {
      main: "#FFA756",
      lighten: "#FFEDDD",
      darken: "#E1954F",
    },
    danger: {
      main: "#EF3826",
      lighten: "#FCD7D3",
      darken: "#EA0234",
    },
    background: {
      main: "#F5F6FA",
      lighten: "#FFFFFF",
      darken: "#D5D5D5",
    },
  },
  spacing,
  shadow,
};
