import { TfiWrite } from "react-icons/tfi";
import { LuFileType2 } from "react-icons/lu";
import { FaImage } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";

export const RenderIcon = ({ type }) => {
  console.log(type);
  switch (type.value) {
    case "customOutput":
    default:
      return LuFileType2;
    case "input":
    case "text":
    case "textarea":
      return TfiWrite;
    case "img":
      return FaImage;
    case "video":
      return FaVideo;
  }
};
