import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Blockquote, Button, TextInput, TextArea } from "@wfp/ui";
import styles from "./styles.module.scss";

export default function OrganizationPage() {
  const { handleSubmit, register, errors } = useForm();
  const [status, setStatus] = useState(false);
  const onSubmit = (values) => {
    console.log(values);
    setStatus("saved");
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {status === "saved" && <Blockquote>Settings saved</Blockquote>}
        <TextInput name="organiuationName" labelText="Organization name" />
        <TextInput name="informationUrl" labelText="Information url" />
        <div className={`${styles.boundaries} input-group`}>
          <TextInput name="boundaries" labelText="Boundaries" />
          <Button>Select from map</Button>
        </div>
        <TextArea
          name="instructions"
          labelText="Public advisory instructions"
        />
        <Button type="submit">Save</Button>
      </form>
    </>
  );
}
