import { useState } from "react";
import axios from "axios";
import ShortenForm from "@/components/shortenForm";
import styles from "./styles.module.css"

export default function HomeScreen() {
  

  return (
    <div className={styles.home_wrapper}>
      <h1>Средство сокращения URL-адресов</h1>
      <ShortenForm />
    </div>
  );
}
