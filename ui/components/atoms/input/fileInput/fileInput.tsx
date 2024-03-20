import { InputType } from "../types";

import style from "./index.module.css";

const FileInput = ({
  fileTypes,
  onChange,
  placeholder,
}: {
  fileTypes: string[];
  onChange: (value: File) => void;
  placeholder: string;
}): JSX.Element => {
  const handleChangeFile = (event) => {
    const file = event?.target?.files?.[0];
    if (file) {
      onChange(file);
    }
  };
  return (
    <form method="post" encType="multipart/form-data">
      <label className={style.inputFile}>
        <span className={style.inputFileText}>{placeholder}</span>
        <input
          type={InputType.file}
          name={InputType.file}
          accept={fileTypes.join(",")}
          onChange={handleChangeFile}
        />
        <span className={style.inputFileBtn}>Browse File</span>
      </label>
    </form>
  );
};

export default FileInput;
