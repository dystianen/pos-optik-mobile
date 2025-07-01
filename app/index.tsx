import { Redirect } from "expo-router";
import { useEffect } from "react";

export default function Index() {
  useEffect(() => {
    console.log("masuk");
  }, []);

  return <Redirect href="/(tabs)/home" />;
}
