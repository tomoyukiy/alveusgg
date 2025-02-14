import Script from "next/script";
import React, { useEffect } from "react";

import { theGivingBlockConfig } from "@/config/the-giving-block";

const TheGivingBlockEmbed: React.FC = () => {
  useEffect(() => {
    window.tgbWidgetOptions = theGivingBlockConfig;
  }, []);

  return (
    <>
      <div id="tgb-widget-script"></div>
      <Script
        src="https://widget.thegivingblock.com/widget/script.js"
        async={true}
      ></Script>
    </>
  );
};

export default TheGivingBlockEmbed;
