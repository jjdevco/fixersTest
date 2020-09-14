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
      darken: "#F2F5F5",
    },
  },
  spacing,
};
