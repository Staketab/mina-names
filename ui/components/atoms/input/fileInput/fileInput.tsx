import classNames from "classnames";
import { InputType } from "../types";

import errorIcon from "../../../../assets/error.svg";
import successIcon from "../../../../assets/success.svg";

import style from "./index.module.css";
import Image from "next/image";
import { Loader, LoaderVariant } from "../../loader";
import Tooltip from "@/components/molecules/tooltip";

const FileInput = ({
  fileTypes,
  onChange,
  placeholder,
  isSupported,
  loading,
  tooltipText,
}: {
  fileTypes: string[];
  onChange: (value: File) => void;
  placeholder: string;
  isSupported?: boolean;
  loading?: boolean;
  tooltipText: string;
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
        <span
          className={classNames(style.inputFileText, {
            [style.notSupported]:
              !isSupported && typeof isSupported === "boolean",
            [style.fileText]: isSupported,
          })}
        >
          {placeholder}
        </span>
        <input
          type={InputType.file}
          name={InputType.file}
          accept={fileTypes.join(",")}
          onChange={handleChangeFile}
          disabled={loading}
        />
        <span className={style.inputFileBtn}>
          {!loading && !isSupported && typeof isSupported === "boolean" && (
            <Tooltip text={tooltipText}>
              <Image src={errorIcon} alt="" width={20} height={20} />
            </Tooltip>
          )}
          {!loading && isSupported && typeof isSupported === "boolean" && (
            <Image src={successIcon} alt="" width={20} height={20} />
          )}
          {loading && (
            <Loader
              variant={LoaderVariant.CIRCLE}
              circleSize={{ width: 20, height: 20 }}
            />
          )}
          Browse File
        </span>
      </label>
    </form>
  );
};

export default FileInput;
