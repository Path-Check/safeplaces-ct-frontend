import React from "react";
import { TextInput } from "@wfp/ui";
import styles from "./styles.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/pro-regular-svg-icons";
import moment from "moment";

export default function TimeInput(props) {
  console.log("props", props);
  const value = moment(props.value).format("YYYY-MM-DD");
  return (
    <div>
      <TextInput
        additional={
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faClock} />
          </div>
        }
        type="time"
        {...props}
        value={props.value}
        formItemClassName={styles.dateInput}
        /* placeholder=""
        defaultValue=""*/
      />
    </div>
  );
}
