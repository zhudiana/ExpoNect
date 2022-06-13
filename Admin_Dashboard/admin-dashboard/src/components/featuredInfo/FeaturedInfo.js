import React from "react";
import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import axios from "axios";

export default function FeaturedInfo() {
  const [post, setPost] = React.useState(null);

  React.useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/exporters/get/count")
      .then((res) => {
        setPost(res.data);
      });
  }, []);
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Exporters</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney">{post}</span>
        </div>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">Importers</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney"></span>
          <span className="featureMoneyRate"></span>
        </div>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Products</span>
        <div className="featuredMoneyContainer">
          <span className="featureMoney"></span>
          <span className="featureMoneyRate"></span>
        </div>
      </div>
    </div>
  );
}
