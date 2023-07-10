import { Input } from "@/components/ui/Input";
import { FC } from "react";
import { IFieldsProps } from "../../types/fields.interface";

import styles from "./styles.module.sass";

const Fields: FC<IFieldsProps> = ({ register, errors }) => {
  return (
    <div className={styles.fields}>
      <Input
        id="title"
        type="text"
        register={register}
        placeholder="название"
        required
        errors={errors}
      />
      <Input
        id="description"
        type="text"
        register={register}
        placeholder="описание"
        required
        errors={errors}
      />
    </div>
  );
};

export default Fields;
