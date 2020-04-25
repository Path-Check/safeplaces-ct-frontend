import React from "react";
import { useForm } from "react-hook-form";
import { Blockquote, Button, TextInput } from "@wfp/ui";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignIn } from "@fortawesome/pro-solid-svg-icons";
export default function ApiPage() {
  const { handleSubmit, register, errors } = useForm();
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Blockquote>You are currently not authentificated to a API</Blockquote>
        <TextInput name="username" labelText="Api url" />
        <Button type="submit">Save</Button>{" "}
        <Button
          type="submit"
          kind="secondary"
          icon={<FontAwesomeIcon icon={faSignIn} />}
        >
          Go to authentification
        </Button>
      </form>
    </div>
  );
}
