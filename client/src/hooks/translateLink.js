import translate from "./Translate";

const TranslateLink = (item) => {
  let name = "";
  if (item) {
    for (const value of item) {
      name += translate(value);
    }

    return name;
  }

  return false;
};

export default TranslateLink;
