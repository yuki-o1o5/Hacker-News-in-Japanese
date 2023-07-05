import { useEffect, useState } from "react";
import styles from "./DayTitleAndPoints.module.css";
import Link from "next/link.js";
import React from "react";

const DayTitleAndPoints = (props) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient ? (
        <Link href={`${props.id}`}>
          <div className={styles.dayTitleAndPoints}>
            <p className={styles.dayTitle}>{props.dayTitle}</p>
            <p className={styles.dayPoints}>{props.dayPoints}</p>
          </div>
        </Link>
      ) : null}
    </>
  );
};

export default DayTitleAndPoints;
