import { useState, useEffect } from "react";

const useInfiniteScroll = (callback) => {
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    callback(() => {
      // console.log("Fetch more....");
    });
  }, [isFetching, callback]); //if isfetching true then call a call back function

  function handleScroll() {
    // console.log(
    //   "test scroll.....",
    //   window.innerHeight + document.documentElement.scrollTop,
    //   document.documentElement.offsetHeight
    // );
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  return [isFetching, setIsFetching];
};

export default useInfiniteScroll;
