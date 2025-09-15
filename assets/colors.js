const themeColors = {
  lightPink: "#FFB5DE",
  pink: "#FC99C7",
  coral: "#FDB786",
  orange: "#FBCC62",
  yellow: "#FDED91",
  lightGreen: "#D3ED70",
  green: "#A7DF91",
  blue: "#BBD9FB",
  lavender: "#A6A8FB",
  purple: "#D3BDFE",
};

const themeSoftColors = {
  lightPink: "#FFDCEF",
  pink: "#FFC0DD",
  coral: "#FFD3B3",
  orange: "#FFDC8E",
  yellow: "#FFFACE",
  lightGreen: "#EDFFA9",
  green: "#C7EDB9",
  blue: "#DDEDFF",
  lavender: "#CDCFFF",
  purple: "#EBE1FF",
};

// 백엔드로 보낼 이름 매핑
const themeColorName = {
  lightPink: "LIGHT_PINK",
  pink: "PINK",
  coral: "CORAL",
  orange: "ORANGE",
  yellow: "YELLOW",
  lightGreen: "LIGHT_GREEN",
  green: "GREEN",
  blue: "BLUE",
  lavender: "LAVENDER",
  purple: "PURPLE",
};

function getColorName(hex) {
  return themeColorName[
    Object.entries(themeColors).find(([_, value]) => value === hex)?.[0]
  ];
}

export { themeColors, themeSoftColors, getColorName };
