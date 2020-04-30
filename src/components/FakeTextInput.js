import React from 'react';
export default function FakeTextInput(props) {
  console.log('new Props', props);
  return <input {...props} />;
  // return <TextInput {...props} value={props.value ? "" : "waaaa"} />;
}
