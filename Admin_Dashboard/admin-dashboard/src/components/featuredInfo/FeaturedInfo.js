import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle"></span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney"></span>
          <span className="featureMoneyRate"></span>
        </div>
        <span className="featureSub"></span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle"></span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney"></span>
          <span className="featureMoneyRate"></span>
        </div>
        <span className="featureSub"></span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle"></span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney"></span>
          <span className="featureMoneyRate"></span>
        </div>
        <span className="featureSub"></span>
      </div>
    </div>
  );
}
