import { FileUploader } from "react-drag-drop-files";
import uploadIcon from "../../../assets/upload.svg";

import style from "./index.module.css";
import Image from "next/image";

const UploadFile = ({
  onChange,
  fileTypes,
}: {
  onChange: (value: File) => void;
  fileTypes: string[];
}): JSX.Element => {
  const handleChange = (file: File) => {
    onChange(file);
  };
  return (
    <FileUploader
      handleChange={handleChange}
      name="file"
      types={fileTypes.map((item) =>
        item.at(0) === "." ? item.slice(1) : item
      )}
      onTypeError={(test) => console.log(test)}
    >
      <div className={style.dropArea}>
        <Image src={uploadIcon} alt="" width={100} height={100} />
        <p>Drag and drop files here</p>
      </div>
    </FileUploader>
  );
};

export default UploadFile;
