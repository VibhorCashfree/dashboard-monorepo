export const getThemeValues = res => {
  if (!res) {
    return {};
  }
  const { configs, logo, color_code } = res;
  if (configs) {
    const {
      buttonTextColor,
      header: {
        styles: { backgroundColor },
      },
    } = configs;
    return {
      logo,
      buttonTextColor,
      color_code,
      backgroundColor,
    };
  }
  return {};
};

export const stringifyThemeConfig = colorValues => {
  const config = {
    header: {
      styles: {
        backgroundColor: `#${colorValues?.headerColor}`,
      },
    },
    buttonTextColor: `#${colorValues?.textColor}`,
  };

  return JSON.stringify(config);
};
