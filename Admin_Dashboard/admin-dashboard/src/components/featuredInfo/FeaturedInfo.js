import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney">$3,434</span>
          <span className="featureMoneyRate">
            -11.4 <ArrowDownward className="featuredIcon negative" />
          </span>
        </div>
        <span className="featureSub">Compared To last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">cost</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney">$3,434</span>
          <span className="featureMoneyRate">
            +11.4 <ArrowUpward className="featuredIcon positive" />
          </span>
        </div>
        <span className="featureSub">Compared To last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">cost</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney">$3,434</span>
          <span className="featureMoneyRate">
            +11.4 <ArrowUpward className="featuredIcon " />
          </span>
        </div>
        <span className="featureSub">Compared To last month</span>
      </div>
    </div>
  );
}
